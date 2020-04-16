import axios from 'axios'

import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// Axios
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

// Vue
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
