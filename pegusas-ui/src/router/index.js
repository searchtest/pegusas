import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'

import Template from '../views/template/index.vue'
import TemplateList from '../views/template/TemplateList.vue'
import FlumeList from '../views/template/flume/FlumeList.vue'
import FlumeDetail from '../views/template/flume/FlumeDetail.vue'
import LogstashList from '../views/template/logstash/LogstashList.vue'
import TemplateDetail from '../views/template/TemplateDetail.vue'
import LogstashDetail from '../views/template/logstash/LogstashDetail.vue'
import App from '../views/deploy/app/index.vue'
import Apps from '../views/deploy/app/Apps.vue'
import Jobs from '../views/deploy/job/JobList.vue'
import AppBatches from '../views/deploy/appBatch/AppBatches.vue'
import AppBatchDetail from '../views/deploy/appBatch/AppBatchDetail.vue'
import System from '../views/system/index.vue'
import Systems from '../views/system/SystemList.vue'
import Log from '../views/log/index.vue'
import LogList from '../views/log/LogList.vue'
import LogDetail from '../views/log/LogDetail.vue'

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
            path: '',
            name: 'Templates',
            props: true,
            component: TemplateList
          },
          {
            path: 'add',
            component: TemplateDetail,
            meta: {
              breadcrumb: {
                name: 'createTemplate',
                label: '创建模板'
              }
            },
            children: [
              {
                path: '',
                name: 'createTemplate',
                component: TemplateDetail
              }
            ]
          },
          {
            path: ':templateId',
            props: true,
            component: TemplateDetail,
            meta: {
              breadcrumb: {
                name: 'TemplateDetail',
                label: '创建模板'
              }
            },
            children: [
              {
                path: '',
                props: true,
                name: 'TemplateDetail',
                component: TemplateDetail
              }
            ]
          },
          {
            path: ':templateId/flumes',
            name: 'Flumes',
            props: true,
            component: FlumeList
          },
          {
            path: ':templateId/addFlume',
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
            path: ':templateId/:id/updateFlume',
            component: FlumeDetail,
            props: true,
            meta: {
              breadcrumb: {
                name: 'FlumeDetail',
                label: 'Flume配置'
              }
            },
            children: [
              {
                path: '',
                name: 'FlumeDetail',
                props: true,
                component: FlumeDetail
              }
            ]
          },
          {
            path: ':templateId/logstashList',
            name: 'LogstashList',
            props: true,
            component: LogstashList
          },
          {
            path: ':templateId/addLogstash',
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
          },
          {
            path: ':templateId/:id/updateLogstash',
            component: LogstashDetail,
            props: true,
            meta: {
              breadcrumb: {
                name: 'LogstashDetail',
                label: 'Logstash配置'
              }
            },
            children: [
              {
                path: '',
                name: 'LogstashDetail',
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
            path: 'jobs',
            name: 'Jobs',
            props: true,
            component: Jobs
          },
          {
            path: ':appId/batches',
            component: AppBatches,
            props: true,
            name: 'AppBatches'
          },
          {
            path: ':appId/addBatch',
            component: AppBatchDetail,
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
                component: AppBatchDetail
              }
            ]
          },
          {
            path: ':appId/:id/updateBatch',
            component: AppBatchDetail,
            props: true,
            meta: {
              breadcrumb: {
                name: 'AppBatchDetail',
                label: '批次详情'
              }
            },
            children: [
              {
                path: '',
                name: 'AppBatchDetail',
                props: true,
                component: AppBatchDetail
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
      },
      {
        path: 'logs',
        component: Log,
        meta: {
          breadcrumb: {
            name: 'Logs',
            label: '日志登记'
          }
        },
        children: [
          {
            path: '',
            name: 'Logs',
            props: true,
            component: LogList
          },
          {
            path: 'add',
            component: LogDetail,
            meta: {
              breadcrumb: {
                name: 'createLog',
                label: '创建日志'
              }
            },
            children: [
              {
                path: '',
                name: 'createLog',
                component: LogDetail
              }
            ]
          },
          {
            path: ':logId',
            props: true,
            component: LogDetail,
            meta: {
              breadcrumb: {
                name: 'LogDetail',
                label: '日志登记详情'
              }
            },
            children: [
              {
                path: '',
                props: true,
                name: 'LogDetail',
                component: LogDetail
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
