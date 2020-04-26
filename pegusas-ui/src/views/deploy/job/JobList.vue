<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title List-titleText" style="margin: 10px">
        <el-dropdown>
                  <span class="el-dropdown-link">
                   任务查看<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changeConfig('Apps')">应用列表</el-dropdown-item>
            <el-dropdown-item @click.native="changeConfig('Hosts')">主机运维</el-dropdown-item>
            <el-dropdown-item @click.native="changeConfig('Jobs')">任务查看</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col :span="24">
      <Search name="jobs" iterator="job"></Search>
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
import axios from '../../../http-common'
import moment from 'moment'
import Search from '../../../components/search/index.vue'

export default {
  name: 'appList',
  components: {
    Search
  },
  computed: {
    ...mapState({
      jobs: state => state.job.jobs,
      queryset: state => state.queryset.querysets.job
    }),
    baseUrl: () => '/api/v1/jobs/'
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10
      },
      type: 'Jobs'
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
      console.log('###QUERY_JOBS###', this.baseUrl, this.queryset, this.pagination)
      this.fetchJobs({ url: this.baseUrl + (this.queryset || ''), params: this.pagination })
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
  },
  watch: {
    queryset (newObject, oldObject) {
      console.log('###watch queryset###', newObject, oldObject)
      this.pagination = { ...this.pagination, page: 1 }
      this.queryJobs()
    }
  }
}
</script>
