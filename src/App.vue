<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <template v-if="$store.state.main.activeRoute !== 'Login'">
        <Header />
        <div class="app-container">
          <Left />
          <div class="app-content">
            <TopNav />
            <div class="content-inner">
              <router-view></router-view>
            </div>
          </div>
        </div>
        <Footer />
      </template>
      <template v-else>
        <Login />
      </template>
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import Header from './components/Header';
import Left from './components/Left';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Login from './components/Login';
import {getCurrentRoute} from './Tools/common';
export default {
  name: 'app',
  data() {
    return {
      zh_CN,
    }
  },
  watch: {
    '$route': function () {
      this.$store.dispatch('openRoute', getCurrentRoute());
    }
  },
  components: {
    Header,
    Left,
    TopNav,
    Footer,
    Login
  },
  created() {
    this.$post('/auth/checkLogin').then(res => {
      console.log(res)
    })
  }
}
</script>

<style>
.app-container {
  display: flex;
  height: calc(100vh - 48px - 64px);
}
.app-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content-inner {
  height: 100vh;
  width: 100%;
  background: #f9f7fd;
  overflow: auto;
  padding: 8px;
}
</style>
