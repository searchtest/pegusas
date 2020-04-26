<template>
  <el-form :model="flume" :rules="rules" ref="form" label-position="top">
    <el-row class="panel">
      <el-col :span="24">
        <div class="List-title">
          <i class="fa fa-lg">模板信息</i>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="List-title">
          <el-divider></el-divider>
        </div>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="flume.name" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="模板描述" prop="description">
          <el-input v-model="flume.description" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="应用组" prop="team">
          <el-input v-model="flume.team" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="JIRA工单号" prop="jira_key">
          <el-input v-model="flume.jira_key" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="panel">
      <el-form :model="collect" :rules="rules_temp" ref="form_temp" label-position="top">
        <el-row >
          <el-col :span="24">
            <div class="List-title">
              <i class="fa fa-lg">采集信息</i>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="List-title">
              <el-divider></el-divider>
            </div>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="配置描述" prop="description_temp">
              <el-input v-model="collect.description_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="日志文件全路径" prop="flume_log_dir_temp">
              <el-input v-model="collect.flume_log_dir_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="日志tmp文件全路径" prop="flume_logtmp_dir_temp">
              <el-input v-model="collect.flume_logtmp_dir_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="offset记录文件名" prop="flume_position_file_temp">
              <el-input v-model="collect.flume_position_file_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="缓存文件名" prop="flume_channel_file_temp">
              <el-input v-model="collect.flume_channel_file_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="目的kafka" prop="flume_kafka_temp">
              <el-input v-model="collect.flume_kafka_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="目的kafka topic" prop="flume_kafka_topic_temp">
              <el-input v-model="collect.flume_kafka_topic_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display: flex;justify-content: flex-end">
            <el-form-item label="采集信息暂存到当前页面" class="redItem">
              <el-button type="primary" @click="clearStage()" :disabled="!editable">清空配置</el-button>
              <el-button type="primary" @click="collectStage()" :disabled="!editable">暂存配置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-col :span="24" class="list">
        <el-form-item>
          <el-table :data="collects">
            <el-table-column prop="description" label="配置描述" min-width="200"></el-table-column>
            <el-table-column prop="flume_log_dir" label="日志文件全路径" min-width="200"></el-table-column>
            <el-table-column prop="flume_kafka" label="目的kafka" min-width="200"></el-table-column>
            <el-table-column prop="flume_kafka_topic" label="目的kafka topic" min-width="200"></el-table-column>
            <el-table-column label="操作" min-width="200" align="right">
              <template slot-scope="scope">
                <el-button @click.native.prevent="showDataManage(scope.$index, collects)" type="text" size="small">
                  展示
                </el-button>
                <el-button @click.native.prevent="deleteRow(scope.$index, collects)" type="text" size="small" :disabled="!editable">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="!editable">配置信息保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../../http-common'

export default {
  name: 'FlumeDetail',
  props: ['flumeId', 'type'],
  computed: {
    ...mapState({
      flume: state => state.template.activeTemplate,
      collects: state => state.template.activeTemplate.related_template
    })
  },
  data () {
    return {
      collect: {},
      rules: {
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        team: [{ required: true, message: '请输入应用组', trigger: 'blur' }],
        description: [{ required: true, message: '请输入模板描述', trigger: 'blur' }],
        jira_key: [{ required: true, message: '请输入JIRA工单号', trigger: 'blur' }]
      },
      rules_temp: {
        description_temp: [{ required: true, message: '请输入配置描述', trigger: 'blur' }],
        flume_log_dir_temp: [{ required: true, message: '请输入日志文件全路径:', trigger: 'blur' }],
        flume_logtmp_dir_temp: [{ required: true, message: '请输入日志tmp文件全路径', trigger: 'blur' }],
        flume_position_file_temp: [{ required: true, message: '请输入Offset记录文件名', trigger: 'blur' }],
        flume_channel_file_temp: [{ required: true, message: '请输入缓存文件名', trigger: 'blur' }],
        flume_kafka_temp: [{ required: true, message: '请输入目的kafka', trigger: 'blur' }],
        flume_kafka_topic_temp: [{ required: true, message: '请输入目的kafka topic', trigger: 'blur' }]
      },
      editable: false
    }
  },
  created () {
  },
  mounted () {
    this.fecthAppFlume()
    console.log('###TYPE###', this.type)
    if (this.type === 'create') {
      this.resetTemplate()
    } else {
      this.fetchTemplateDetail(this.flumeId)
    }
  },
  methods: {
    ...mapActions([
      'fetchTemplateDetail',
      'updateTemplate',
      'createTemplate',
      'resetTemplate'
    ]),
    fecthAppFlume () {
      if (this.type === 'view') {
        this.editable = false
      } else {
        this.editable = true
      }
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    collectStage () {
      this.$refs.form_temp.validate((valid) => {
        if (valid) {
          let contentList = {
            description: this.collect.description_temp,
            flume_log_dir: this.collect.flume_log_dir_temp,
            flume_logtmp_dir: this.collect.flume_logtmp_dir_temp,
            flume_position_file: this.collect.flume_position_file_temp,
            flume_channel_file: this.collect.flume_channel_file_temp,
            flume_kafka: this.collect.flume_kafka_temp,
            flume_kafka_topic: this.collect.flume_kafka_topic_temp
          }
          this.collects.push(contentList)
        }
      })
    },
    clearStage () {
      this.collect = {}
    },
    cancel () {
      this.$router.push({ name: 'Templates', params: { config: 'flume' } })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.collects.length === 0) {
            this.$confirm('采集信息不能为空', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              // 点击确定的操作(调用接口)
            }).catch(() => {
              // 几点取消的提示
            })
          } else {
            this.flume.related_template = this.collects
            this.flume.template_type = 'flume'
            console.log('###RELATED_TEMPLATE_FLUME###', this.flume)
            if (this.type === 'create') {
              this.createTemplate(this.flume)
            } else {
              this.flume.id = this.flumeId
              this.updateTemplate(this.flume)
            }
          }
        }
      })
    },
    showDataManage (index, rows) {
      let contentList = {
        description_temp: rows[index].description,
        flume_log_dir_temp: rows[index].flume_log_dir,
        flume_logtmp_dir_temp: rows[index].flume_logtmp_dir,
        flume_position_file_temp: rows[index].flume_position_file,
        flume_channel_file_temp: rows[index].flume_channel_file,
        flume_kafka_temp: rows[index].flume_kafka,
        flume_kafka_topic_temp: rows[index].flume_kafka_topic
      }
      this.collect = contentList
    }
  }
}
</script>
