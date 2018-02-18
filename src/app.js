/* eslint-disable no-new */
import 'assets/cssreset-min.css'
import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'

import App from './app.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
