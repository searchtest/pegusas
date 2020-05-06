<template>
  <el-form :model="appBatch" :rules="rules" ref="form" label-position="top">
    <el-row class="panel">
      <el-col :span="24">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="List-title">
              <i class="fa fa-lg">批次详情</i>
            </div>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名称" prop="name">
              <el-input v-model="appBatch.name" :disabled="!editable"></el-input>
              <div style="color:#F00;">名称规范：团队-应用-批次1</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="description">
              <el-input v-model="appBatch.description" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机房" prop="idc">
              <el-select v-model="appBatch.idc" :disabled="!editable">
                <el-option v-if="appBatch.idc"
                           v-for="idc in appBatch.idc"
                           :key="idc.id"
                           :label="idc.name"
                           :value="idc.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display: flex;justify-content: flex-end">
            <el-form-item>
              <el-button type="primary" @click="showTemplate()" :disabled="!editable">关联采集模板</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-input placeholder="请输入" v-model="filter.name" @keyup.enter.native="onSearchBatchTemplates({search: filter.name})"
                        @clear="onSearchBatchTemplates({search: filter.name})" :clearable="true">
                <el-button slot="append" @click="onSearchBatchTemplates({search: filter.name})">
                  <i class="fa fa-search"></i>
                </el-button>
              </el-input>
            </el-col>
          </el-col>
          <el-col :span="24" class="list">
            <el-form-item>
              <el-table ref="batchTemplateTable" :data="batchTemplates.results" tooltip-effect="dark"
                        style="width: 100%" @selection-change="batchTemplateSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" label="模板名称" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="team" label="模板类型" min-width="100"></el-table-column>
                <el-table-column label="操作" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, appBatch.templates)" type="text" size="small" :disabled="!editable">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 5px">
                <el-button @click.native.prevent="batchTemplatesDelete()" type="text" size="small" :disabled="!editable">
                  批量移除
                </el-button>
                <!--工具条-->
                <el-pagination style="display: flex; justify-content: flex-end"
                  @size-change="handleBatchTemplatesSizeChange"
                  @current-change="handleBatchTemplatesCurrentChange"
                  :current-page="batchTemplatesSearch.page"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="batchTemplatesSearch.page_size"
                  layout="sizes, prev, pager, next"
                  :total="batchTemplates.count">
                </el-pagination>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display: flex;justify-content: flex-end">
            <el-form-item>
              <el-button type="primary" @click="showHost()" :disabled="!editable">添加主机</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-input placeholder="请输入" v-model="filter.ip" @keyup.enter.native="onSearchBatchHosts({search: filter.ip})"
                        @clear="onSearchBatchHosts({search: filter.ip})" :clearable="true">
                <el-button slot="append" @click="onSearchBatchHosts({search: filter.ip})">
                  <i class="fa fa-search"></i>
                </el-button>
              </el-input>
            </el-col>
          </el-col>
          <el-col :span="24" class="list">
            <el-form-item>
              <el-table ref="batchHostTable" :data="batchHosts.results" tooltip-effect="dark"
                        style="width: 100%" @selection-change="batchHostSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="ip" label="主机IP" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="team" label="所属团队" min-width="100"></el-table-column>
                <el-table-column prop="app" label="所属应用" min-width="100"></el-table-column>
                <el-table-column prop="idc" label="所属机房" min-width="100"></el-table-column>
                <el-table-column prop="moban" label="已关联采集模板" min-width="100"></el-table-column>
                <el-table-column prop="fuwu" label="已部署服务" min-width="100"></el-table-column>
                <el-table-column prop="status" label="服务运行状态" min-width="100"></el-table-column>
                <el-table-column prop="banben" label="已发布版本" min-width="100"></el-table-column>
                <el-table-column label="操作" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, appBatch.hosts)" type="text" size="small" :disabled="!editable">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 5px">
                <el-button @click.native.prevent="batchDelete()" type="text" size="small" :disabled="!editable">
                  批量移除
                </el-button>
                <el-pagination style="display: flex; justify-content: flex-end"
                  @size-change="handleBatchHostsSizeChange"
                  @current-change="handleBatchHostsCurrentChange"
                  :current-page="batchHostsSearch.page"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="batchHostsSearch.page_size"
                  layout="sizes, prev, pager, next"
                  :total="batchHosts.count">
                </el-pagination>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display: flex;justify-content: center">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="!editable">保存</el-button>
              <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
          </el-col>

          <el-dialog title="添加主机" :visible.sync="dialogVisible" :close-on-click-modal="false" width="70%">
            <el-row class="panel">
              <el-col :span="24">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="filter.ip" @keyup.enter.native="onSearchHosts({search: filter.ip})"
                            @clear="onSearchHosts({search: filter.ip})" :clearable="true">
                    <el-button slot="append" @click="onSearchHosts({search: filter.ip})">
                      <i class="fa fa-search"></i>
                    </el-button>
                  </el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-table ref="hostTable" :data="hosts.results" tooltip-effect="dark"
                          style="width: 100%" @selection-change="hostSelectionChange">
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column prop="ip" label="主机IP" min-width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="team" label="所属团队" min-width="100"></el-table-column>
                  <el-table-column prop="app" label="所属应用" min-width="100"></el-table-column>
                  <el-table-column prop="idc" label="所属机房" min-width="100"></el-table-column>
                  <el-table-column prop="moban" label="已关联采集模板" min-width="100"></el-table-column>
                  <el-table-column prop="fuwu" label="已部署服务" min-width="100"></el-table-column>
                  <el-table-column prop="status" label="服务运行状态" min-width="100"></el-table-column>
                  <el-table-column prop="banben" label="已发布版本" min-width="100"></el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="confirmSelection()">确认</el-button>
                </div>
              </el-col>
              <!--工具条-->
              <el-col :span="24" style="display: flex; justify-content: flex-end">
                <el-pagination
                  @size-change="handleHostsSizeChange"
                  @current-change="handleHostsCurrentChange"
                  :current-page="hostsSearch.page"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="hostsSearch.page_size"
                  layout="sizes, prev, pager, next"
                  :total="hosts.count">
                </el-pagination>
              </el-col>
            </el-row>
          </el-dialog>

          <el-dialog title="添加采集模板" :visible.sync="templateVisible" :close-on-click-modal="false" width="70%">
            <el-row class="panel">
              <el-col :span="24">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="filter.ip" @keyup.enter.native="onSearchTemplates({search: filter.ip})"
                            @clear="onSearchTemplates({search: filter.ip})" :clearable="true">
                    <el-button slot="append" @click="onSearchTemplates({search: filter.ip})">
                      <i class="fa fa-search"></i>
                    </el-button>
                  </el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-table ref="templateTable" :data="templates.results" tooltip-effect="dark"
                          style="width: 100%" @selection-change="templateSelectionChange">
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column prop="name" label="模板名称" min-width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="template_type" label="模板类型" min-width="100"></el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="templateConfirmSelection()">确认</el-button>
                </div>
              </el-col>
              <!--工具条-->
              <el-col :span="24" style="display: flex; justify-content: flex-end">
                <el-pagination
                  @size-change="handleTemplatesSizeChange"
                  @current-change="handleTemplatesCurrentChange"
                  :current-page="templatesSearch.page"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="templatesSearch.page_size"
                  layout="sizes, prev, pager, next"
                  :total="templates.count">
                </el-pagination>
              </el-col>
            </el-row>
          </el-dialog>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

