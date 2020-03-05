<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
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
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import Header from './components/Header';
import Left from './components/Left';
import TopNav from './components/TopNav';
export default {
  name: 'app',
  data() {
    return {
      zh_CN,
    }
  },
  components: {
    Header,
    Left,
    TopNav
  }
}
</script>

<style>
#app {

}
.app-container {
  display: flex;
  height: calc(100vh - 48px);
}
.app-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content-inner {
  flex: 1;
  width: 100%;
  background: #fff;
  overflow: auto;
}
</style>
