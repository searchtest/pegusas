<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">日志登记</div>
      </div>
    </el-col>
    <el-col :span="24">
      <Search name="logs" iterator="log">
        <div style="display: flex;justify-content: flex-end">
          <el-button type="primary" @click="createLog()">创建日志</el-button>
        </div>
      </Search>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="logs.results">
        <el-table-column prop="name" label="日志名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="team" label="所属应用" min-width="100"></el-table-column>
        <el-table-column prop="team" label="所属团队" min-width="100"></el-table-column>
        <el-table-column prop="time" label="最后更新时间" min-width="100"></el-table-column>
        <el-table-column prop="description" label="审核人" min-width="100"></el-table-column>
        <el-table-column prop="description" label="审核状态" min-width="100"></el-table-column>
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
        :total="logs.count">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../http-common'
import moment from 'moment'
import Search from '../../components/search/index.vue'

export default {
  name: 'logs',
  components: {
    Search
  },
  computed: {
    ...mapState({
      logs: state => state.log.logs,
      queryset: state => state.queryset.querysets.log
    })
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10
      }
    }
  },
  mounted: function () {
    this.queryLogs()
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchLogs'
    ]),
    queryLogs () {
      console.log('###QUERY_LOGS###', this.queryset, this.pagination)
      this.fetchLogs({ url: '/api/v1/logs' + (this.queryset || ''), params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryLogs()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryLogs()
    }
  },
  watch: {
    queryset (newObject, oldObject) {
      console.log('###watch queryset###', newObject, oldObject)
      this.pagination = { ...this.pagination, page: 1 }
      this.queryLogs()
    }
  }
}
</script>
