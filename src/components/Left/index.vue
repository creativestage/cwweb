<template>
  <div :class="['left-nav', collapsed ? 'left-nav-collapsed' : '']">
    <div type="primary" @click="toggleCollapsed" class="menu-collapsed-btn">
      <a-icon :type="collapsed ? 'double-right' : 'double-left'" />
    </div>
    <a-menu mode="inline" :inlineCollapsed="collapsed" :selectedKeys="[$store.state.main.activeRoute]">
      <template v-for="item in treeData">
        <a-sub-menu v-if="item.children" :key="item.code">
          <template slot="title"><a-icon :type="item.icon" /><span>{{item.title}}</span></template>
          <a-menu-item v-for="(subItem) in item.children" :key="subItem.code">
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
  position: relative;
  background: #fff;
  .ant-menu {
    width: 160px;
    border: none;
  }
  &-collapsed {
    overflow: hidden;
    width: 80px;
  }
}
.menu-collapsed-btn {
  padding: 8px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  background: #f9f7fd;
}
</style>

<script>
import {leftTreeData} from '../../const/treeData';
export default {
  data: () => ({
    treeData: leftTreeData,
    collapsed: false
  }),
  watch: {
    '$store.state.main.activeRoute': function(newVal) {
      this.collapsed = newVal === 'ModuleEdit';
    }
  },
  mounted() {
    this.collapsed = this.$store.state.main.activeRoute === 'ModuleEdit';
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  }
}
</script>