import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import VueHtmlToPaper from 'vue-html-to-paper';
import router from './plugins/router'

Vue.config.productionTip = false;
Vue.prototype.$appName = 'TB-Blessing';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueHtmlToPaper, options);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
