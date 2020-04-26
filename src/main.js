import Vue from 'vue'
import App from './App.vue'
import './plugins'
import router from './routers';
import store from './store';
import './app.less';
import './Tools/fire-tool';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

document.body.addEventListener('click', (e) => {
  const {clientX, clientY} = e;
  window.MemAntInterval({
    startPos: {
      x: clientX,
      y: clientY
    },
    interval: 20,
    config: {
      width: 8,
      height: 8
    }
  })
})