export default {
  name: 'appBatchDetail',
  props: ['appId', 'batchId', 'type'],
  components: {},
  computed: {
    ...mapState({
      appBatch: state => state.appBatch.appBatchDetail,
      hosts: state => state.appBatch.hosts,
      templates: state => state.template.templates
    })
  },
  data () {
    return {
      dialogVisible: false, // 新增界面是否显示
      templateVisible: false, // 新增界面是否显示
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        idc: [{ required: true, message: '请输入机房', trigger: 'blur' }]
      },
      editable: false,
      hostSelection: [],
      batchHostSelection: [],
      templateSelection: [],
      batchTemplateSelection: [],
      batchHosts: {
        count: 0,
        results: []
      },
      batchTemplates: {
        count: 0,
        results: []
      },
      hostsSearch: {
        page: 1,
        page_size: 10
      },
      templatesSearch: {
        page: 1,
        page_size: 10
      },
      batchHostsSearch: {
        page: 1,
        page_size: 10
      },
      batchTemplatesSearch: {
        page: 1,
        page_size: 10
      },
      filter: {
        name: '',
        ip: ''
      },
      hostsUrl: '/api/v1/hosts/',
      templatesUrl: '/api/v1/templatesdetails/'
    }
  },
  mounted () {
    if (!this.batchId) {
      this.resetAppBatchDetail()
    } else {
      this.fetchAppBatchDetail(this.batchId)
      this.queryBatchHosts()
      this.queryBatchTemplates()
    }
    console.log('dsadsa', this.$route.query.type)
    if (!this.$route.query.type) {
      this.editable = true
    }
  },
  methods: {
    ...mapActions([
      'fetchAppBatchDetail',
      'createAppBatch',
      'updateAppBatch',
      'resetAppBatchDetail',
      'fetchHosts',
      'fetchTemplates'
    ]),
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.appBatch.hosts.length === 0) {
            this.$confirm('主机信息不能为空', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              // 点击确定的操作(调用接口)
            }).catch(() => {
              // 几点取消的提示
            })
          } else {
            console.log('###RELATED_APPBATCH_CREATE###', this.appBatch)
            if (this.type === 'create') {
              this.createAppBatch(this.appBatch)
            } else {
              this.appBatch.id = this.appBatchId
              this.updateAppBatch(this.appBatch)
            }
          }
        }
      })
    },
    showHost () {
      this.queryHosts()
      this.dialogVisible = true
    },
    onSearchHosts (param) {
      for (let m in param) {
        console.log('###ON_SEARCH_CHANGE###', m, param[m])
        if (param[m] === '') {
          Vue.delete(this.hostsSearch, m)
          console.log('###ON_SEARCH_CHANGE_DELETE_KEY###', m)
        } else {
          this.hostsSearch = {...this.hostsSearch, ...param}
          this.hostsSearch.page = 1
          console.log('###ON_SEARCH_CHANGE_ADD_KEY###', ...param)
        }
        this.hostsSearch.page = 1
        this.fetchHosts({ url: this.hostsUrl, params: this.hostsSearch })
      }
    },
    showTemplate () {
      this.queryTemplates()
      this.templateVisible = true
    },
    onSearchTemplates (param) {
      for (let m in param) {
        console.log('###ON_SEARCH_CHANGE###', m, param[m])
        if (param[m] === '') {
          Vue.delete(this.templatesSearch, m)
          console.log('###ON_SEARCH_CHANGE_DELETE_KEY###', m)
        } else {
          this.templatesSearch = {...this.templatesSearch, ...param}
          this.templatesSearch.page = 1
          console.log('###ON_SEARCH_CHANGE_ADD_KEY###', ...param)
        }
        this.templatesSearch.page = 1
        this.fetchTemplates({ url: this.templatesUrl, params: this.templatesSearch })
      }
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    cancel () {
      this.$router.push({ name: 'AppBatches', params: { appId: this.appId } })
    },
    confirmSelection () {
      this.appBatch.hosts = this.appBatch.hosts.concat(this.hostSelection)
      const res = new Map()
      this.appBatch.hosts = this.appBatch.hosts.filter((a) => !res.has(a.ip) && res.set(a.ip, 1))
      this.$refs.hostTable.clearSelection()
      this.dialogVisible = false
    },
    hostSelectionChange (val) {
      this.hostSelection = val
    },
    batchHostSelectionChange (val) {
      this.batchHostSelection = val
    },
    batchDelete () {
      this.batchHostSelection.forEach(item => {
        this.appBatch.hosts.splice(this.appBatch.hosts.indexOf(this.batchHostSelection), 1)
      })
    },
    queryHosts () {
      console.log('###QUERY_HOSTS###', this.hostsUrl, this.hostsSearch)
      this.fetchHosts({ url: this.hostsUrl, params: this.hostsSearch })
    },
    handleHostsSizeChange (val) {
      this.hostsSearch = { ...this.hostsSearch, page: 1, page_size: val }
      this.queryHosts()
    },
    handleHostsCurrentChange (val) {
      this.hostsSearch = { ...this.hostsSearch, page: val }
      this.queryHosts()
    },
    templateConfirmSelection () {
      this.appBatch.templates = this.appBatch.templates.concat(this.templateSelection)
      const res = new Map()
      this.appBatch.templates = this.appBatch.templates.filter((a) => !res.has(a.ip) && res.set(a.ip, 1))
      this.$refs.templateTable.clearSelection()
      this.templateVisible = false
    },
    templateSelectionChange (val) {
      this.templateSelection = val
    },
    batchTemplateSelectionChange (val) {
      this.batchTemplateSelection = val
    },
    batchTemplatesDelete () {
      this.batchTemplateSelection.forEach(item => {
        this.appBatch.templates.splice(this.appBatch.templates.indexOf(this.batchTemplateSelection), 1)
      })
    },
    queryTemplates () {
      console.log('###QUERY_TEMPLATEs###', this.templatesUrl, this.templatesSearch)
      this.fetchTemplates({ url: this.templatesUrl, params: this.templatesSearch })
    },
    handleTemplatesSizeChange (val) {
      this.templatesSearch = { ...this.templatesSearch, page: 1, page_size: val }
      this.queryTemplates()
    },
    handleTemplatesCurrentChange (val) {
      this.templatesSearch = { ...this.templatesSearch, page: val }
      this.queryTemplates()
    },
    onSearchBatchTemplates (param) {
      for (let m in param) {
        console.log('###ON_SEARCH_CHANGE###', m, param[m])
        if (param[m] === '') {
          Vue.delete(this.batchTemplatesSearch, m)
          console.log('###ON_SEARCH_CHANGE_DELETE_KEY###', m)
        } else {
          this.batchTemplatesSearch = {...this.batchTemplatesSearch, ...param}
          this.batchTemplatesSearch.page = 1
          console.log('###ON_SEARCH_CHANGE_ADD_KEY###', ...param)
        }
        this.batchTemplatesSearch.page = 1
        this.queryBatchTemplates()
      }
    },
    queryBatchTemplates () {
      var arr = []
      if (this.batchTemplatesSearch.search) {
        this.appBatch.hosts.forEach(function (item, index) {
          if (this.batchTemplatesSearch.search === item.ip) {
            arr.push(item)
          }
        })
      } else {
        arr = this.appBatch.hosts
      }
      let page = this.batchTemplatesSearch.page
      let pageSize = this.batchTemplatesSearch.page_size
      var i = page * pageSize
      var length = arr.length
      if (i <= length) {
        this.batchTemplates.results = arr.slice(i - pageSize, i)
      } else {
        this.batchTemplates.results = arr.slice(i - pageSize, length)
      }
      this.batchTemplates.count = length
    },
    handleBatchTemplatesSizeChange (val) {
      this.batchTemplatesSearch = { ...this.batchTemplatesSearch, page: 1, page_size: val }
      this.queryBatchTemplates()
    },
    handleBatchTemplatesCurrentChange (val) {
      this.batchTemplatesSearch = { ...this.batchTemplatesSearch, page: val }
      this.queryBatchTemplates()
    },
    onSearchBatchHosts (param) {
      for (let m in param) {
        console.log('###ON_SEARCH_CHANGE###', m, param[m])
        if (param[m] === '') {
          Vue.delete(this.batchHostsSearch, m)
          console.log('###ON_SEARCH_CHANGE_DELETE_KEY###', m)
        } else {
          this.batchHostsSearch = {...this.batchHostsSearch, ...param}
          this.batchHostsSearch.page = 1
          console.log('###ON_SEARCH_CHANGE_ADD_KEY###', ...param)
        }
        this.batchHostsSearch.page = 1
        this.queryBatchHosts()
      }
    },
    queryBatchHosts () {
      var arr = []
      if (this.batchHostsSearch.search) {
        this.appBatch.hosts.forEach(function (item, index) {
          if (this.batchHostsSearch.search === item.ip) {
            arr.push(item)
          }
        })
      } else {
        arr = this.appBatch.hosts
      }
      let page = this.batchHostsSearch.page
      let pageSize = this.batchHostsSearch.page_size
      var i = page * pageSize
      var length = arr.length
      if (i <= length) {
        this.batchHosts.results = arr.slice(i - pageSize, i)
      } else {
        this.batchHosts.results = arr.slice(i - pageSize, length)
      }
      this.batchHosts.count = length
    },
    handleBatchHostsSizeChange (val) {
      this.batchHostsSearch = { ...this.batchHostsSearch, page: 1, page_size: val }
      this.queryBatchHosts()
    },
    handleBatchHostsCurrentChange (val) {
      this.batchHostsSearch = { ...this.batchHostsSearch, page: val }
      this.queryBatchHosts()
    }
  }
}
</script>
