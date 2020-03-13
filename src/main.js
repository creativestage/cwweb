import Vue from 'vue'
import App from './App.vue'
import './plugins'
import router from './routers';
import store from './store';
import './app.less';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
