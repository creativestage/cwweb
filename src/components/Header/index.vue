<template>
  <div class="header">
    <div class="logo">
      logo
    </div>
    <div class="loginer-contianer">
      <a-dropdown>
        <a class="white">
          xuxu <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">设置</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">退出</a>
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

  })
}
</script>