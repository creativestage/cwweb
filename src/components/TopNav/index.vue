<template>
  <div class="top-nav">
    <div class="select-routes">
      <div @click="handleClick(item.code)"
        :class="['select-route', item.code === $store.state.main.activeRoute ? 'select-route-active' : '']"
        v-for="item in openList" :key="item.code"
      >
        <span>{{item.title}}</span> <a-icon v-if="item.code !== 'Home'" @click.stop="handleClose(item.code)" class="select-route-close" type="close" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.top-nav {
  padding: 0 12px;
  color: #fff;
  margin-top: -48px;
  height: 48px;
  width: calc(100% - 120px);
}
.select-routes {
  height: 48px;
  display: flex;
}
.select-route {
  cursor: pointer;
  position: relative;
  margin: 0 12px;
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 48px;
  line-height: 48px;
  flex: none;
  &-active::after {
    content:'';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background: #6e4bc2;
  }
}
.select-route-close {
  margin-left: 4px;
  &:hover {
    color: #6e4bc2;
  }
}
</style>

<script>
import {travelTree} from '../../Tools/common';
import {allTreeData} from '../../const/treeData';
export default {
  computed: {
    openList() {
      const {openRoutes} = this.$store.state.main;
      return openRoutes
        .sort((code1) => {
          if (code1 === 'Home') return -1;
          return 0;
        })
        .map(code => {
          const result = {code};
          travelTree(allTreeData, (node) => {
            if (node.code === code) {
              result.title = node.title;
              return true;
            }
          });
          return result;
        });
    }
  },
  methods: {
    getTitle(code) {
      travelTree(allTreeData, (node) => {
        if (node.code === code) {
          return node.title;
        }
      });
    },
    goLink(code) {
      let flag = false;
      travelTree(allTreeData, (node) => {
        if (node.code === code) {
          this.$router.push(node.route);
          return flag = true;
        }
      });
      if (!flag) {
        this.$router.push('/');
      }
    },
    handleClose(code) {
      this.$store.dispatch('closeRoute', {
        route: code,
        success: (nextActiveRoute) => {
          console.log('nextActiveRoute: ', nextActiveRoute)
          this.goLink(nextActiveRoute);
        }
      });
    },
    handleClick(code) {
      this.$store.dispatch('changeActiveRoute', {
        route: code,
        success: () => {
          this.goLink(code);
        }
      });
    }
  }
}
</script>