import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    template: modules.template,
    app: modules.app,
    host: modules.host,
    job: modules.job,
    system: modules.system,
    appBatch: modules.appBatch,
    pagination: modules.pagination,
    queryset: modules.queryset
  }
})

export default store
