<template>
  <el-row class="panel">
    <el-col style="padding: 10px 0">
      <el-row :gutter="30" style="padding: 0 0 30px 0">
        <el-col :span="24">
          <div class="List-title" style="margin: 10px">
            <div class="List-titleText">
              <el-dropdown>
                    <span class="el-dropdown-link">
                     {{ configDes }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="changeConfig('Flume配置')">Flume配置</el-dropdown-item>
                  <el-dropdown-item @click.native="changeConfig('Logstash配置')">Logstash配置</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="List-title" style="margin: 10px">
            <div class="List-titleText"></div>
          </div>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-input placeholder="请输入" v-model="filter.logstash_name"
                      @keyup.enter.native="onSearchChange({logstash__name__icontains: filter.logstash_name})"
                      @clear="onSearchChange({logstash__name__icontains: filter.logstash_name})" :clearable="true">
              <el-button slot="append" @click="onSearchChange({logstash__name__icontains: filter.logstash_name})">
                <i class="fa fa-search"></i>
              </el-button>
            </el-input>
          </el-col>
          <div style="display: flex;justify-content: flex-end">
            <router-link :to="{ name: 'createLogstash', }">
              <el-button type="primary">新建</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
      <el-col :span="24" class="list">
        <el-table :data="logstashes">
          <el-table-column prop="name" label="模板名称" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="description" label="模板描述" min-width="100"></el-table-column>
          <el-table-column prop="team" label="团队" min-width="50"></el-table-column>
          <el-table-column prop="applist" label="链接应用" min-width="200"></el-table-column>
          <el-table-column prop="jirastatus" label="审核状态" min-width="60"></el-table-column>
          <el-table-column label="操作" min-width="200" align="right">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <button class="List-actionButton" @click="viewLogstashes(scope.row, 'update')">
                  <i class="fa fa-pencil"></i>
                </button>
              </el-tooltip>
              <el-tooltip content="查看" placement="top">
                <button class="List-actionButton" @click="viewLogstashes(scope.row, 'view')">
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
          :total="logstashes.count">
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
  name: 'logstashList',
  computed: {
  },
  data () {
    return {
      logstashes: [],
      url: null,
      search: {
        page: 1,
        page_size: 10,
        type: 'logstash'
      },
      filter: {
        logstash_name: ''
      },
      configDes: 'Logstash配置'
    }
  },
  mounted: function () {
    this.getLogstashes({ url: this.url, params: this.search })
  },
  methods: {
    moment: moment,
    viewLogstashes (row, type) {
      this.$router.push({ name: 'LogstashDetailInfo', params: { logstashId: row.id, type: type } })
    },
    getLogstashes ({ url, params }) {
      console.log('###GET_LOGSTASHES###', url, params)
      url = url || '/api/v1/template/'
      // axios.get(url, { params })
      //   .then((res) => {
      //     console.log('###GGET_LOGSTASHES_RES###', res)
      //     this.logstashes = res.data
      //     console.log('###GET_LOGSTASHES_DATA###', this.logstashes)
      //   })
      //   .catch(error => console.log(error))
      this.logstashes = [
        {
          name: 'logstashes配置',
          description: 'sdafasd',
          team: 'sdafasd',
          applist: 't',
          jirastatus: 'sdafasd'
        },
        {
          name: 'logstashes配置',
          description: 'sdafasd',
          team: 'sdafasd',
          applist: 'sdafasd',
          jirastatus: 'sdafasd'
        },
        {
          name: 'logstashes配置',
          description: 'sdafasd',
          team: 'sdafasd',
          applist: 'wer',
          jirastatus: 'sdafasd'
        },
        {
          name: 'logstashes配置',
          description: 'sdafasd',
          team: 'we',
          applist: 'sdafasd',
          jirastatus: 'sdafasd'
        },
        {
          name: 'logstashes配置',
          description: 'sdafasd',
          team: 'sdafasd',
          applist: 'sdafasd',
          jirastatus: 'sdafasd'
        },
        {
          name: 'logstashes配置',
          description: 'r',
          team: 'sdafasd',
          applist: 'sdafasd',
          jirastatus: 'r'
        },
        {
          name: 'af',
          description: 'f',
          team: 'f',
          applist: 'f',
          jirastatus: 'f'
        }
      ]
    },
    onSearchChange (param) {
      for (let m in param) {
        console.log('###ON_SEARCH_CHANGE###', m, param[m])
        if (param[m] === '') {
          Vue.delete(this.search, m)
          console.log('###ON_SEARCH_CHANGE_DELETE_KEY###', m)
        } else {
          this.search = { ...this.search, ...param }
          this.search.page = 1
          console.log('###ON_SEARCH_CHANGE_ADD_KEY###', ...param)
        }
        this.search.page = 1
        this.getLogstashes({ url: this.url, params: this.search })
      }
    },
    handleSizeChange (val) {
      this.search = { ...this.search, page: 1, page_size: val }
    },
    handleCurrentChange (val) {
      this.search = { ...this.search, page: val }
    },
    changeConfig (value) {
      this.configDes = value
      if (value === 'Flume配置') {
        this.$router.push({ name: 'Flumes' })
      } else {
        this.$router.push({ name: 'Logstashes' })
      }
    }
  }
}
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
