<template>
  <div>
    <el-row class="panel">
      <el-form :model="logstash" :rules="rules" ref="form" label-position="top">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="List-title">
              <i class="fa fa-lg">数据处理信息</i>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="List-title">
              <el-divider></el-divider>
            </div>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="配置描述" prop="description">
              <el-input v-model="logstash.description" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="源kafka" prop="logstash_kafka">
              <el-input v-model="logstash.logstash_kafka" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="源kafka topic" prop="logstash_kafka_topic">
              <el-input v-model="logstash.logstash_kafka_topic" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="kafka消费者名称" prop="logstash_kafka_consumer">
              <el-input v-model="logstash.logstash_kafka_consumer" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="kafka消费线程数" prop="logstash_consumer_threads">
              <el-input v-model="logstash.logstash_consumer_threads" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="logstash tag标签名" prop="logstash_tag">
              <el-input v-model="logstash.logstash_tag" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="目的ES" prop="logstash_es">
              <el-input v-model="logstash.logstash_es" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="ES索引名称" prop="logstash_es_index">
              <el-input v-model="logstash.logstash_es_index" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="日志正则匹配" prop="logstash_grok">
              <el-input type="textarea" :rows="1" v-model="logstash.logstash_grok" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="原始日志时间字段" prop="logstash_index_time_field">
              <el-input v-model="logstash.logstash_index_time_field" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="附加时间字段" prop="logstash_time_field">
              <el-input v-model="logstash.logstash_time_field" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="自定义配置" prop="logstash_customize">
              <el-input type="textarea" :rows="1" v-model="logstash.logstash_customize" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display: flex;justify-content: center">
            <el-form-item class="redItem">
              <el-button type="primary" @click="cancel">取消</el-button>
              <el-button type="primary" @click="onSubmit" :disabled="!editable">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../../http-common'

export default {
  name: 'LogstashDetail',
  props: ['id', 'templateId'],
  computed: {
    ...mapState({
      logstash: state => state.logstash.logstash
    })
  },
  data () {
    return {
      rules: {
        description: [{ required: true, message: '请输入配置描述', trigger: 'blur' }],
        logstash_kafka: [{ required: true, message: '请输入源kafka', trigger: 'blur' }],
        logstash_kafka_topic: [{ required: true, message: '请输入源kafka topic', trigger: 'blur' }],
        logstash_kafka_consumer: [{ required: true, message: '请输入kafka消费者名称', trigger: 'blur' }],
        logstash_consumer_threads: [{ required: true, message: '请输入kafka消费线程数', trigger: 'blur' }],
        logstash_tag: [{ required: true, message: '请输入logstash tag标签', trigger: 'blur' }],
        logstash_es: [{ required: true, message: '请输入目的ES', trigger: 'blur' }],
        logstash_es_index: [{ required: true, message: '请输入ES索引名称', trigger: 'blur' }],
        logstash_grok: [{ required: true, message: '请输入日志正则匹配', trigger: 'blur' }],
        logstash_index_time_field: [{ required: true, message: '请输入原始日志时间字段', trigger: 'blur' }]
      },
      editable: false
    }
  },
  created () {
  },
  mounted () {
    if (this.id) {
      this.fetchLogstashDetail(this.id)
    } else {
      this.resetLogstash()
    }
    if (!this.$route.query.type) {
      this.editable = true
    }
  },
  methods: {
    ...mapActions([
      'fetchLogstashDetail',
      'updateLogstash',
      'createLogstash',
      'resetLogstash'
    ]),
    cancel () {
      this.$router.push({ name: 'LogstashList', params: { templateId: this.templateId } })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('###RELATED_TEMPLATE_LOGSTASH###', this.logstash)
          if (this.id) {
            this.updateTemplate(this.logstash)
          } else {
            this.createTemplate(this.logstash)
          }
        }
      })
    }
  }
}
</script>
