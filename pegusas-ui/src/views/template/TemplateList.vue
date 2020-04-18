<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">
          <el-dropdown>
                <span class="el-dropdown-link">
                 {{ configDes }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changeConfig('Flume配置')">Flume配置</el-dropdown-item>
              <el-dropdown-item @click.native="changeConfig('Logstash配置')">Logstash配置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <Search name="templates" iterator="template">
        <div style="display: flex;justify-content: flex-end">
            <el-button type="primary" @click="createTemplates()">新建</el-button>
        </div>
      </Search>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="templates.results">
        <el-table-column prop="name" label="模板名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="description" label="模板描述" min-width="100"></el-table-column>
        <el-table-column prop="team" label="团队" min-width="50"></el-table-column>
        <el-table-column prop="applist" label="链接应用" min-width="200"></el-table-column>
        <el-table-column prop="jirastatus" label="工单状态" min-width="60"></el-table-column>
        <el-table-column label="操作" min-width="200" align="right">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <button class="List-actionButton" @click="viewTemplates(scope.row, 'update')">
                <i class="fa fa-pencil"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="查看" placement="top">
              <button class="List-actionButton" @click="viewTemplates(scope.row, 'view')">
                <i class="fa fa-search-plus"></i>
              </button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
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
        :total="templates.count">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import Search from '../../components/search/index.vue'

export default {
  name: 'templateList',
  components: {
    Search
  },
  computed: {
    ...mapState({
      templates: state => state.template.templates,
      queryset: state => state.queryset.querysets.template
    }),
    baseUrl: () => '/api/v1/tempaltes/'
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10,
        template_type: 'flume'
      },
      configDes: 'Flume配置'
    }
  },
  mounted: function () {
    console.log('###MOUNTED###', this.template, this.pagination)
    this.queryTemplateList()
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchTemplates'
    ]),
    queryTemplateList () {
      console.log('###QUERY_TEMPLATES###', this.baseUrl, this.queryset, this.pagination)
      this.fetchTemplates({ url: this.baseUrl + (this.queryset || ''), params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryTemplateList()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryTemplateList()
    },
    createTemplates () {
      if (this.pagination.template_type === 'flume') {
        this.$router.push({ name: 'createFlume', params: { flumeId: -1, type: 'create' } })
      } else {
        this.$router.push({ name: 'createLogstash', params: { logstashId: -1, type: 'create' } })
      }
    },
    viewTemplates (row, type) {
      if (this.pagination.template_type === 'flume') {
        this.$router.push({ name: 'createFlume', params: { flumeId: row.id, type: type } })
      } else {
        this.$router.push({ name: 'createLogstash', params: { logstashId: row.id, type: type } })
      }
    },
    changeConfig (value) {
      this.configDes = value
      if (value === 'Flume配置') {
        this.pagination.template_type = 'flume'
      } else {
        this.pagination.template_type = 'logstash'
      }
      this.queryTemplateList()
    }
  },
  watch: {
    $route () {
      this.queryTemplateList()
    },
    queryset (newObject, oldObject) {
      console.log('###watch queryset###', newObject, oldObject)
      this.pagination = { ...this.pagination, page: 1 }
      this.queryTemplateList()
    }
  }
}
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
