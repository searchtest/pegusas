<template>
  <div>
    <el-row class="panel">
      <el-form :model="template" :rules="rules" ref="form" label-position="top">
        <el-row :gutter="10">
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
          <el-col :span="6">
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="template.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模板描述" prop="description">
              <el-input v-model="template.description" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应用组" prop="team">
              <el-input v-model="template.team" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="JIRA工单号" prop="jira_key">
              <el-input v-model="template.jira_key" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display: flex;justify-content: flex-end">
            <el-form-item>
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
  name: 'TemplateDetail',
  props: ['templateId'],
  computed: {
    ...mapState({
      template: state => state.template.template
    })
  },
  data () {
    return {
      configType: null,
      editable: false,
      rules: {
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        team: [{ required: true, message: '请输入应用组', trigger: 'blur' }],
        description: [{ required: true, message: '请输入模板描述', trigger: 'blur' }],
        jira_key: [{ required: true, message: '请输入JIRA工单号', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    if (this.templateId) {
      this.fetchTemplateDetail(this.templateId)
    } else {
      this.resetTemplate()
    }
    if (!this.$route.query.operationType) {
      this.editable = true
    }
  },
  methods: {
    ...mapActions([
      'createTemplate',
      'updateTemplate',
      'resetTemplate',
      'fetchTemplateDetail'
    ]),
    cancel () {
      this.$router.push({ name: 'Templates', query: { configType: this.$route.query.configType } })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.template.template_type = this.$route.query.configType
          if (this.templateId) {
            this.updateTemplate(this.template)
          } else {
            this.createTemplate(this.template)
          }
        }
      })
    }
  }
}
</script>
