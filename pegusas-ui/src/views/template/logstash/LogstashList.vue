<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">数据处理信息</div>
      </div>
    </el-col>
    <el-col :span="24">
      <el-col :span="12">
        <el-input placeholder="请输入" v-model="filter.description" @keyup.enter.native="onSearchChange({search: filter.description})"
                  @clear="onSearchChange({search: filter.description})" :clearable="true">
          <el-button slot="append" @click="onSearchChange({search: filter.description})">
            <i class="fa fa-search"></i>
          </el-button>
        </el-input>
      </el-col>
      <div style="display: flex;justify-content: flex-end">
        <router-link :to="{ name: 'createLogstash', params: { templateId: this.templateId }}">
          <el-button type="primary">新建</el-button>
        </router-link>
      </div>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="logstashList.results">
        <el-table-column prop="description" label="配置描述" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link @click="viewLogstash(scope.row, 'view')">
              {{scope.row.description}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="logstash_kafka" label="源kafka" min-width="100"></el-table-column>
        <el-table-column prop="logstash_kafka_topic" label="源kafka topic" min-width="100"></el-table-column>
        <el-table-column prop="logstash_es_index" label="ES索引名称" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <button class="List-actionButton" @click="viewLogstash(scope.row)">
                <i class="fa fa-pencil"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="查看" placement="top">
              <button class="List-actionButton" @click="viewLogstash(scope.row, 'view')">
                <i class="fa fa-search-plus"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <button class="List-actionButton" @click="deleteLogstash(scope.row)">
                <i class="fa fa-trash-o"></i>
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
        :total="logstashList.count">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import axios from '../../../http-common'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import Vue from 'vue'

export default {
  name: 'logstashList',
  props: ['templateId'],
  components: {},
  computed: {
    ...mapState({
      logstashList: state => state.logstash.logstashList
    })
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10,
        templateId: this.templateId
      },
      filter: {
        description: ''
      },
      baseUrl: '/api/v1/templates/logstash'
    }
  },
  mounted: function () {
    this.queryLogstashList()
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchLogstashList'
    ]),
    queryLogstashList () {
      console.log('###QUERY_TEMPLATES###', this.baseUrl, this.pagination)
      this.fetchLogstashList({ url: this.baseUrl, params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.queryLogstashList()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.queryLogstashList()
    },
    viewLogstash (row, type) {
      this.$router.push({ name: 'LogstashDetail',
        params: { templateId: this.templateId, id: row.id },
        query: { type: type } })
    },
    deleteLogstash (row) {
      this.$confirm('确认要删除', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        axios.post('/api/v1/logstash/delete/', { id: row.id })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.onSearchChange({search: this.filter.description})
          }).catch((error) => {
            console.log(error)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
        this.fetchLogstashList({ url: this.baseUrl, params: this.pagination })
      }
    }
  }
}
</script>
