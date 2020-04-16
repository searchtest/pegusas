import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Dashboard from '../views/dashboard/index.vue'

import Flume from '../views/flume/index.vue'
import FlumeList from '../views/flume/FlumeList.vue'
import FlumeDetail from '../views/flume/FlumeDetail.vue'
import FlumeDetailInfo from '../views/flume/FlumeDetailInfo.vue'
import Logstash from '../views/logstash/index.vue'
import LogstashList from '../views/logstash/LogstashList.vue'
import LogstashDetail from '../views/logstash/LogstashDetail.vue'
import LogstashDetailInfo from '../views/logstash/LogstashDetailInfo.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    iconCls: 'el-icon-tickets',
    leaf: true, // 只有一个节点
    children: [
      {
        path: '',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
          breadcrumb: {
            name: 'Dashboard',
            label: '仪表盘'
          }
        }
      },
      {
        path: 'flumes',
        component: Flume,
        meta: {
          breadcrumb: {
            name: 'Flumes',
            label: '采集管理'
          }
        },
        children: [
          {
            path: '',
            name: 'Flumes',
            component: FlumeList
          },
          {
            path: 'add',
            component: FlumeDetail,
            meta: {
              breadcrumb: {
                name: 'createFlume',
                label: '新建'
              }
            },
            children: [
              {
                path: '',
                name: 'createFlume',
                props: true,
                component: FlumeDetail
              }
            ]
          },
          {
            path: ':flumeId/:type',
            component: FlumeDetailInfo,
            props: true,
            meta: {
              breadcrumb: {
                name: 'FlumeDetailInfo',
                label: '详情'
              }
            },
            children: [
              {
                path: '',
                name: 'FlumeDetailInfo',
                props: true,
                component: FlumeDetailInfo
              }
            ]
          }
        ]
      },
      {
        path: 'logstashes',
        component: Logstash,
        meta: {
          breadcrumb: {
            name: 'Logstashes',
            label: '采集管理'
          }
        },
        children: [
          {
            path: '',
            name: 'Logstashes',
            component: LogstashList
          },
          {
            path: 'add',
            component: LogstashDetail,
            meta: {
              breadcrumb: {
                name: 'createLogstash',
                label: '新建'
              }
            },
            children: [
              {
                path: '',
                name: 'createLogstash',
                props: true,
                component: LogstashDetail
              }
            ]
          },
          {
            path: ':logstashId/:type',
            component: LogstashDetailInfo,
            props: true,
            meta: {
              breadcrumb: {
                name: 'LogstashDetailInfo',
                label: '详情'
              }
            },
            children: [
              {
                path: '',
                name: 'LogstashDetailInfo',
                props: true,
                component: LogstashDetailInfo
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: {path: '/404'}
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
