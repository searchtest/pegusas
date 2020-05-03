<template>
  <el-form :model="appBatch" :rules="rules" ref="form" label-position="top">
    <el-row class="panel">
      <el-col :span="24">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="List-title">
              <i class="fa fa-lg">批次详情</i>
            </div>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名称" prop="name">
              <el-input v-model="appBatch.name" :disabled="!editable"></el-input>
              <div style="color:#F00;">名称规范：团队-应用-批次1</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="description">
              <el-input v-model="appBatch.description" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机房" prop="idc">
              <el-select v-model="appBatch.idc" :disabled="!editable">
                <el-option v-if="appBatch.idc"
                           v-for="idc in appBatch.idc"
                           :key="idc.id"
                           :label="idc.name"
                           :value="idc.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display: flex;justify-content: flex-end">
            <el-form-item>
              <el-button type="primary" @click="showTemplate()" :disabled="!editable">关联采集模板</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="list">
            <el-form-item>
              <el-table ref="batchTemplateTable" :data="appBatch.templates" tooltip-effect="dark"
                        style="width: 100%" @selection-change="batchTemplateSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="ip" label="模板名称" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="team" label="模板类型" min-width="100"></el-table-column>
                <el-table-column label="操作" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, appBatch.templates)" type="text" size="small" :disabled="!editable">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 5px">
                <el-button @click.native.prevent="batchTemplatesDelete()" type="text" size="small" :disabled="!editable">
                  批量移除
                </el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display: flex;justify-content: flex-end">
            <el-form-item>
              <el-button type="primary" @click="showHost()" :disabled="!editable">添加主机</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="list">
            <el-form-item>
              <el-table ref="batchHostTable" :data="appBatch.hosts" tooltip-effect="dark"
                        style="width: 100%" @selection-change="batchHostSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="ip" label="主机IP" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="team" label="所属团队" min-width="100"></el-table-column>
                <el-table-column prop="app" label="所属应用" min-width="100"></el-table-column>
                <el-table-column prop="idc" label="所属机房" min-width="100"></el-table-column>
                <el-table-column prop="moban" label="已关联采集模板" min-width="100"></el-table-column>
                <el-table-column prop="fuwu" label="已部署服务" min-width="100"></el-table-column>
                <el-table-column prop="status" label="服务运行状态" min-width="100"></el-table-column>
                <el-table-column prop="banben" label="已发布版本" min-width="100"></el-table-column>
                <el-table-column label="操作" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, appBatch.hosts)" type="text" size="small" :disabled="!editable">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 5px">
                <el-button @click.native.prevent="batchDelete()" type="text" size="small" :disabled="!editable">
                  批量移除
                </el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display: flex;justify-content: center">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="!editable">保存</el-button>
              <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
          </el-col>

          <el-dialog title="添加主机" :visible.sync="dialogVisible" :close-on-click-modal="false" width="70%">
            <el-row class="panel">
              <el-col :span="24">
                <Search name="hosts" iterator="host"></Search>
              </el-col>
              <el-col :span="24" class="list">
                <el-table ref="hostTable" :data="hosts.results" tooltip-effect="dark"
                          style="width: 100%" @selection-change="hostSelectionChange">
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column prop="ip" label="主机IP" min-width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="team" label="所属团队" min-width="100"></el-table-column>
                  <el-table-column prop="app" label="所属应用" min-width="100"></el-table-column>
                  <el-table-column prop="idc" label="所属机房" min-width="100"></el-table-column>
                  <el-table-column prop="moban" label="已关联采集模板" min-width="100"></el-table-column>
                  <el-table-column prop="fuwu" label="已部署服务" min-width="100"></el-table-column>
                  <el-table-column prop="status" label="服务运行状态" min-width="100"></el-table-column>
                  <el-table-column prop="banben" label="已发布版本" min-width="100"></el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="confirmSelection()">确认</el-button>
                </div>
              </el-col>
              <!--工具条-->
              <el-col :span="24" style="display: flex; justify-content: flex-end">
                <el-pagination
                  @size-change="handleHostsSizeChange"
                  @current-change="handleHostsCurrentChange"
                  :current-page="hostsSearch.page"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="hostsSearch.page_size"
                  layout="sizes, prev, pager, next"
                  :total="hosts.count">
                </el-pagination>
              </el-col>
            </el-row>
          </el-dialog>

          <el-dialog title="添加采集模板" :visible.sync="templateVisible" :close-on-click-modal="false" width="70%">
            <el-row class="panel">
              <el-col :span="24">
                <Search name="templates" iterator="template"></Search>
              </el-col>
              <el-col :span="24" class="list">
                <el-table ref="templateTable" :data="templates.results" tooltip-effect="dark"
                          style="width: 100%" @selection-change="templateSelectionChange">
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column prop="ip" label="模板名称" min-width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="team" label="模板类型" min-width="100"></el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="templateConfirmSelection()">确认</el-button>
                </div>
              </el-col>
              <!--工具条-->
              <el-col :span="24" style="display: flex; justify-content: flex-end">
                <el-pagination
                  @size-change="handleTemplatesSizeChange"
                  @current-change="handleTemplatesCurrentChange"
                  :current-page="templatesSearch.page"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="templatesSearch.page_size"
                  layout="sizes, prev, pager, next"
                  :total="templates.count">
                </el-pagination>
              </el-col>
            </el-row>
          </el-dialog>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../../http-common'
