<template>
  <el-form :model="flume" :rules="rules" ref="form" label-position="top">
    <el-row class="panel">
      <el-col :span="24">
        <div class="List-title" style="margin: 10px">
          <i class="fa fa-lg" style="float:left;margin-top: 10px;margin-right: 10px">模板信息</i>
        </div>
      </el-col>
    </el-row>
    <el-row class="panel">
      <el-col :span="24">
        <div class="List-title" style="margin: 10px">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="模板名称">
          <el-input v-model="flume.name" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="模板描述">
          <el-input v-model="flume.description" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="应用组">
          <el-input v-model="flume.team_id" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="panel">
      <el-col :span="24">
        <div class="List-title" style="margin: 10px">
          <i class="fa fa-lg" style="float:left;margin-top: 10px;margin-right: 10px">采集信息</i>
        </div>
      </el-col>
    </el-row>
    <el-row class="panel">
      <el-col :span="24">
        <div class="List-title" style="margin: 10px">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日志全路径" >
          <el-input v-model="collect.related_log_dir" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="功能描述">
          <el-input v-model="collect.related_description" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="展示平台" >
          <el-input v-model="collect.related_platform" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="目的kafka" >
          <el-input v-model="collect.related_kafka" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="目的kafka topic">
          <el-input v-model="collect.related_kafka_topic" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" >
        <el-form-item label="采集信息暂存到当前页面" class="redItem">
          <el-button type="primary" @click="clearStage()" :disabled="!editable">清空</el-button>
          <el-button type="primary" @click="collectStage()" :disabled="!editable">暂存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24" class="list">
        <el-table :data="collects">
          <el-table-column prop="name" label="日志全路径" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="description" label="功能描述" min-width="100"></el-table-column>
          <el-table-column prop="team" label="展示平台" min-width="50"></el-table-column>
          <el-table-column prop="applist" label="目的kafka" min-width="200"></el-table-column>
          <el-table-column prop="jirastatus" label="目的kafka topic" min-width="100"></el-table-column>
          <el-table-column label="操作" min-width="200" align="right">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, collects)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24"  style="display: flex;justify-content: flex-end">
        <el-form-item>
          <router-link :to="{ name: 'Flumes' }">
            <el-button>取消</el-button>
          </router-link>
          <el-button type="primary" @click="onSubmit">保存</el-button>
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
        repo: null,
        app_type_id: null
      },
      rules: {},
      editable: false
    }
  },
  created () {
  },
  mounted () {
    this.fecthAppFlume()
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

    }
  }
}
</script>
<style>
  .redItem .el-form-item__label{
    color: indianred;
  }
</style>
