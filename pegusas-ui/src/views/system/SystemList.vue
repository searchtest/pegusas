<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">参数配置</div>
      </div>
    </el-col>
    <el-col :span="24">
      <Search name="systems" iterator="system">
        <div style="display: flex;justify-content: flex-end">
          <el-button type="primary" @click="createSystem()">新建</el-button>
        </div>
      </Search>
    </el-col>
    <el-col :span="24" class="list">
      <el-table :data="systems.results">
        <el-table-column prop="name" label="参数名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="description" label="参数描述" min-width="100"></el-table-column>
        <el-table-column prop="updateBy" label="修改人" min-width="100"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="100" align="right">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <button class="List-actionButton" @click="viewSysParams(scope.row, 'update')">
                <i class="fa fa-pencil"></i>
              </button>
            </el-tooltip>
            <el-tooltip content="查看" placement="top">
              <button class="List-actionButton" @click="viewSysParams(scope.row, 'view')">
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
        :total="systems.count">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../http-common'
import moment from 'moment'
import Search from '../../components/search/index.vue'

export default {
  name: 'systems',
  components: {
    Search
  },
  computed: {
    ...mapState({
      systems: state => state.system.systems,
      queryset: state => state.queryset.querysets.system
    }),
    baseUrl: () => '/api/v1/system/'
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10
      }
    }
  },
  mounted: function () {
    this.querySystems()
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchSystems'
    ]),
    querySystems () {
      console.log('###QUERY_SYSTEMS###', this.baseUrl, this.queryset, this.pagination)
      this.fetchSystems({ url: this.baseUrl + (this.queryset || ''), params: this.pagination })
    },
    handleSizeChange (val) {
      this.pagination = { ...this.pagination, page: 1, page_size: val }
      this.querySystems()
    },
    handleCurrentChange (val) {
      this.pagination = { ...this.pagination, page: val }
      this.querySystems()
    },
    changeConfig (type) {
      if (type !== this.type) {
        this.$router.push({ name: type })
      }
    }
  },
  watch: {
    queryset (newObject, oldObject) {
      console.log('###watch queryset###', newObject, oldObject)
      this.pagination = { ...this.pagination, page: 1 }
      this.querySystems()
    }
  }
}
</script>
