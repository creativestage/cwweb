<template>
<div class="page-container">
    <div class="search_bar_container">
      <div class="search_keywords" style="width: 400px">
        <a-input v-model="keywords" placeholder="模块名/模块描述/模块key值"></a-input>
      </div>
      <a-button class="module-new-btn" type="primary">
        <router-link to="/ModuleEdit">
          新增
        </router-link>
      </a-button>
      </div>
    <div class="my-module-list">
      <ModuleCard  v-for="item in filterList" :key="item._id" :item="item" />
    </div>
  </div>
</template>

<style scoped lang="less">
.page-container {
  position: relative;
  padding-bottom: 48px;
}
.search_bar_container {
  padding: 16px;
  background: #f3f3f3;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
}
  .my-module-list {
    padding: 12px 0;
    overflow: auto;
    position: relative;
    z-index: 9;
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    grid-row-gap: 8px;
    grid-column-gap: 8px;
  }
  .module-new-btn {
    width: 80px;
    letter-spacing: 6px;
    text-align: center;
  }
</style>

<script>
import ModuleCard from '../../../components/Common/ModuleCard';
export default {
  data: () => ({
    list: [],
    keywords: '',
  }),
  computed:  {
    filterList() {
      const {list, keywords} = this;
      return list.filter(item => {
        return item.name && item.name.indexOf(keywords) > -1 || item.desc && item.desc.indexOf(keywords) > -1 ||
          item.config && item.config.indexOf(keywords) > -1;
      })
    }
  },
  mounted() {
    this.fetchModuleList();
  },
  methods: {
    fetchModuleList() {
      this.$get('/api/mokuai/search').then(res => {
        this.list = res.data.rows;
      })
    }
  },
  components: {
    ModuleCard,
  }
}
</script>