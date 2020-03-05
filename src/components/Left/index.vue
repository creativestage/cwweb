<template>
  <div class="left-nav">
    <a-menu mode="inline" :selectedKeys="[$store.state.main.activeRoute]">
      <template v-for="item in treeData">
        <a-sub-menu v-if="item.children" :key="item.code">
          <template slot="title"><a-icon :type="item.icon" /><span>{{item.title}}</span></template>
          <a-menu-item @click="handleClick(subItem.code)" v-for="(subItem) in item.children" :key="subItem.code">
            <router-link :to="subItem.route">{{subItem.title}}</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else-if="!item.hidden" @click="handleClick(item.code)" :key="item.code">
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<style scoped lang="less">
.left-nav {
  background: #fff;
  .ant-menu {
    width: 160px;
    border: none;
  }
}
</style>

<script>
import {leftTreeData} from '../../const/treeData';
export default {
  data: () => ({
    treeData: leftTreeData
  }),
  methods: {
    handleClick(code) {
      this.$store.dispatch('openRoute', code);
    }
  }
}
</script>