import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    template: modules.template,
    flume: modules.flume,
    logstash: modules.logstash,
    app: modules.app,
    host: modules.host,
    job: modules.job,
    log: modules.log,
    system: modules.system,
    appBatch: modules.appBatch,
    pagination: modules.pagination,
  }
})

export default store
