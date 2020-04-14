<template>
    <el-row class="panel">
        <el-col :span="24">
            <el-col :span="12"><div class="List-titleText">最近使用模板</div></el-col>
            <el-col :span="12"><router-link :to="{name:'Templates'}" style="float:right;">查看全部</router-link></el-col>
        </el-col>
        <el-table :span="12" :data="templates.results" v-loading="list_loading"  style="height:320px">
            <el-table-column :span='4' label="模板名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <router-link :to="{name: 'TemplateDetail', params: {templateId: scope.row.id}}">{{ scope.row.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column :span='7' label="活动" >
                <template slot-scope="scope">
                    <div v-for="item in scope.row.summary_fields.recent_jobs" style="display: inline-block;">
                        <el-tooltip class="item" effect="dark" placement="top"
                                    v-if="item.status == 'spending'">
                            <div slot="content">状态：{{item.status}}</div>
                            <router-link :to="{ name: 'JobDetail', params: { jobId: item.id } }">
                                <el-tag type="info" style="margin-right: 5px;"></el-tag>
                            </router-link>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="top"
                                    v-else-if="item.status == 'successful'">
                                <div slot="content">状态：{{item.status}}</div>
                            <router-link :to="{ name: 'JobDetail', params: { jobId: item.id } }">
                                <el-tag type="success" style="margin-right: 5px;"></el-tag>
                            </router-link>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" placement="top"
                                    v-else>
                            <div slot="content">状态：{{item.status}}</div>
                            <router-link :to="{ name: 'JobDetail', params: { jobId: item.id } }">
                                <el-tag type="danger" style="margin-right: 5px;"></el-tag>
                            </router-link>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :span='1' label="操作" style="width: 200px" align="right">
                <template slot-scope="scope">
                    <el-tooltip content="执行该任务" placement="top">
                        <button class="List-actionButton"  @click="launch(scope.row)">
                            <i class="fa fa-rocket"></i>
                        </button>
                    </el-tooltip>
                    <el-tooltip content="编辑该模板" placement="top">
                        <button class="List-actionButton"  @click="editTemplate(scope.row)">
                            <i class="fa fa-pencil"></i>
                        </button>
                    </el-tooltip>
                </template>
            </el-table-column>

        </el-table>
    </el-row>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import axios from '../../http-common'
export default {
  name: 'resent-templates',
  computed: {
    ...mapState({
      templates: state => state.template.templates
    })
  },
  data () {
    return {
      list_loading: false,
      search: {
        page: 1,
        page_size: 5,
        order_by: '-last_job_run',
        last_job_run__isnull: false,
        type: 'workflow_job_template,job_template'
      }
    }
  },
  mounted () {
    console.log('###MOUNTED###', this.templates, this.search)
    this.fetchUnifiedTemplates(this.search)
  },
  methods: {
    ...mapActions([
      'fetchUnifiedTemplates'
    ]),
    launch (jobTemplate) {
      axios.post(jobTemplate.related.launch).then((res) => {
        console.log(res)
        let data = res.data
        this.$router.push({name: 'JobDetail', params: {jobId: data.id}})
      }).catch((error) => {
        console.log(error)
      })
    },
    editTemplate (row) {
      this.$router.push({name: 'TemplateDetail', params: {templateId: row.id}})
    }
  }
}
</script>

<style scoped>

</style>
