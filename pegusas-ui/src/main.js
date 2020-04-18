import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
