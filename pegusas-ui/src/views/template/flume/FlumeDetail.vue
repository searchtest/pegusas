<template>
  <div>
    <el-row class="panel">
      <el-form :model="flume" :rules="rules" ref="form" label-position="top">
        <el-row :gutter="10">
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
            <el-form-item label="配置描述" prop="description">
              <el-input v-model="flume.description" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="日志文件全路径" prop="flume_log_dir">
              <el-input v-model="flume.flume_log_dir" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="日志tmp文件全路径" prop="flume_logtmp_dir">
              <el-input v-model="flume.flume_logtmp_dir" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="offset记录文件名" prop="flume_position_file">
              <el-input v-model="flume.flume_position_file" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="缓存文件名" prop="flume_channel_file">
              <el-input v-model="flume.flume_channel_file" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="目的kafka" prop="flume_kafka">
              <el-input v-model="flume.flume_kafka" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="目的kafka topic" prop="flume_kafka_topic">
              <el-input v-model="flume.flume_kafka_topic" :disabled="!editable"></el-input>
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

export default {
  name: 'FlumeDetail',
  props: ['id', 'templateId'],
  computed: {
    ...mapState({
      flume: state => state.flume.flume
    })
  },
  data () {
    return {
      rules: {
        description: [{ required: true, message: '请输入配置描述', trigger: 'blur' }],
        flume_log_dir: [{ required: true, message: '请输入日志文件全路径:', trigger: 'blur' }],
        flume_logtmp_dir: [{ required: true, message: '请输入日志tmp文件全路径', trigger: 'blur' }],
        flume_position_file: [{ required: true, message: '请输入Offset记录文件名', trigger: 'blur' }],
        flume_channel_file: [{ required: true, message: '请输入缓存文件名', trigger: 'blur' }],
        flume_kafka: [{ required: true, message: '请输入目的kafka', trigger: 'blur' }],
        flume_kafka_topic: [{ required: true, message: '请输入目的kafka topic', trigger: 'blur' }]
      },
      editable: false
    }
  },
  created () {
  },
  mounted () {
    if (this.id) {
      this.fetchFlumeDetail(this.id)
    } else {
      this.resetFlume()
    }
    if (!this.$route.query.type) {
      this.editable = true
    }
  },
  methods: {
    ...mapActions([
      'fetchFlumeDetail',
      'updateFlume',
      'createFlume',
      'resetFlume'
    ]),
    cancel () {
      this.$router.push({ name: 'Flumes', params: { templateId: this.templateId } })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('###RELATED_TEMPLATE_FLUME###', this.flume)
          if (this.id) {
            this.updateTemplate(this.flume)
          } else {
            this.createTemplate(this.flume)
          }
        }
      })
    }
  }
}
</script>
