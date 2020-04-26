<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">批次管理</div>
      </div>
    </el-col>
    <el-col :span="24">
      <Search name="appBatchs" iterator="appBatch">
        <div style="display: flex;justify-content: flex-end">
          <el-button type="primary" @click="createAppBatch()">创建批次</el-button>
        </div>
      </Search>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="appBatchs.results">
        <el-table-column prop="name" label="应用批次名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="批次更新时间" min-width="100"></el-table-column>
        <el-table-column prop="time" label="执行时间" min-width="100"></el-table-column>
        <el-table-column prop="type" label="任务类型" min-width="100"></el-table-column>
        <el-table-column prop="rate" label="主机成功比例(成功/总数)" min-width="100"></el-table-column>
        <el-table-column prop="description" label="发布版本" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-tooltip content="发布" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="setAppBacth(scope.row)">
                <i class="fa fa-rocket"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="回滚" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="setAppBacth(scope.row)">
                <i class="fa fa-recycle"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="启动" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="setAppBacth(scope.row)">
                <i class="fa fa-play-circle"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="停止" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="setAppBacth(scope.row)">
                <i class="fa fa-minus-circle"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="editAppBatch('update', scope.row)">
                <i class="fa fa-pencil"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="查看" placement="top">
              <button class="List-actionButton" v-if="scope.row.status === 'start'" @click="editAppBatch('view', scope.row)">
                <i class="fa fa-search-plus"></i>
              </button>
            </el-tooltip>
            <el-tooltip placement="top"  v-if="scope.row.status === 'running'">
              <div slot="content">执行中</div>
              <i class="fa fa-spinner fa-spin" style="font-size: 20px;color:#67c23a;"></i>
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
        :total="appBatchs.count">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../../http-common'
import moment from 'moment'
import Search from '../../../components/search/index.vue'

export default {
  name: 'appBatchs',
  props: ['batchId', 'team'],
  components: {
    Search
  },
  computed: {
    ...mapState({
      appBatchs: state => state.appBatch.appBatchs,
      queryset: state => state.queryset.querysets.appBatch
    }),
    baseUrl: () => '/api/v1/appBatch/'
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10
      },
      configDes: null
    }
  },
  mounted: function () {
    this.queryAppBatchs()
    // this.interval = setInterval(() => {
    //   this.fetchAwxJobDetail()
    // }, 5000)
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchAppBatchs',
      'fetchAwxJobDetail'
    ]),
    queryAppBatchs () {
      console.log('###QUERY_APPBATCHS###', this.baseUrl, this.queryset, this.pagination)
      this.fetchAppBatchs({ url: this.baseUrl + (this.queryset || ''), params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryAppBatchs()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryAppBatchs()
    },
    createAppBatch () {
      this.$router.push({ name: 'createAppBatch', params: { batchId: -1, team: this.team, type: 'create' } })
    },
    editAppBatch (type, row) {
      this.$router.push({ name: 'createAppBatch', params: { batchId: row.id, team: this.team, type: type } })
    }
  },
  watch: {
    queryset (newObject, oldObject) {
      console.log('###watch queryset###', newObject, oldObject)
      this.pagination = { ...this.pagination, page: 1 }
      this.queryAppBatchs()
    }
  }
}
</script>
