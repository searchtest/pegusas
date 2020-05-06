<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">日志登记</div>
      </div>
    </el-col>
    <el-col :span="24">
      <el-col :span="12">
        <el-input placeholder="请输入" v-model="filter.name" @keyup.enter.native="onSearchChange({search: filter.name})"
                  @clear="onSearchChange({search: filter.name})" :clearable="true">
          <el-button slot="append" @click="onSearchChange({search: filter.name})">
            <i class="fa fa-search"></i>
          </el-button>
        </el-input>
      </el-col>
      <div style="display: flex;justify-content: flex-end">
        <router-link :to="{ name: 'createLog'}">
          <el-button type="primary">新建</el-button>
        </router-link>
      </div>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="logs.results">
        <el-table-column prop="name" label="日志名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="team" label="所属应用" min-width="100"></el-table-column>
        <el-table-column prop="team" label="所属团队" min-width="100"></el-table-column>
        <el-table-column prop="time" label="最后更新时间" min-width="100"></el-table-column>
        <el-table-column prop="description" label="审核人" min-width="100"></el-table-column>
        <el-table-column prop="description" label="审核状态" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <button class="List-actionButton" @click="viewLog(scope.row)">
                <i class="fa fa-pencil"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="查看" placement="top">
              <button class="List-actionButton" @click="viewLog(scope.row, 'view')">
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
import moment from 'moment'

export default {
  name: 'logs',
  components: {},
  computed: {
    ...mapState({
      logs: state => state.log.logs
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
      console.log('###QUERY_LOGS###', this.pagination)
      this.fetchLogs({ url: '/api/v1/logs', params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryLogs()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryLogs()
    },
    viewLog (row, type) {
      this.$router.push({ name: 'LogDetail', params: { id: row.id }, query: { type: type } })
    }
  }
}
</script>
