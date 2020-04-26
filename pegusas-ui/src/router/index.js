import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'

import Template from '../views/template/index.vue'
import TemplateList from '../views/template/TemplateList.vue'
import FlumeDetail from '../views/template/flume/FlumeDetail.vue'
import LogstashDetail from '../views/template/logstash/LogstashDetail.vue'
import App from '../views/deploy/app/index.vue'
import Apps from '../views/deploy/app/Apps.vue'
import Hosts from '../views/deploy/host/Hosts.vue'
import Jobs from '../views/deploy/job/JobList.vue'
import AppBatchs from '../views/deploy/appBatch/AppBatchs.vue'
import AppBatch from '../views/deploy/appBatch/AppBatchDetail.vue'
import System from '../views/system/index.vue'
import Systems from '../views/system/SystemList.vue'

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
        path: 'templates',
        component: Template,
        meta: {
          breadcrumb: {
            name: 'Templates',
            label: '采集管理'
          }
        },
        children: [
          {
            path: ':config',
            name: 'Templates',
            props: true,
            component: TemplateList
          },
          {
            path: ':flumeId/flume/:type',
            component: FlumeDetail,
            props: true,
            meta: {
              breadcrumb: {
                name: 'createFlume',
                label: 'Flume配置'
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
            path: ':logstashId/logstash/:type',
            component: LogstashDetail,
            props: true,
            meta: {
              breadcrumb: {
                name: 'createLogstash',
                label: 'Logstash配置'
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
          }
        ]
      },
      {
        path: 'app',
        component: App,
        meta: {
          breadcrumb: {
            name: 'App',
            label: '部署管理'
          }
        },
        children: [
          {
            path: 'apps',
            name: 'Apps',
            props: true,
            component: Apps
          },
          {
            path: 'hosts',
            name: 'Hosts',
            props: true,
            component: Hosts
          },
          {
            path: 'jobs',
            name: 'Jobs',
            props: true,
            component: Jobs
          },
          {
            path: ':batchId/:team',
            component: AppBatchs,
            props: true,
            name: 'AppBatch'
          },
          {
            path: ':batchId/:team/:type/appBatch',
            component: AppBatch,
            props: true,
            meta: {
              breadcrumb: {
                name: 'createAppBatch',
                label: '创建批次'
              }
            },
            children: [
              {
                path: '',
                name: 'createAppBatch',
                props: true,
                component: AppBatch
              }
            ]
          }
        ]
      },
      {
        path: 'system',
        component: System,
        meta: {
          breadcrumb: {
            name: 'System',
            label: '参数配置'
          }
        },
        children: [
          {
            path: '',
            name: 'Systems',
            props: true,
            component: Systems
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
