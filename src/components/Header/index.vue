<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">CWStage</router-link>
    </div>
    <div class="loginer-contianer" v-if="$store.state.main.userInfo">
      <a-dropdown>
        <a class="white">
          {{$store.state.main.userInfo.name}} <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">设置</a>
          </a-menu-item>
          <a-menu-item>
            <a @click="handlelogout" href="javascript:;">退出</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background: #000;
  color: #fff;
}
.white {
  color: #fff;
}
</style>

<script>
export default {
  data: () => ({

  }),
  methods: {
    handlelogout() {
      this.$post('/auth/logout').then(res => {
        if (!res.success) {
          this.$notification.error({message: res.message});
        } else {
          this.$notification.success({message: '退出成功'});
          this.$store.dispatch('logout')
          this.$router.replace('/Login')
        }
      })
    }
  }
}
</script>