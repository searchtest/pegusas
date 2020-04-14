<template>
    <el-row class="panel">
        <el-col :span="24">
            <el-col :span="12"><div class="List-titleText">最近执行任务</div></el-col>
            <el-col :span="12"><router-link :to="{name:'Jobs'}" style="float:right;">查看全部</router-link></el-col>
        </el-col>
        <el-table :data="jobs.results" highlight-current-row v-loading="list_loading"  style="height: 320px">
            <el-table-column width="34">
                <template slot-scope="scope">
                    <el-tooltip content="任务进行中" placement="top" v-if="scope.row.status == 'running'">
                        <i class="dynamic-circle"></i>
                    </el-tooltip>
                    <el-tooltip content="任务已成功" placement="top" v-if="scope.row.status == 'successful'">
                        <i class="fa fa-circle" style="color: #5CB85C"></i>
                    </el-tooltip>
                    <el-tooltip content="任务排队中" placement="top" v-if="scope.row.status == 'pending' || scope.row.status == 'waiting' || scope.row.status == 'new'">
                        <i class="fa fa-circle-o" style="color: #8c939d"></i>
                    </el-tooltip>
                    <el-tooltip content="任务已停止" placement="top" v-if="scope.row.status == 'canceled' || scope.row.status == 'failed' || scope.row.status == 'error'">
                        <i class="fa fa-exclamation-circle" style="color: red"></i>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column :span='6' label="任务名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <router-link :to="{ name: 'JobDetail', params: { jobId: scope.row.id }}">{{ scope.row.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column :span='4' label="完成时间" align="right">
                <template slot-scope="scope">
                    {{ moment(scope.row.finished).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import moment from 'moment'
export default {
  name: 'resent-jobs',
  computed: {
    ...mapState({
      jobs: state => state.job.jobs
    })
  },
  data () {
    return {
      filters: {
        name: ''
      },
      list_loading: false,
      url: '/api/v2/jobs/',
      search: {
        page: 1,
        page_size: 5,
        order_by: '-finished',
        finished__isnull: false,
        type: 'workflow_job,job'
      }
    }
  },
  mounted () {
    this.fetchJobs({ url: this.url, params: this.search })
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchJobs'
    ])
  }
}
</script>

<style scoped>

</style>
