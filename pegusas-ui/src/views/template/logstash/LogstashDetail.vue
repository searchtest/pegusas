<template>
  <el-form :model="logstash" :rules="rules" ref="form" label-position="top">
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
          <el-input v-model="logstash.name" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="模板描述" prop="description">
          <el-input v-model="logstash.description" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="应用组" prop="team">
          <el-input v-model="logstash.team" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="JIRA工单号" prop="jira_key">
          <el-input v-model="logstash.jira_key" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="panel">
      <el-form :model="collect" :rules="rules_temp" ref="form_temp" label-position="top">
        <el-row >
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
            <el-form-item label="配置描述" prop="description_temp">
              <el-input v-model="collect.description_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="源kafka" prop="logstash_kafka_temp">
              <el-input v-model="collect.logstash_kafka_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="源kafka topic" prop="logstash_kafka_topic_temp">
              <el-input v-model="collect.logstash_kafka_topic_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="kafka消费者名称" prop="logstash_kafka_consumer_temp">
              <el-input v-model="collect.logstash_kafka_consumer_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="kafka消费线程数" prop="logstash_consumer_threads_temp">
              <el-input v-model="collect.logstash_consumer_threads_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="logstash tag标签名" prop="logstash_tag_temp">
              <el-input v-model="collect.logstash_tag_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="目的ES" prop="logstash_es_temp">
              <el-input v-model="collect.logstash_es_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="ES索引名称" prop="logstash_es_index_temp">
              <el-input v-model="collect.logstash_es_index_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="日志正则匹配" prop="logstash_grok_temp">
              <el-input type="textarea" :rows="1" v-model="collect.logstash_grok_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="原始日志时间字段" prop="logstash_index_time_field_temp">
              <el-input v-model="collect.logstash_index_time_field_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="附加时间字段" prop="logstash_time_field_temp">
              <el-input v-model="collect.logstash_time_field_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="自定义配置" prop="logstash_customize_temp">
              <el-input v-model="collect.logstash_customize_temp" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display: flex;justify-content: flex-end">
            <el-form-item label="数据处理信息暂存到当前页面" class="redItem">
              <el-button type="primary" @click="clearStage()" :disabled="!editable">配置清空</el-button>
              <el-button type="primary" @click="collectStage" :disabled="!editable">配置暂存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-col :span="24" class="list">
        <el-form-item>
          <el-table :data="collects">
            <el-table-column prop="description" label="配置描述" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="logstash_kafka" label="源kafka" min-width="200"></el-table-column>
            <el-table-column prop="logstash_kafka_topic" label="源kafka topic" min-width="200"></el-table-column>
            <el-table-column prop="logstash_es_index" label="ES索引名称" min-width="200"></el-table-column>
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
          <router-link :to="{ name: 'Templates' }">
            <el-button>取消</el-button>
          </router-link>
          <el-button type="primary" @click="onSubmit" :disabled="!editable">配置信息保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LogstashDetail',
  props: ['logstashId', 'type'],
  computed: {
    ...mapState({
      logstash: state => state.template.activeTemplate,
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
        logstash_kafka_temp: [{ required: true, message: '请输入源kafka', trigger: 'blur' }],
        logstash_kafka_topic_temp: [{ required: true, message: '请输入源kafka topic', trigger: 'blur' }],
        logstash_kafka_consumer_temp: [{ required: true, message: '请输入kafka消费者名称', trigger: 'blur' }],
        logstash_consumer_threads_temp: [{ required: true, message: '请输入kafka消费线程数', trigger: 'blur' }],
        logstash_tag_temp: [{ required: true, message: '请输入logstash tag标签', trigger: 'blur' }],
        logstash_es_temp: [{ required: true, message: '请输入目的ES', trigger: 'blur' }],
        logstash_es_index_temp: [{ required: true, message: '请输入ES索引名称', trigger: 'blur' }],
        logstash_grok_temp: [{ required: true, message: '请输入日志正则匹配', trigger: 'blur' }],
        logstash_index_time_field_temp: [{ required: true, message: '请输入原始日志时间字段', trigger: 'blur' }]
      },
      editable: false,
      dialogVisible: false// 弹框是否显示
    }
  },
  created () {
  },
  mounted () {
    this.fecthAppLogstash()
    if (this.type !== 'create') {
      this.fetchTemplateDetail(this.logstashId)
    }
  },
  methods: {
    ...mapActions([
      'fetchTemplateDetail',
      'updateTemplate',
      'createTemplate'
    ]),
    fecthAppLogstash () {
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
            logstash_kafka: this.collect.logstash_kafka_temp,
            logstash_kafka_topic: this.collect.logstash_kafka_topic_temp,
            logstash_kafka_consumer: this.collect.logstash_kafka_consumer_temp,
            logstash_consumer_threads: this.collect.logstash_consumer_threads_temp,
            logstash_tag: this.collect.logstash_tag_temp,
            logstash_es: this.collect.logstash_es_temp,
            logstash_es_index: this.collect.logstash_es_index_temp,
            logstash_grok: this.collect.logstash_grok_temp,
            logstash_index_time_field: this.collect.logstash_index_time_field_temp,
            logstash_time_field: this.collect.logstash_time_field_temp,
            logstash_customize: this.collect.logstash_customize_temp
          }
          this.collects.push(contentList)
        }
      })
    },
    clearStage () {
      this.collect = {}
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.collects.length === 0) {
            this.$confirm('数据处理信息不能为空', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              // 点击确定的操作(调用接口)
            }).catch(() => {
              // 几点取消的提示
            })
          } else {
            this.logstash.related_template = this.collects
            this.logstash.template_type = 'logstash'
            console.log('###RELATED_TEMPLATE###', this.logstash)
            if (this.type === 'create') {
              this.createTemplate(this.logstash)
            } else {
              this.logstash.id = this.logstashId
              this.updateTemplate(this.logstash)
            }
          }
        }
      })
    },
    showDataManage (index, rows) {
      let contentList = {
        description_temp: rows[index].description,
        logstash_kafka_temp: rows[index].logstash_kafka,
        logstash_kafka_topic_temp: rows[index].logstash_kafka_topic,
        logstash_kafka_consumer_temp: rows[index].logstash_kafka_consumer,
        logstash_consumer_threads_temp: rows[index].logstash_consumer_threads,
        logstash_tag_temp: rows[index].logstash_tag,
        logstash_es_temp: rows[index].logstash_es,
        logstash_es_index_temp: rows[index].logstash_es_index,
        logstash_grok_temp: rows[index].logstash_grok,
        logstash_index_time_field_temp: rows[index].logstash_index_time_field,
        logstash_time_field_temp: rows[index].logstash_time_field,
        logstash_customize_temp: rows[index].logstash_customize
      }
      this.collect = contentList
    }
  }
}
</script>
