<template>
  <el-form :model="appBatch" :rules="rules" ref="form" label-position="top">
    <el-row class="panel">
      <el-col :span="24">
        <div class="List-title">
          <i class="fa fa-lg">批次详情</i>
        </div>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="appBatch.name" :disabled="!editable"></el-input>
          <div style="color:#F00;">名称规范：团队-应用-批次1</div>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="备注" prop="description">
          <el-input v-model="appBatch.description" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="机房" prop="idc">
          <el-input v-model="appBatch.idc" :disabled="!editable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-left: 10px; padding-right: 10px;">
        <el-form-item label="关联采集模板" prop="flumeName">
          <el-input v-model="appBatch.flumeName" :disabled="!editable"></el-input>
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
              <el-table-column prop="banben" label="已发布版本" min-width="100"></el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="confirmSelection()">确认</el-button>
            </div>
          </el-col>
          <!--工具条-->
          <el-col :span="24" style="display: flex; justify-content: flex-end">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pagination.page_size"
              layout="sizes, prev, pager, next"
              :total="hosts.count">
            </el-pagination>
          </el-col>
        </el-row>
      </el-dialog>

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
      hosts: state => state.appBatch.hosts,
      queryset: state => state.queryset.querysets.appBatch,
      appBatch: state => state.appBatch.appBatchDetail
    }),
    baseUrl: () => '/api/v1/hosts/'
  },
  data () {
    return {
      dialogVisible: false, // 新增界面是否显示
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        idc: [{ required: true, message: '请输入机房', trigger: 'blur' }],
        flumeName: [{ required: true, message: '请输入关联采集模板', trigger: 'blur' }]
      },
      editable: false,
      hostSelection: [],
      batchHostSelection: [],
      pagination: {
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
    this.queryHosts()
  },
  methods: {
    ...mapActions([
      'fetchAppBatchDetail',
      'createAppBatch',
      'updateAppBatch',
      'resetAppBatchDetail',
      'fetchHosts'
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
      console.log('###QUERY_HOSTS###', this.baseUrl, this.queryset, this.pagination)
      this.fetchHosts({ url: this.baseUrl + (this.queryset || ''), params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryHosts()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryHosts()
    }
  },
  watch: {
    queryset (newObject, oldObject) {
      console.log('###watch queryset###', newObject, oldObject)
      this.pagination = { ...this.pagination, page: 1 }
      this.queryHosts()
    }
  }
}
</script>
