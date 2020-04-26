<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title List-titleText" style="margin: 10px">
        <el-dropdown>
                  <span class="el-dropdown-link">
                   主机运维<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changeConfig('Apps')">应用列表</el-dropdown-item>
            <el-dropdown-item @click.native="changeConfig('Hosts')">主机运维</el-dropdown-item>
            <el-dropdown-item @click.native="changeConfig('Jobs')">任务查看</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
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
        <el-table-column prop="fuwu" label="服务运行状态" min-width="100"></el-table-column>
        <el-table-column prop="banben" label="已发布版本" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="operate('start', scope.$index, hosts.results)" type="text" size="small">
              启动
            </el-button>
            <el-button @click.native.prevent="operate('stop', scope.$index, hosts.results)" type="text" size="small">
              停止
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 5px">批量操作：
        <el-button @click.native.prevent="batchOperate('start')" type="text" size="small">
          启动
        </el-button>
        <el-button @click.native.prevent="batchOperate('stop')" type="text" size="small">
          停止
        </el-button>
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
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../../http-common'
import moment from 'moment'
import Search from '../../../components/search/index.vue'

export default {
  name: 'hosts',
  components: {
    Search
  },
  computed: {
    ...mapState({
      hosts: state => state.host.hosts,
      queryset: state => state.queryset.querysets.host
    }),
    baseUrl: () => '/api/v1/hosts/'
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10
      },
      type: 'Hosts',
      hostSelection: []
    }
  },
  mounted: function () {
    this.queryHosts()
  },
  methods: {
    moment: moment,
    ...mapActions([
      'fetchHosts',
      'operateHost'
    ]),
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
    },
    hostSelectionChange (val) {
      this.hostSelection = val
    },
    operate (type, index, rows) {
      let params = {
        type: type,
        ips: rows[index].ip
      }
      this.operateHost(params)
    },
    batchOperate (type) {
      let ips = []
      this.hostSelection.forEach(item => {
        ips.push(item.ip)
      })
      let params = {
        type: type,
        ips: ips
      }
      this.operateHost(params)
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
      this.queryHosts()
    }
  }
}
</script>
