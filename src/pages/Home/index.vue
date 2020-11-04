<template>
  <div class="home-container">
    <!-- <h2>Welcome</h2> -->
    <div>
      <video class="video" controls="controls" autoplay width="700" height="420" src="http://qn.zhangyy.xyz/afull2.mov"></video>
      <div class="text-center">页面搭建视频教程</div>
    </div>
  </div>
</template>

<style lang="less">
.home-container {
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  .text-center {
    font-size: 20px;
    text-align: center;
  }
  .video {
    border: none;
    outline: none;
  }
}
</style>

<script>
export default {
  data: () => ({
    msg: ''
  }),
}
</script>