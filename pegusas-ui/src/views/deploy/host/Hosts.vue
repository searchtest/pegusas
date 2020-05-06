<template>
  <el-row class="panel">
    <el-col :span="24">
      <div class="List-title" style="margin: 10px">
        <div class="List-titleText">主机运维</div>
      </div>
    </el-col>
    <el-col :span="24">
      <el-col :span="12">
        <el-input placeholder="请输入" v-model="filter.ip" @keyup.enter.native="onSearchChange({search: filter.ip})"
                  @clear="onSearchChange({search: filter.ip})" :clearable="true">
          <el-button slot="append" @click="onSearchChange({search: filter.ip})">
            <i class="fa fa-search"></i>
          </el-button>
        </el-input>
      </el-col>
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
import moment from 'moment'

export default {
  name: 'hosts',
  components: {},
  computed: {
    ...mapState({
      hosts: state => state.host.hosts
    })
  },
  data () {
    return {
      pagination: {
        page: 1,
        page_size: 10
      },
      type: 'Hosts',
      hostSelection: [],
      filter: {
        ip: ''
      },
      baseUrl: '/api/v1/hosts/'
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
      console.log('###QUERY_HOSTS###', this.baseUrl, this.pagination)
      this.fetchHosts({ url: this.baseUrl, params: this.pagination })
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
  }
}
</script>
