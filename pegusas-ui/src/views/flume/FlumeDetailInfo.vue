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
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="flume.name" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="模板描述" prop="description">
          <el-input v-model="flume.description" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="应用组" prop="team_id">
          <el-input v-model="flume.team_id" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="panel">
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
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="日志全路径" >
          <el-input v-model="collect.flume_log_dir" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="功能描述">
          <el-input v-model="collect.flume_description" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="展示平台" >
          <el-input v-model="collect.flume_platform" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="目的kafka" >
          <el-input v-model="collect.flume_kafka" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="目的kafka topic">
          <el-input v-model="collect.flume_kafka_topic" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <el-form-item label="采集信息暂存到当前页面" class="redItem">
          <el-button type="primary" @click="clearStage()" :disabled="!editable">清空</el-button>
          <el-button type="primary" @click="collectStage()" :disabled="!editable">暂存</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="list">
        <el-form-item>
          <el-table :data="collects">
            <el-table-column prop="flume_log_dir" label="日志全路径" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="flume_description" label="功能描述" min-width="100"></el-table-column>
            <el-table-column prop="flume_platform" label="展示平台" min-width="80"></el-table-column>
            <el-table-column prop="flume_kafka" label="目的kafka" min-width="100"></el-table-column>
            <el-table-column prop="flume_kafka_topic" label="目的kafka topic" min-width="100"></el-table-column>
            <el-table-column label="操作" min-width="200" align="right">
              <template slot-scope="scope">
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
          <router-link :to="{ name: 'Flumes' }">
            <el-button>取消</el-button>
          </router-link>
          <el-button type="primary" @click="onSubmit" :disabled="!editable">配置信息保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import axios from '../../http-common'

export default {
  name: 'FlumeDetailInfo',
  props: ['flumeId', 'type'],
  computed: {
  },
  data () {
    return {
      collect: {},
      collects: [],
      flume: {
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
    this.fecthAppFlume()
    this.getFlumeById()
  },
  methods: {
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
      this.collects.push(this.collect)
    },
    clearStage () {
      this.collect = {}
    },
    onSubmit () {
      this.flume.related_template = this.collects
      this.updateFlume(this.flume)
    },
    getFlumeById () {
      // axios.get('/api/v1/templates/' + this.flumeId)
      //   .then((res) => {
      //     console.log('###GET_FLUMEBY_ID_START###', res)
      //     this.flume = res.data
      //     this.collects = this.flume.related_template
      //     console.log('###GET_FLUMEBY_ID_END###', this.flume)
      //   })
      //   .catch(error => console.log(error))
      this.flume = {
        name: 'sdf',
        description: 'sadf',
        team_id: 'adsff',
        related_template: [
          {
            flume_log_dir: 'adsf',
            flume_description: 'ds',
            flume_platform: 'adf',
            flume_kafka: 'asd',
            flume_kafka_topic: 'adfs'
          },
          {
            flume_log_dir: 'adsf1',
            flume_description: 'ds',
            flume_platform: 'adf',
            flume_kafka: 'asd',
            flume_kafka_topic: 'adfs'
          },
          {
            flume_log_dir: 'adsf2',
            flume_description: 'ds',
            flume_platform: 'adf',
            flume_kafka: 'asd',
            flume_kafka_topic: 'adfs'
          },
          {
            flume_log_dir: 'adsf3',
            flume_description: 'ds',
            flume_platform: 'adf',
            flume_kafka: 'asd',
            flume_kafka_topic: 'adfs'
          }
        ]
      }
      this.collects = this.flume.related_template
    },
    updateFlume (params) {
      axios.post('/api/v1/templates/', { params })
        .then((res) => {
          console.log('###GET_FLUMES_RES###', res)
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
