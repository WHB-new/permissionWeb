import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/permission'
import './plugins/element'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
