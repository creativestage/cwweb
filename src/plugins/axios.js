import Vue from 'vue';
import axios from 'axios';

export default {
  install: function () {
    const isDev = process.env.NODE_ENV === 'development';
    const defaultConfig = {
      method: 'GET',
      baseURL: isDev ? 'http://localhost:4800/' : 'http://zhangyy.xyz:4800/',
      timeout: 3000,
      withCredentials: true,
    };
    Vue.prototype.$ajax = function (options) {
      return new Promise((resolve, reject) => {
        options = Object.assign({}, defaultConfig, options);
        axios.request(options).then(resp => {
          if (resp.status >= 400 || resp.status < 200) {
            this.$notification.error('网络错误，请刷新重试');
          } else if (!resp.data.success) {
            this.$notification.error(resp.data.message || '网络错误，请重试');
            reject(resp.data);
          } else {
            resolve(resp.data);
          }
        }).catch(err => {
          this.$notification.error('网络错误，请重试');
          reject(err);
        })
      });
    };
    Vue.prototype.$get = function (url, params, options) {
      return this.$ajax({
        method: 'GET',
        url,
        params,
        ...options
      })
    }
    Vue.prototype.$post = function (url, data, options) {
      return this.$ajax({
        method: 'POST',
        url,
        data,
        ...options
      })
    }
  },
}