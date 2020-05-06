<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title List-titleText" style="margin: 10px">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{standardMsg}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changeConfig(true)">标准化应用</el-dropdown-item>
            <el-dropdown-item @click.native="changeConfig(false)">非标准化应用</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col :span="24">
      <el-col :span="12">
        <el-input placeholder="请输入" v-model="filter.name" @keyup.enter.native="onSearchChange({name: filter.name})"
                  @clear="onSearchChange({name: filter.name})" :clearable="true">
          <el-button slot="append" @click="onSearchChange({name: filter.name})">
            <i class="fa fa-search"></i>
          </el-button>
        </el-input>
      </el-col>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="apps.results">
        <el-table-column prop="name" label="应用名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="summary_fields.team.name" label="所属团队" min-width="100"></el-table-column>
        <el-table-column prop="created_at" label="上线时间" min-width="100">
          <template slot-scope="scope">
            {{ moment(scope.row.created_at).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="100"></el-table-column>
        <el-table-column label="设置批次" min-width="100" align="right">
          <template slot-scope="scope">
            <el-tooltip content="设置" placement="top">
              <button class="List-actionButton" @click="setAppBacth(scope.row)">
                <i class="fa fa-pencil"></i>
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
        :current-page="pagination.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.page_size"
        layout="sizes, prev, pager, next"
        :total="apps.count">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import Vue from 'vue'

export default {
  name: 'apps',
  components: {},
  computed: {
    ...mapState({
      apps: state => state.app.apps
    })
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10
      },
      filter: {
        name: ''
      },
      standardMsg: '标椎化应用',
      standard: true
    }
  },
  mounted: function () {
    if (this.standard) {
      this.queryStandardApps()
    } else {
      this.queryUnStandardApps()
    }
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchApps'
    ]),
    queryStandardApps () {
      console.log('###QUERY_APPS###', this.pagination)
      this.fetchApps({ url: '/api/v1/apps/standard', params: this.pagination })
    },
    queryUnStandardApps () {
      console.log('###QUERY_APPS###', this.pagination)
      this.fetchApps({ url: '/api/v1/apps/unstandard', params: this.pagination })
    },
    onSearchChange (param) {
      for (let m in param) {
        console.log('###ON_SEARCH_CHANGE###', m, param[m])
        if (param[m] === '') {
          Vue.delete(this.pagination, m)
          console.log('###ON_SEARCH_CHANGE_DELETE_KEY###', m)
        } else {
          this.pagination = {...this.pagination, ...param}
          this.pagination.page = 1
          console.log('###ON_SEARCH_CHANGE_ADD_KEY###', ...param)
        }
        this.pagination.page = 1
        if (this.standard) {
          this.fetchApps({ url: '/api/v1/apps/standard', params: this.pagination })
        } else {
          this.fetchApps({ url: '/api/v1/apps/unstandard', params: this.pagination })
        }
      }
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      if (this.standard) {
        this.queryStandardApps()
      } else {
        this.queryUnStandardApps()
      }
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      if (this.standard) {
        this.queryStandardApps()
      } else {
        this.queryUnStandardApps()
      }
    },
    setAppBacth (row) {
      this.$router.push({ name: 'AppBatches', params: { appId: row.id, standard: this.standard } })
    },
    changeConfig (type) {
      this.standard = type
      if (type) {
        this.standardMsg = '标椎化应用'
        this.queryStandardApps()
      } else {
        this.standardMsg = '非标椎化应用'
        this.queryUnStandardApps()
      }
    }
  }
}
</script>
