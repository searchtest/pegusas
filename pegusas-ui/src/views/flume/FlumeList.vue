<template>
    <el-row class="panel">
        <el-col style="padding: 10px 0">
          <el-row :gutter="30" style="padding: 0 0 30px 0">
            <el-col :span="24">
              <div class="List-title" style="margin: 10px">
                <div class="List-titleText">Flume配置</div>
              </div>
            </el-col>
            <el-col :span="24">
              <el-col :span="12">
                <el-input placeholder="请输入" v-model="filter.flume_name"
                          @keyup.enter.native="onSearchChange({flume__name__icontains: filter.flume_name})"
                          @clear="onSearchChange({flume__name__icontains: filter.flume_name})" :clearable="true">
                </el-input>
              </el-col>
              <div style="display: flex;justify-content: flex-end">
                <router-link :to="{ name: 'createFlume', }">
                  <el-button type="primary">新建</el-button>
                </router-link>
              </div>
            </el-col>
          </el-row>
          <el-col :span="24" class="list">
            <el-table :data="flumes.results">
              <el-table-column prop="name" label="模板名称" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="description" label="模板描述" min-width="100"></el-table-column>
              <el-table-column prop="team" label="团队" min-width="50"></el-table-column>
              <el-table-column prop="applist" label="链接应用" min-width="200"></el-table-column>
              <el-table-column prop="jirastatus" label="审核状态" min-width="60"></el-table-column>
              <el-table-column label="操作" min-width="200" align="right">
                <template slot-scope="scope">
                  <el-tooltip content="编辑" placement="top">
                    <button class="List-actionButton" @click="viewFlumes(scope.row, 'update')">
                      <i class="fa fa-pencil"></i>
                    </button>
                  </el-tooltip>
                  <el-tooltip content="查看" placement="top">
                    <button class="List-actionButton" @click="viewFlumes(scope.row, 'view')">
                      <i class="fa fa-search-plus"></i>
                    </button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <!--工具条-->
          <el-col :span="24" style="display: flex; justify-content: flex-end">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="search.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="search.page_size"
              layout="sizes, prev, pager, next"
              :total="flumes.count">
            </el-pagination>
          </el-col>
        </el-col>
    </el-row>
</template>
<script>
import axios from '../../http-common'
import moment from 'moment'
import Vue from 'vue'

export default {
  name: 'flumeList',
  computed: {
  },
  data () {
    return {
      flumes: {},
      url: null,
      search: {
        page: 1,
        page_size: 10,
        type: 'flume'
      },
      filter: {
        flume_name: ''
      }
    }
  },
  mounted: function () {
    this.getFlumes({ url: this.url, params: this.search })
  },
  methods: {
    moment: moment,
    viewFlumes (row, type) {
      this.$router.push({ name: 'FlumeDetailInfo', params: { flumeId: row.id, type: type } })
    },
    getFlumes ({ url, params }) {
      console.log('###GET_FLUMES###', url, params)
      url = url || '/api/v1/template/'
      axios.get(url, { params })
        .then((res) => {
          console.log('###GET_FLUMES_RES###', res)
          this.flumes = res.data
          console.log('###GET_FLUMES_DATA###', this.flumes)
        })
        .catch(error => console.log(error))
    },
    onSearchChange (param) {
      for (let m in param) {
        console.log('###ON_SEARCH_CHANGE###', m, param[m])
        if (param[m] === '') {
          Vue.delete(this.search, m)
          console.log('###ON_SEARCH_CHANGE_DELETE_KEY###',m)
        } else {
          this.search = {...this.search, ...param}
          this.search.page = 1
          console.log('###ON_SEARCH_CHANGE_ADD_KEY###', ...param)
        }
        this.search.page = 1
        this.getFlumes({ url: this.url, params: this.search })
      }
    },
    handleSizeChange (val) {
      this.search = { ...this.search, page: 1, page_size: val }
    },
    handleCurrentChange (val) {
      this.search = { ...this.search, page: val }
    }
  }
}
</script>
