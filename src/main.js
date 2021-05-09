import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import router from './plugins/router'

Vue.config.productionTip = false;
Vue.prototype.$appName = 'Blessing';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
