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
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="logstash.name" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="模板描述" prop="description">
          <el-input v-model="logstash.description" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="应用组" prop="team_id">
          <el-input v-model="logstash.team_id" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="panel">
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
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="数据源kafka" >
          <el-input v-model="collect.logstash_kafka" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="数据源kafka topic">
          <el-input v-model="collect.logstash_kafka_topic" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="数据源kafka消费者名称" >
          <el-input v-model="collect.logstash_kafka_name" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="数据处理配置" >
          <el-input type="textarea" :rows="5" v-model="collect.logstash_data_pro" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="目的ES集群">
          <el-input v-model="collect.logstash_es" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="目的ES index">
          <el-input v-model="collect.logstash_es_index" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <el-form-item label="采集信息暂存到当前页面" class="redItem">
          <el-button type="primary" @click="clearStage()">清空</el-button>
          <el-button type="primary" @click="collectStage()">暂存</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="list">
        <el-form-item>
          <el-table :data="collects">
            <el-table-column prop="logstash_kafka" label="数据源kafka" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="logstash_kafka_topic" label="数据源kafka topic" min-width="100"></el-table-column>
            <el-table-column prop="logstash_kafka_name" label="数据源kafka消费者名称" min-width="80"></el-table-column>
            <el-table-column prop="logstash_data_pro" label="数据处理配置" min-width="250"></el-table-column>
            <el-table-column prop="logstash_es" label="目的ES集群" min-width="80"></el-table-column>
            <el-table-column prop="logstash_es_index" label="目的ES index" min-width="100"></el-table-column>
            <el-table-column label="操作" min-width="200" align="right">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, collects)" type="text" size="small">
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
          <router-link :to="{ name: 'Logstashes' }">
            <el-button>取消</el-button>
          </router-link>
          <el-button type="primary" @click="onSubmit">配置信息保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import axios from '../../http-common'

export default {
  name: 'LogstashDetailInfo',
  props: ['logstashId', 'type'],
  computed: {
  },
  data () {
    return {
      collect: {},
      collects: [],
      logstash: {
        name: null,
        description: null,
        team_id: null,
        related_template: []
      },
      rules: {},
      editable: false
    }
  },
  created () {
  },
  mounted () {
    this.fecthAppLogstash()
    this.getLogstashById()
  },
  methods: {
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
      this.collects.push(this.collect)
    },
    clearStage () {
      this.collect = {}
    },
    onSubmit () {
      this.logstash.related_template = this.collects
      this.updateLogstash(this.logstash)
    },
    getLogstashById () {
      // axios.get('/api/v1/templates/' + this.logstashId)
      //   .then((res) => {
      //     console.log('###GET_LOGSTASHBY_ID_START###', res)
      //     this.logstash = res.data
      //     this.collects = this.logstash.related_template
      //     console.log('###GET_LOGSTASHBY_ID_END###', this.logstash)
      //   })
      //   .catch(error => console.log(error))
      this.logstash = {
        name: 'sdf',
        description: 'sadf',
        team_id: 'adsff',
        related_template: [
          {
            logstash_kafka: 'adsf',
            logstash_kafka_topic: 'ds',
            logstash_kafka_name: 'adf',
            logstash_data_pro: 'asd',
            logstash_es: 'adfs',
            logstash_es_index: 'adfs'
          },
          {
            logstash_kafka: 'adsf',
            logstash_kafka_topic: 'ds',
            logstash_kafka_name: 'adf',
            logstash_data_pro: 'asd',
            logstash_es: 'adfs',
            logstash_es_index: 'adfs'
          },
          {
            logstash_kafka: 'adsf',
            logstash_kafka_topic: 'ds',
            logstash_kafka_name: 'adf',
            logstash_data_pro: 'asd',
            logstash_es: 'adfs',
            logstash_es_index: 'adfs'
          },
          {
            logstash_kafka: 'adsf',
            logstash_kafka_topic: 'ds',
            logstash_kafka_name: 'adf',
            logstash_data_pro: 'asd',
            logstash_es: 'adfs',
            logstash_es_index: 'adfs'
          },
          {
            logstash_kafka: 'adsf',
            logstash_kafka_topic: 'ds',
            logstash_kafka_name: 'adf',
            logstash_data_pro: 'asd',
            logstash_es: 'adfs',
            logstash_es_index: 'adfs'
          }
        ]
      }
      this.collects = this.logstash.related_template
    },
    updateLogstash (params) {
      axios.post('/api/v1/templates/', { params })
        .then((res) => {
          console.log('###GET_LOGSTASHES_RES###', res)
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
<style>
  .redItem .el-form-item__label{
    color: indianred;
  }
</style>
