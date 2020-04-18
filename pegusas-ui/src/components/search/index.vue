<template>
    <el-row>
        <el-col :span="fullWidth ? 18 : 12">
            <el-input v-model="searchTerm" @keyup.enter.native="addTerm(searchTerm)">
                <el-button slot="append" @click="addTerm(searchTerm)">
                    <i class="fa fa-search"></i>
                </el-button>
            </el-input>
        </el-col>
        <el-col :span="4">
            <div class="SmartSearch-keyToggle btn" :class="{'is-active': showKeyPane}" @click="toggleKeyPane">
                帮助
            </div>
        </el-col>
        <el-col :span="8">
            <slot></slot>
        </el-col>
        <el-col :span="24">
            <div class="SmartSearch-tags" v-if="searchTags.length">
                <div class="SmartSearch-tagSection">
                    <div class="SmartSearch-flexContainer">
                        <div class="SmartSearch-tagContainer" v-for="(tag, index) in searchTags" :key="tag">
                            <div class="SmartSearch-deleteContainer" @click="removeTerm(index)">
                                <i class="fa fa-times SmartSearch-tagDelete"></i>
                            </div>
                            <div class="SmartSearch-tag SmartSearch-tag--deletable">
                                <span class="SmartSearch-name">{{tag}}</span>
                            </div>
                        </div>
                        <a href="javascript:void(0)" class="SmartSearch-clearAll" @click="clearAllTerms()" translate>CLEAR ALL</a>
                    </div>
                </div>
            </div>
            <!-- hint key -->
            <div class="SmartSearch-keyPane row" v-for="(model, index) in models" v-if="showKeyPane" :key="index">
                <div class="SmartSearch-keyRow">
                    <div class="SmartSearch-examples">
                        <div class="SmartSearch-examples--title">
                            <b translate>示例:</b>
                        </div>
                        <div class="SmartSearch-examples--search" v-for="(searchExample, index) in model.searchExamples" :key="index">{{searchExample}}</div>
                    </div>
                </div>
                <div class="SmartSearch-keyRow">
                    <b>更多信息:</b>
                    <span>请点击导航栏右侧帮助按钮</span>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'
import axios from '../../http-common'
import qs from './queryset'
import SmartSearchService from './smart-search'
let defaults = [],
  queryset

