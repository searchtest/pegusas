<template>
  <el-container style="height: 100%">
    <el-header class="topNav">
      <router-link :to="{ path: '/' }">
        <img :src="logoHeader" height="60" title="日志平台" class="topNav-header-logo">
      </router-link>
      <div class="topNav-rightAligner"></div>
      <div class="topNav-item">
          <i class="fa fa-user" style="margin-right: 10px"></i>
          <span>adsf</span>
      </div>
      <div class="topNav-item">
        <a href="http://wiki.nucc.com/pages/viewpage.action?pageId=8454252" target="_blank">
          <i class="fa fa-book" style="margin-right: 5px"></i>
          <span>帮助</span>
        </a>
      </div>
      <div class="topNav-item">
        <a @click="logout">
          <i class="fa fa-power-off" style="margin-right: 5px"></i>
        </a>
      </div>
    </el-header>
    <el-container style="height: 100%">
      <el-aside class="sideNav" style="width: 160px">
        <!--导航菜单-->
        <el-menu :default-active="$route.path"  class="el-menu-vertical sideNav-menu" unique-opened router>
          <el-menu-item v-for="(item, index) in menuItems" v-if="item.path" :index="item.path" :key="index">
            <i :class="item.iconCls" style="width: 20px;height: 20px"></i>
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-row class="breadcrumb">
          <el-col :span="24">
            <el-breadcrumb class="breadcrumb-list">
              <template v-for="(item, index) in breadcrumbItems">
                <el-breadcrumb-item class="breadcrumb-item" :key="index">
                  <router-link :to="{ name: item.name }">{{ item.label }}</router-link>
                </el-breadcrumb-item>
              </template>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from '../http-common'
import logoHeader from '../assets/log-header.png'

export default {
  name: 'Home',
  computed: {
  },
  data () {
    return {
      logoHeader: logoHeader,
      menuItems: [
        {
          name: '仪表盘',
          path: '/',
          iconCls: 'fa  fa-tachometer'
        },
        {
          name: '采集管理',
          path: '/flumes',
          iconCls: 'fa  fa-folder-open'
        }
      ]
    }
  },
  methods: {
    logout () {
      axios.get('/api/logout/').then((res) => {
        this.$router.push('/login')
      }).catch((error) => {
        console.log(error)
      })
    },
    getBreadcrumbs () {
      this.breadcrumbItems = []
      this.$route.matched.forEach((item, index) => {
        if (item.meta.breadcrumb) {
          this.breadcrumbItems.push(item.meta.breadcrumb)
        }
      })
    }
  },
  created () {
    this.getBreadcrumbs()
  },
  watch: {
    $route () {
      this.getBreadcrumbs()
    }
  }
}

</script>

<style scoped lang="less">
@import '../styles/index.less';

.el-header {
  padding: 0 0px;
}

.topNav {
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #b7b7b7;
  .topNav-header-logo {
    left: 12px;
    position: absolute;
    top: 5px;
    z-index: 1;
  }

  .topNav-rightAligner {
    margin-left: auto;
  }

  .topNav-item {
    padding: 0 20px;
    height: 100%;
    cursor: pointer;
    i {
      color: #848992;
      font-size: 21px;
    }

    a {
      color: #707070;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    button {
      border: 0;
      margin: auto;
    }
  }
  .topNav-item:hover {
    background-color: @default-list-header-bg;
  }
}

.sideNav {
  width: 120px;
  .el-menu {
    height: 100%;
        background-color: @menu-link-icon;
        .el-menu-item {
            background-color: @menu-link-icon;
          color: @menu-bg;
          i {
            color: @menu-bg;
            font-size: 20px;
          }
        }
    .el-menu-item.is-active{
            background-color: @menu-link-btm-hov;
        }
    .el-menu-item:hover {
      background-color: @menu-link-btm-hov;
    }
  }
}

.breadcrumb {
    padding: 0;
    display: flex;
    background-color: @bc-bg;
    width: 100%;
    z-index: 1039;
    height: 40px;
    border-bottom: 1px solid @bc-border;
}

.breadcrumb-list {
  padding: 0px 20px;
  list-style: none;
  background-color: @default-bg;
  border-radius: 4px;
  line-height: 39px;
}
</style>
