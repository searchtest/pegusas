import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'

import Template from '../views/template/index.vue'
import TemplateList from '../views/template/TemplateList.vue'
import FlumeDetail from '../views/template/flume/FlumeDetail.vue'
import LogstashDetail from '../views/template/logstash/LogstashDetail.vue'

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
