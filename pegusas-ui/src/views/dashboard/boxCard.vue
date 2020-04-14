<template>
    <el-row style="margin: 10px;padding: 10px">
        <el-col :span="4">
            <router-link :to="{ name: 'HostList' }">
                <el-card class="card-all">
                    <h1 class="all-number">{{ dashboard.hosTotal }}</h1>
                    <div class="card-font">HOSTS</div>
                </el-card>
            </router-link>
        </el-col>
        <el-col :span="4">
            <router-link :to="{ name: 'HostList', query:{has_active_failures:true}}">
                <el-card class="card-fail">
                    <h1 class="fault-number">{{ dashboard.hosFail }}</h1>
                    <div class="card-font">FAILED HOSTS</div>
                </el-card>
            </router-link>
        </el-col>
        <el-col :span="4">
            <router-link :to="{ name: 'InventoryList' }">
                <el-card class="card-all">
                    <h1 class="all-number">{{ dashboard.invTotal }}</h1>
                    <div class="card-font">INVENTORY</div>
                </el-card>
            </router-link>
        </el-col>
        <el-col :span="4">
            <router-link :to="{ name: 'InventoryList', query:{inventory_sources_with_failures__gt:0} }">
                <el-card class="card-fail">
                    <h1 class="fault-number">{{ dashboard.invFail }}</h1>
                    <div class="card-font">INVENTORY SYNC FAILURES</div>
                </el-card>
            </router-link>
        </el-col>
        <el-col :span="4">
            <router-link :to="{ name: 'Projects' }">
                <el-card class="card-all">
                    <h1 class="all-number">{{ dashboard.proTotal }}</h1>
                    <div class="card-font">PROJECT</div>
                </el-card>
            </router-link>
        </el-col>
        <el-col :span="4">
            <router-link :to="{ name: 'Projects', query:{status__in:'failed,canceled'}}">
                <el-card class="card-fail">
                    <h1 class="fault-number">{{ dashboard.proFail }}</h1>
                    <div class="card-font">PROJECT SYNC FAILURES</div>
                </el-card>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'box-card',
  computed: {
    ...mapState({
      dashboard: state => state.common.dashboard
    })
  },
  data () {
    return {
      listLoading: false
    }
  },
  mounted () {
    this.fetchDashboard()
  },
  methods: {
    ...mapActions([
      'fetchDashboard'
    ])
  }
}
</script>

<style scoped>
.card-all{
    width: 95%;
    display: inline-block;
    height: 90px;
    color: #337AB7;
    border: 1px solid #c0c4cc;
}
.card-all:hover{
    background-color: #337AB7;
    color: #DDDDDD;
}
.card-fail{
    width: 95%;
    display: inline-block;
    height: 90px;
    color: rgb(217, 83, 79);
    border: 1px solid #c0c4cc;
}
.card-fail:hover{
    background-color: rgb(217, 83, 79);
    color: #DDDDDD;
}
.all-number{
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: center;
    font-size: 30px;
}
.fault-number{
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: center;
    font-size: 30px;
}

div{
    text-align: center;
    color: #5e7382;
}
</style>
