<template>
<div class="page-container">
    <div>
        <a-input placeholder="按关键词查询"></a-input>
      </div>
    <div class="my-module-list">
      <ModuleCard  v-for="item in list" :key="item._id" :item="item" />
    </div>
    <a-button class="module-new-btn" type="primary">
      <router-link to="/ModuleEdit">
        新增
      </router-link>
    </a-button>
  </div>
</template>

<style scoped lang="less">
  .my-module-list {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: auto;
    position: relative;
    z-index: 999;
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    grid-row-gap: 8px;
    grid-column-gap: 8px;
  }
  .module-new-btn {
    position: absolute;
    z-index: 999;
    bottom: 12px;
    left: 50%;
    width: 120px;
    text-align: center;
    transform: translate(-50%)
  }
</style>

<script>
import ModuleCard from '../../../components/Common/ModuleCard';
export default {
  data: () => ({
    msg: 'myModule',
    list: [
      {
        name: '倒计时',
        desc: '倒计时组件，可以多重效果！',
        img: 'http://qn.zhangyy.xyz/3c2e1cd452.png'
      },
      {
        name: '倒计时',
        desc: '倒计时组件，可以多重效果！',
        img: 'http://qn.zhangyy.xyz/3c2e1cd452.png'
      },
      {
        name: '倒计时',
        desc: '倒计时组件，可以多重效果！',
        img: 'http://qn.zhangyy.xyz/3c2e1cd452.png'
      },
      {
        name: '倒计时',
        desc: '倒计时组件，可以多重效果！',
        img: 'http://qn.zhangyy.xyz/3c2e1cd452.png'
      },
      {
        name: '倒计时',
        desc: '倒计时组件，可以多重效果！',
        img: 'http://qn.zhangyy.xyz/3c2e1cd452.png'
      },
      {
        name: '倒计时',
        desc: '倒计时组件，可以多重效果！',
        img: 'http://qn.zhangyy.xyz/3c2e1cd452.png'
      },
      {
        name: '倒计时',
        desc: '倒计时组件，可以多重效果！',
        img: 'http://qn.zhangyy.xyz/3c2e1cd452.png'
      },
      {
        name: '倒计时',
        desc: '倒计时组件，可以多重效果！',
        img: 'http://qn.zhangyy.xyz/3c2e1cd452.png'
      }
    ]
  }),
  methods: {
  },
  components: {
    ModuleCard,
  }
}
</script>