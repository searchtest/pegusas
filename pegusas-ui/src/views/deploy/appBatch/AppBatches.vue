<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">批次管理</div>
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
      <div style="display: flex;justify-content: flex-end">
        <router-link :to="{ name: 'createAppBatch', params: {appId: this.appId} }">
          <el-button type="primary">新建</el-button>
        </router-link>
      </div>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="appBatches.results">
        <el-table-column prop="name" label="应用批次名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="批次更新时间" min-width="100"></el-table-column>
        <el-table-column prop="time" label="执行时间" min-width="100"></el-table-column>
        <el-table-column prop="type" label="任务类型" min-width="100"></el-table-column>
        <el-table-column prop="rate" label="主机成功比例(成功/总数)" min-width="100"></el-table-column>
        <el-table-column prop="description" label="发布版本" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-tooltip content="安装" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="releaseBacth('install', scope.row)">
                <i class="fa fa-cogs"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="配置更新" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="releaseBacth('change', scope.row)">
                <i class="fa fa-rocket"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="启动" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="releaseBacth('start', scope.row)">
                <i class="fa fa-play-circle"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="停止" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="releaseBacth('stop', scope.row)">
                <i class="fa fa-stop-circle"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="editBatch(scope.row)">
                <i class="fa fa-pencil"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="查看" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="editBatch(scope.row, 'view')">
                <i class="fa fa-search-plus"></i>
              </button>
            </el-tooltip>
            <el-tooltip placement="top"  v-if="scope.row.status === 'running'">
              <div slot="content">执行中</div>
              <i class="fa fa-spinner fa-spin" style="font-size: 20px;color:#67c23a;"></i>
            </el-tooltip>
            <el-tooltip content="取消" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'running'" @click="releaseBacth('stop', scope.row)">
                <i class="fa fa-minus-circle"></i>
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
        :total="appBatches.count">
      </el-pagination>
    </el-col>

    <el-dialog title="配置详情" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
      <el-row class="JobResults-resultRow">
        <el-col class="JobResults-resultRowLabel" :span="2"><label>asdfasd</label></el-col>
        <el-col class="JobResults-resultRowText" :span="16"><label>asd</label></el-col>
      </el-row>
      <el-row class="JobResults-resultRow">
        <el-col class="JobResults-resultRowLabel" :span="8"><label>ACTION</label></el-col>
        <el-col class="JobResults-resultRowText" :span="8"><label>asd</label></el-col>
      </el-row>
      <el-row class="JobResults-resultRow">
        <el-col class="JobResults-resultRowLabel" :span="8"><label>CHANGES</label></el-col>
      </el-row>
      <el-row class="JobResults-resultRow">
        <el-input type="textarea" style="width: 100%" :rows="6" disabled="disabled"></el-input>
      </el-row>
      <el-row style="margin-top:10px;display: flex;justify-content: center">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="promary" @click="execute()">确定</el-button>
      </el-row>
    </el-dialog>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import Vue from 'vue'

export default {
  name: 'appBatches',
  props: ['appId', 'status'],
  components: {},
  computed: {
    ...mapState({
      appBatches: state => state.appBatch.appBatches
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
      dialogVisible: false,
      baseUrl: '/api/v1/apps/' + this.status + '/' + this.appId + '/batches/'
    }
  },
  mounted: function () {
    this.queryAppBatches()
    // this.interval = setInterval(() => {
    //   this.fetchAwxJobDetail()
    // }, 5000)
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchAppBatches',
      'fetchAwxJobDetail'
    ]),
    queryAppBatches () {
      console.log('###QUERY_APPBATCHES###', this.baseUrl, this.pagination)
      this.fetchAppBatches({ url: this.baseUrl, params: this.pagination, appId: this.appId })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryAppBatches()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryAppBatches()
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
        this.fetchAppBatches({ url: this.baseUrl, params: this.pagination, appId: this.appId })
      }
    },
    releaseBacth (type, row) {
      this.dialogVisible = true
    },
    editBatch (row, type) {
      this.$router.push({ name: 'AppBatchDetail',
        params: { appId: this.appId, id: row.id },
        query: { type: type } })
    },
    execute () {
      this.dialogVisible = false
      window.open('http://localhost:8080')
    }
  }
}
</script>