export default {
  name: 'Search',
  props: {
    name: {
      type: String,
      requires: true
    },
    iterator: {
      type: String,
      requires: true
    },
    fullWidth: {
      type: Boolean,
      requires: false
    }
  },
  data () {
    return {
      searchTags: [],
      searchTerm: '',
      models: {},
      showKeyPane: false
    }
  },
  methods: {
    ...mapMutations({
      updateQueryset: 'UPDATE_QUERYSET_STATE'
    }),
    initModels (type) {
      queryset = _.cloneDeep(defaults)
      this.updateQueryset({ iterator: this.iterator, queryset: qs.encodeQueryset(queryset) })
      axios({ method: 'options', url: `/api/v1/${this.name}/` })
        .then(res => {
          let baseFields = res.data.actions.GET,
            relatedSearchField = res.data.related_search_fields,
            searchExamples = []

          for (var key in baseFields) {
            if (baseFields.hasOwnProperty(key)) {
              if (baseFields[key].type === 'object') {
                delete baseFields[key]
              }
            }
          }
          delete baseFields.url
          searchExamples.push('keyword')
          if (baseFields.id) {
            searchExamples.push('id:>10')
          }
          let stringFound = false,
            dateTimeFound = false

          _.forEach(baseFields, (value, key) => {
            if (!stringFound && value.type === 'string') {
              searchExamples.push(key + ':foobar')
              stringFound = true
            }
            if (!dateTimeFound && value.type === 'datetime') {
              searchExamples.push(key + ':>=2000-01-01T00:00:00Z')
              searchExamples.push(key + ':<2000-01-01')
              dateTimeFound = true
            }
          })

          this.models[this.iterator] = {
            base: baseFields,
            related: relatedSearchField,
            searchExamples: searchExamples
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    generateSearchTags: function () {
      this.searchTags = []

      let querysetCopy = _.cloneDeep(queryset)
      if (this.singleSearchParam && querysetCopy[this.singleSearchParam]) {
        let searchParam = querysetCopy[this.singleSearchParam].split('%20and%20')
        delete querysetCopy[this.singleSearchParam]

        _.each(searchParam, function (param) {
          let paramParts = decodeURIComponent(param).split(/=(.+)/)
          let reconstructedSearchString = qs.decodeParam(paramParts[1], paramParts[0])
          this.searchTags.push(reconstructedSearchString)
        })
      }

      this.searchTags = this.searchTags.concat(qs.stripDefaultParams(querysetCopy, defaults))
    },
    searchWithoutKey: function (term) {
      if (this.singleSearchParam) {
        return {
          [this.singleSearchParam]: 'search=' + encodeURIComponent(term)
        }
      }
      return {
        search: encodeURIComponent(term)
      }
    },
    toggleKeyPane: function () {
      this.showKeyPane = !this.showKeyPane
    },
    // add a search tag, merge new queryset, $state.go()
    addTerm: function (terms) {
      let params = {},
        origQueryset = _.clone(queryset)

      // Remove leading/trailing whitespace if there is any
      terms = (terms) ? terms.trim() : ''

      if (terms && terms !== '') {
        let splitTerms

        if (this.singleSearchParam === 'host_filter') {
          splitTerms = SmartSearchService.splitFilterIntoTerms(terms)
        } else {
          splitTerms = SmartSearchService.splitSearchIntoTerms(terms)
        }

        _.forEach(splitTerms, (term) => {
          let termParts = SmartSearchService.splitTermIntoParts(term)

          function combineSameSearches (a, b) {
            if (_.isArray(a)) {
              return a.concat(b)
            } else {
              if (a) {
                if (this.singleSearchParam) {
                  return a + '%20and%20' + b
                } else {
                  return [a, b]
                }
              }
            }
          }

          if (this.singleSearchParam) {
            if (termParts.length === 1) {
              params = _.merge(params, this.searchWithoutKey(term), combineSameSearches)
            } else {
              let root = termParts[0].split('.')[0].replace(/^-/, '')
              if (_.has(this.models[this.iterator].base, root) || root === 'ansible_facts') {
                if (_.has(this.models[this.iterator].base[root], 'type') && this.models[this.iterator].base[root].type === 'field') {
                  // Intent is to land here for searching on the base model.
                  params = _.merge(params, qs.encodeParam({term: term, relatedSearchTerm: true, singleSearchParam: this.singleSearchParam ? this.singleSearchParam : false}), combineSameSearches)
                } else {
                  // Intent is to land here when performing ansible_facts searches
                  params = _.merge(params, qs.encodeParam({term: term, searchTerm: true, singleSearchParam: this.singleSearchParam ? this.singleSearchParam : false}), combineSameSearches)
                }
              } else if (_.contains(this.models[this.iterator].related, root)) {
                // Intent is to land here for related searches
                params = _.merge(params, qs.encodeParam({term: term, relatedSearchTerm: true, singleSearchParam: this.singleSearchParam ? this.singleSearchParam : false}), combineSameSearches)
              }
              // Its not a search term or a related search term - treat it as a string
              else {
                params = _.merge(params, this.searchWithoutKey(term), combineSameSearches)
              }
            }
          } else {
            // if only a value is provided, search using default keys
            if (termParts.length === 1) {
              params = _.merge(params, this.searchWithoutKey(term), combineSameSearches)
            } else {
              // Figure out if this is a search term
              let root = termParts[0].split('.')[0].replace(/^-/, '')
              if (_.has(this.models[this.iterator].base, root)) {
                if (this.models[this.iterator].base[root].type && this.models[this.iterator].base[root].type === 'field') {
                  params = _.merge(params, qs.encodeParam({term: term, relatedSearchTerm: true}), combineSameSearches)
                } else {
                  params = _.merge(params, qs.encodeParam({term: term, searchTerm: true}), combineSameSearches)
                }
              }
              // The related fields need to also be checked for related searches.
              // The related fields for the search are retrieved from the API
              // options endpoint, and are stored in the $scope.model. FYI, the
              // Django search model is what sets the related fields on the model.
              else if (_.contains(this.models[this.iterator].related, root)) {
                params = _.merge(params, qs.encodeParam({term: term, relatedSearchTerm: true}), combineSameSearches)
              }
              // Its not a search term or a related search term - treat it as a string
              else {
                params = _.merge(params, this.searchWithoutKey(term), combineSameSearches)
              }
            }
          }
        })

        queryset = _.merge({}, queryset, params, (objectValue, sourceValue, key, object) => {
          if (object[key] && object[key] !== sourceValue) {
            if (_.isArray(object[key])) {
              // Add the new value to the array and return
              object[key].push(sourceValue)
              return object[key]
            } else {
              if (this.singleSearchParam) {
                if (!object[key]) {
                  return sourceValue
                } else {
                  let singleSearchParamKeys = object[key].split('%20and%20')

                  if (_.includes(singleSearchParamKeys, sourceValue)) {
                    return object[key]
                  } else {
                    return object[key] + '%20and%20' + sourceValue
                  }
                }
              }
              // Start the array of keys
              return [object[key], sourceValue]
            }
          } else {
            // // https://lodash.com/docs/3.10.1#merge
            // If customizer fn returns undefined merging is handled by default _.merge algorithm
            return undefined
          }
        })

        console.log('PUSH_QUERY', queryset, qs.encodeQueryset(queryset))
        this.updateQueryset({ iterator: this.iterator, queryset: qs.encodeQueryset(queryset) })

        this.searchTerm = null

        this.generateSearchTags()
      }
    },
    // remove tag, merge new queryset, $state.go
    removeTerm: function (index) {
      let tagToRemove = this.searchTags.splice(index, 1)[0],
        termParts = SmartSearchService.splitTermIntoParts(tagToRemove),
        removed
      let _this = this
      let removeFromQuerySet = function (set) {
        _.each(removed, (value, key) => {
          if (Array.isArray(set[key])) {
            _.remove(set[key], (item) => item === value)
            // If the array is now empty, remove that key
            if (set[key].length === 0) {
              delete set[key]
            }
          } else {
            if (_this.singleSearchParam && set[_this.singleSearchParam] && set[_this.singleSearchParam].includes('%20and%20')) {
              let searchParamParts = set[_this.singleSearchParam].split('%20and%20')
              // The value side of each paramPart might have been encoded in SmartSearch.splitFilterIntoTerms
              _.each(searchParamParts, (paramPart, paramPartIndex) => {
                searchParamParts[paramPartIndex] = decodeURIComponent(paramPart)
              })
              var index = searchParamParts.indexOf(value)
              if (index !== -1) {
                searchParamParts.splice(index, 1)
              }
              set[_this.singleSearchParam] = searchParamParts.join('%20and%20')
            } else {
              delete set[key]
            }
          }
        })
      }

      if (termParts.length === 1) {
        removed = this.searchWithoutKey(tagToRemove)
      } else {
        let root = termParts[0].split('.')[0].replace(/^-/, '')
        let encodeParams = {
          term: tagToRemove,
          singleSearchParam: this.singleSearchParam ? this.singleSearchParam : false
        }
        if (this.models[this.iterator]) {
          if (this.singleSearchParam) {
            removed = qs.encodeParam(encodeParams)
          } else if (_.has(this.models[this.iterator].base, root)) {
            if (this.models[this.iterator].base[root].type && this.models[this.iterator].base[root].type === 'field') {
              encodeParams.relatedSearchTerm = true
            } else {
              encodeParams.searchTerm = true
            }
            removed = qs.encodeParam(encodeParams)
          } else if (_.contains(this.models[this.iterator].related, root)) {
            encodeParams.relatedSearchTerm = true
            removed = qs.encodeParam(encodeParams)
          } else {
            removed = this.searchWithoutKey(termParts[termParts.length - 1])
          }
        } else {
          removed = this.searchWithoutKey(termParts[termParts.length - 1])
        }
      }
      let cleared = _.cloneDeep(queryset)
      removeFromQuerySet(cleared)
      console.log('ROUTER_PUSH', this.$route.query, queryset, cleared)
      this.updateQueryset({ iterator: this.iterator, queryset: qs.encodeQueryset(cleared) })
      queryset = cleared
      if (this.querySet) {
        this.querySet = queryset
      }
      this.generateSearchTags()
    },
    clearAllTerms: function () {
      let cleared = _.cloneDeep(defaults)
      delete cleared.page
      queryset = cleared
      this.updateQueryset({ iterator: this.iterator, queryset: qs.encodeQueryset(queryset) })
      this.searchTags = qs.stripDefaultParams(queryset, defaults)
    }
  },
  created () {
    this.initModels(this.type)
  }
}
</script>

<style lang="less">
@import "../../styles/colors.default.less";
.SmartSearch {
  padding-left: 15px;
  padding-right: 15px;
}

.SmartSearch-form {
  width: 100%;
}

.SmartSearch-bar {
  display: flex;
  padding: 0;
  font-size: 12px;
  align-items: stretch;
  line-height: 20px;
  width: 50%;
}

.SmartSearch-bar--fullWidth {
  width: 100%;
}

.SmartSearch-tags {
  padding-left: 0px;
}

.SmartSearch-bar i {
  font-size: 16px;
  color: @default-icon;
}

.SmartSearch-searchTermContainer {
  flex: initial;
  flex-grow: 1;
  border: 1px solid @b7grey;
  border-radius: 4px;
  display: flex;
  background-color: @default-bg;
  position: relative;
  height: 34px;
}

.SmartSearch-searchTermContainer.is-open {
  border-bottom-right-radius: 0;
}

.SmartSearch-input {
  flex: 1 0 auto;
  margin: 0 10px;
  border: none;
  font-size: 14px;
  height: 100%;
  width: 100%;
}

.SmartSearch-input:focus,
.SmartSearch-input:active {
  outline: 0;
}

.SmartSearch-searchTermContainer input:placeholder-shown {
  color: @default-icon !important;
  text-transform: uppercase;
}

.SmartSearch-searchButton {
  flex: initial;
  margin-left: auto;
  padding: 8px 10px;
  border-left: 1px solid @b7grey;
  background-color: @default-bg;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 1;
}

.SmartSearch-searchButton:hover {
  background-color: @default-tertiary-bg;
}

.SmartSearch-flexContainer {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.SmartSearch-tagContainer {
  display: flex;
  max-width: 100%;
  margin-top: 10px;
}

.SmartSearch-tag {
  border-radius: 5px;
  padding: 2px 10px;
  margin: 0px;
  font-size: 12px;
  color: @default-interface-txt;
  background-color: @default-bg;
  margin-right: 10px;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 20px;
}

.SmartSearch-tag--deletable {
  margin-right: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-right: 0;
  max-width: ~"calc(100% - 23px)";
  background-color: @default-link;
  color: @default-bg;
  margin-right: 10px;
}

.SmartSearch-deleteContainer {
  background-color: @default-link!important;
  color: white;
  background-color: @default-bg;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 0 5px;
  margin: 0px;
  align-items: center;
  display: flex;
  cursor: pointer;
  height: 20px;
}

.SmartSearch-tagDelete {
  font-size: 13px;
}

.SmartSearch-name {
  flex: initial;
  max-width: 100%;
}

.SmartSearch-tag--deletable > .SmartSearch-name {
  max-width: ~"calc(100% - 23px)";
}

.SmartSearch-deleteContainer:hover {
  border-color: @default-err;
  background-color: @default-err!important;
}

.SmartSearch-deleteContainer:hover > .SmartSearch-tagDelete {
  color: @default-bg;
}
.SmartSearch-clearAll {
  font-size: 10px;
  padding-top: 14px;
}
.SmartSearch-keyToggle {
  margin-right: auto;
  margin-left: 20px;
  text-transform: uppercase;
  background-color: @default-bg;
  border-radius: 5px;
  color: @default-interface-txt;
  border: 1px solid @b7grey;
  cursor: pointer;
  min-width: 70px;
  height: 34px;
  line-height: 20px;
}
.SmartSearch-keyToggle.btn {
    display:inline-block;
    margin-bottom:0;
    font-weight:400;
    text-align:center;
    vertical-align:middle;
    cursor:pointer;
    background-image:none;
    white-space:nowrap;
    padding:6px 12px;
    font-size:14px;
    line-height:1.42857143;
    border-radius:4px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none
}

.SmartSearch-keyToggle:hover {
  background-color: @default-tertiary-bg;
}

.SmartSearch-keyToggle.is-active {
  background-color: @default-link;
  border-color: @default-link;
  color: @default-bg;
  &:hover {
    background-color: @default-link-hov;
  }
}

.SmartSearch-keyPane {
  max-height: 215px;
  overflow: auto;
  margin: 10px 0 0 0;
  font-size: 12px;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid @d7grey;
  background-color: @login-notice-bg;
  color: @login-notice-text;
  position: relative;
}

.SmartSearch-keyRow {
  margin-bottom: 15px;
}

.SmartSearch-keyRow:last-child {
  margin-bottom: 0;
}

.SmartSearch-keyName {
  flex: 1 0 auto;
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 3px;
}

.SmartSearch-keyComparators {
  flex: 1 0 auto;
}

.SmartSearch-keyPane--exit {
  background-color: @login-notice-bg;
}

.SmartSearch-examples {
  display: flex;
  flex-wrap: wrap;
}

.SmartSearch-examples--title {
  margin-right: 5px;
}

.SmartSearch-examples--search {
  color: @default-err;
  background-color: @default-bg;
  border: 1px solid @default-border;
  border-radius: 5px;
  padding: 0px 5px;
  margin-right: 5px;
}

@media (max-width: 700px) {
  .SmartSearch-bar {
    width: 100%;
  }
}
</style>
