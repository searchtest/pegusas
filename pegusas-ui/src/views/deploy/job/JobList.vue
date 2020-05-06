<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">任务查看</div>
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
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="jobs.results">
        <el-table-column prop="name" label="任务名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="team" label="所属团队" min-width="100"></el-table-column>
        <el-table-column prop="executive" label="执行人" min-width="100"></el-table-column>
        <el-table-column prop="version" label="执行版本" min-width="100"></el-table-column>
        <el-table-column prop="time" label="执行时间" min-width="100"></el-table-column>
        <el-table-column prop="time" label="完成时间" min-width="100"></el-table-column>
        <el-table-column prop="status" label="执行状态" min-width="100"></el-table-column>
        <el-table-column label="脚本任务" min-width="100" align="right">
          <template slot-scope="scope">
            <el-tooltip content="设置" placement="top">
              <a href="http://localhost:8088/" target="_blank" >
                <i class="fa fa-search-plus"></i>
              </a>
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
        :total="jobs.count">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'appList',
  components: {},
  computed: {
    ...mapState({
      jobs: state => state.job.jobs
    })
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10
      },
      type: 'Jobs',
      filter: {
        name: ''
      },
      baseUrl: '/api/v1/jobs/'
    }
  },
  mounted: function () {
    this.queryJobs()
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchJobs'
    ]),
    queryJobs () {
      console.log('###QUERY_JOBS###', this.baseUrl, this.pagination)
      this.fetchJobs({ url: this.baseUrl, params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryJobs()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryJobs()
    },
    changeConfig (type) {
      if (type !== this.type) {
        this.$router.push({ name: type })
      }
    }
  }
}
</script>
