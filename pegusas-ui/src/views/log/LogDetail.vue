<template>
  <el-form :model="flume" :rules="rules" ref="form" label-position="top">
    <el-row class="panel">
      <el-col :span="24">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="List-title">
              <i class="fa fa-lg">日志登记</i>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="List-title">
              <el-divider></el-divider>
            </div>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日志名称" prop="name">
              <el-input v-model.trim="flume.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属应用名称" prop="appName">
              <el-input v-model.trim="flume.appName" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日志容量（GB/天）" prop="days">
              <el-input v-model.trim="flume.days" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日志保留周（天）" prop="week">
              <el-input v-model.trim="flume.week" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="description">
              <el-input v-model.trim="flume.description" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" style="display: flex;justify-content: flex-start">
        <el-form-item>
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="!editable">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../../http-common'

export default {
  name: 'LogDetail',
  props: ['flumeId', 'type'],
  computed: {
    ...mapState({
      flume: state => state.template.activeTemplate
    })
  },
  data () {
    var validate_chinese = (rule, value, callback) => {
      var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      if (reg.test(value)) {
        callback(new Error('不能包含汉子'))
      } else {
        callback()
      }
    }
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
        flume_log_dir_temp: [
          { required: true, message: '请输入日志文件全路径:', trigger: 'blur' },
          { required: true, validator: validate_chinese }
        ],
        flume_logtmp_dir_temp: [
          { required: true, message: '请输入日志tmp文件全路径', trigger: 'blur' },
          { required: true, validator: validate_chinese }
        ],
        flume_position_file_temp: [
          { required: true, message: '请输入Offset记录文件名', trigger: 'blur' },
          { required: true, validator: validate_chinese }
        ],
        flume_channel_file_temp: [
          { required: true, message: '请输入缓存文件名', trigger: 'blur' },
          { required: true, validator: validate_chinese }
        ],
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
