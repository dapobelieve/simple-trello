import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import "./assets/app.css"


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')