import Search from '../../../components/search/index.vue'

export default {
  name: 'appBatchDetail',
  props: ['batchId', 'type', 'team'],
  components: {
    Search
  },
  computed: {
    ...mapState({
      appBatch: state => state.appBatch.appBatchDetail,
      templates: state => state.appBatch.templates,
      hosts: state => state.appBatch.hosts,
      queryset: state => state.queryset.querysets.host,
      querysetTemplates: state => state.queryset.querysets.template
    }),
    baseUrl: () => '/api/v1/hosts/',
    url: () => '/api/v1/templates/'
  },
  data () {
    return {
      dialogVisible: false, // 新增界面是否显示
      templateVisible: false, // 新增界面是否显示
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        idc: [{ required: true, message: '请输入机房', trigger: 'blur' }]
      },
      editable: false,
      hostSelection: [],
      batchHostSelection: [],
      templateSelection: [],
      batchTemplateSelection: [],
      hostsSearch: {
        page: 1,
        page_size: 10
      },
      templatesSearch: {
        page: 1,
        page_size: 10
      }
    }
  },
  mounted () {
    this.fecthAppBatch()
    if (this.type === 'create') {
      this.resetAppBatchDetail()
    } else {
      this.fetchAppBatchDetail(this.batchId)
    }
  },
  methods: {
    ...mapActions([
      'fetchAppBatchDetail',
      'createAppBatch',
      'updateAppBatch',
      'resetAppBatchDetail',
      'fetchHosts',
      'fetchTemplates'
    ]),
    fecthAppBatch () {
      if (this.type === 'view') {
        this.editable = false
      } else {
        this.editable = true
      }
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.appBatch.hosts.length === 0) {
            this.$confirm('主机信息不能为空', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              // 点击确定的操作(调用接口)
            }).catch(() => {
              // 几点取消的提示
            })
          } else {
            console.log('###RELATED_APPBATCH_CREATE###', this.appBatch)
            if (this.type === 'create') {
              this.createAppBatch(this.appBatch)
            } else {
              this.appBatch.id = this.appBatchId
              this.updateAppBatch(this.appBatch)
            }
          }
        }
      })
    },
    showHost () {
      this.dialogVisible = true
      this.queryHosts()
    },
    showTemplate () {
      this.templateVisible = true
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    cancel () {
      this.$router.push({name: 'AppBatch', params: {batchId: this.batchId, team: this.team}})
    },
    confirmSelection () {
      this.appBatch.hosts = this.appBatch.hosts.concat(this.hostSelection)
      const res = new Map()
      this.appBatch.hosts = this.appBatch.hosts.filter((a) => !res.has(a.ip) && res.set(a.ip, 1))
      this.$refs.hostTable.clearSelection()
      this.dialogVisible = false
    },
    hostSelectionChange (val) {
      this.hostSelection = val
    },
    batchHostSelectionChange (val) {
      this.batchHostSelection = val
    },
    batchDelete () {
      this.batchHostSelection.forEach(item => {
        this.appBatch.hosts.splice(this.appBatch.hosts.indexOf(this.batchHostSelection), 1)
      })
    },
    queryHosts () {
      console.log('###QUERY_HOSTS###', this.baseUrl, this.queryset, this.hostsSearch)
      this.fetchHosts({ url: this.baseUrl + (this.queryset || ''), params: this.hostsSearch })
      this.queryTemplates()
    },
    handleHostsSizeChange (val) {
      this.hostsSearch = { ...this.hostsSearch, page: 1, page_size: val }
      this.queryHosts()
    },
    handleHostsCurrentChange (val) {
      this.hostsSearch = { ...this.hostsSearch, page: val }
      this.queryHosts()
    },
    templateConfirmSelection () {
      this.appBatch.templates = this.appBatch.templates.concat(this.templateSelection)
      const res = new Map()
      this.appBatch.templates = this.appBatch.templates.filter((a) => !res.has(a.ip) && res.set(a.ip, 1))
      this.$refs.templateTable.clearSelection()
      this.templateVisible = false
    },
    templateSelectionChange (val) {
      this.templateSelection = val
    },
    batchTemplateSelectionChange (val) {
      this.batchTemplateSelection = val
    },
    batchTemplatesDelete () {
      this.batchTemplateSelection.forEach(item => {
        this.appBatch.templates.splice(this.appBatch.templates.indexOf(this.batchTemplateSelection), 1)
      })
    },
    queryTemplates () {
      console.log('###QUERY_TEMPLATEs###', this.url, this.querysetTemplates, this.templatesSearch)
      this.fetchTemplates({ url: this.url + (this.querysetTemplates || ''), params: this.templatesSearch })
    },
    handleTemplatesSizeChange (val) {
      this.templatesSearch = { ...this.templatesSearch, page: 1, page_size: val }
      this.queryTemplates()
    },
    handleTemplatesCurrentChange (val) {
      this.templatesSearch = { ...this.templatesSearch, page: val }
      this.queryTemplates()
    }
  },
  watch: {
    queryset (newObject, oldObject) {
      console.log('###watch queryset###', newObject, oldObject)
      this.hostsSearch = { ...this.hostsSearch, page: 1 }
      this.queryHosts()
    },
    querysetTemplates (newObject, oldObject) {
      console.log('###watch querysetTemplates###', newObject, oldObject)
      this.templatesSearch = { ...this.templatesSearch, page: 1 }
      this.queryTemplates()
    }
  }
}
</script>
