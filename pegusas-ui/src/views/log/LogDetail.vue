<template>
  <el-form :model="logDetail" :rules="rules" ref="form" label-position="top">
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
              <el-input v-model.trim="logDetail.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属应用名称" prop="appName">
              <el-input v-model.trim="logDetail.appName" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日志容量（GB/天）" prop="days">
              <el-input v-model.trim="logDetail.days" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日志保留周（天）" prop="week">
              <el-input v-model.trim="logDetail.week" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="description">
              <el-input v-model.trim="logDetail.description" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24" style="display: flex;justify-content: center">
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

export default {
  name: 'LogDetail',
  props: ['id'],
  computed: {
    ...mapState({
      logDetail: state => state.log.logDetail
    })
  },
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入日志名称', trigger: 'blur' }],
        appName: [{ required: true, message: '请输入所属应用名称', trigger: 'blur' }],
        days: [{ required: true, message: '请输入日志容量（GB/天）', trigger: 'blur' }],
        week: [{ required: true, message: '请输入日志保留周（天）', trigger: 'blur' }]
      },
      editable: false
    }
  },
  mounted () {
    if (this.id) {
      this.fetchLogDetail(this.id)
    } else {
      this.resetLog()
    }
    if (!this.$route.query.type) {
      this.editable = true
    }
  },
  methods: {
    ...mapActions([
      'fetchLogDetail',
      'updateLog',
      'createLog',
      'resetLog'
    ]),
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    cancel () {
      this.$router.push({ name: 'Logs' })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        console.log('###RELATED_LOG###', this.logDetail)
        if (this.id) {
          this.updateLog(this.logDetail)
        } else {
          this.createLog(this.logDetail)
        }
      })
    }
  }
}
</script>
