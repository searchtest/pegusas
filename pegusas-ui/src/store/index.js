import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    template: modules.template,
    pagination: modules.pagination,
    queryset: modules.queryset
  }
})

export default store
