<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title List-titleText" style="margin: 10px">
        <el-dropdown>
              <span class="el-dropdown-link">
               {{ configDes }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changeConfigType('flume')">Flume配置</el-dropdown-item>
            <el-dropdown-item @click.native="changeConfigType('logstash')">Logstash配置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col :span="24">
      <el-col :span="12">
        <el-input placeholder="请输入" v-model="filter.name" @keyup.enter.native="onSearchChange({search: filter.name})"
                  @clear="onSearchChange({search: filter.name})" :clearable="true">
          <el-button slot="append" @click="onSearchChange({search: filter.name})">
            <i class="fa fa-search"></i>
          </el-button>
        </el-input>
      </el-col>
      <div style="display: flex;justify-content: flex-end">
        <router-link :to="{ name: 'createTemplate', query: { configType: pagination.template_type }}">
          <el-button type="primary">新建</el-button>
        </router-link>
      </div>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="templates.results">
        <el-table-column prop="name" label="模板名称" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link @click="viewTemplates(scope.row, 'view')">
              {{scope.row.name}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="模板描述" min-width="100"></el-table-column>
        <el-table-column prop="team" label="团队" min-width="50"></el-table-column>
        <el-table-column prop="applist" label="链接应用" min-width="200"></el-table-column>
        <el-table-column prop="jirastatus" label="工单状态" min-width="60"></el-table-column>
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-tooltip content="设置采集信息" placement="top" v-if="pagination.template_type === 'flume'">
              <button class="List-actionButton" @click="addFlumeList(scope.row)">
                <i class="fa fa-wrench"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="设置数据处理信息" placement="top" v-if="pagination.template_type === 'logstash'">
              <button class="List-actionButton" @click="addLogstashList(scope.row)">
                <i class="fa fa-wrench"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <button class="List-actionButton" @click="viewTemplates(scope.row)">
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
import Vue from 'vue'

export default {
  name: 'templateList',
  props: [],
  components: {},
  computed: {
    ...mapState({
      templates: state => state.template.templates
    }),
    baseUrl: () => '/api/v1/templates/'
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10,
        template_type: 'flume'
      },
      configDes: null,
      filter: {
        name: ''
      }
    }
  },
  mounted: function () {
    this.changeConfigType(this.$route.query.configType)
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchTemplates'
    ]),
    queryTemplateList () {
      console.log('###QUERY_TEMPLATES###', this.baseUrl, this.pagination)
      this.fetchTemplates({ url: this.baseUrl, params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryTemplateList()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryTemplateList()
    },
    viewTemplates (row, type) {
      this.$router.push({ name: 'TemplateDetail',
        params: { templateId: row.id },
        query: { configType: this.pagination.template_type, operationType: type } })
    },
    addFlumeList (row) {
      this.$router.push({ name: 'Flumes', params: { templateId: row.id } })
    },
    addLogstashList (row) {
      this.$router.push({ name: 'LogstashList', params: { templateId: row.id } })
    },
    onSearchChange (param) {
      for (let m in param) {
        console.log('###ON_SEARCH_CHANGE###', m, param[m])
        if (param[m] === '') {
          Vue.delete(this.pagination, m)
          console.log('###ON_SEARCH_CHANGE_DELETE_KEY###', m)
        } else {
          this.pagination = {...this.pagination, ...param}
          this.pagination.page = 1
          console.log('###ON_SEARCH_CHANGE_ADD_KEY###', ...param)
        }
        this.pagination.page = 1
        this.fetchTemplates({ url: this.baseUrl, params: this.pagination })
      }
    },
    changeConfigType (value) {
      if (value === 'logstash') {
        this.pagination.template_type = 'logstash'
        this.configDes = 'Logstash配置'
      } else {
        this.pagination.template_type = 'flume'
        this.configDes = 'Flume配置'
      }
      this.queryTemplateList()
    }
  }
}
</script>
