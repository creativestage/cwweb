<template>
<div class="page-container">
    <div class="search_bar_container">
      <div class="search_keywords" style="width: 400px">
        <a-input placeholder="模块名/模块描述/作者名"></a-input>
      </div>
      <div class="pagination">
        <a-pagination @change="onPaginationChange" size="small" :total="total" />
      </div>
    </div>
    <div class="my-module-list">
      <ModuleCard  v-for="item in list" :key="item._id" :item="item" >
        <template v-slot:actions="row">
          <a-tooltip placement="top" @click="handleFork(row.item)">
            <template slot="title">
              <span>分支</span>
            </template>
            <a-icon type="fork" />
          </a-tooltip>
          <a-tooltip placement="top" @click="handleInfo(row.item)" >
            <template slot="title">
              <span>信息</span>
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </template>
      </ModuleCard>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-container {
  position: relative;
}
.search_bar_container {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: #f3f3f3;
  border-radius: 8px;
  position: sticky;
  top: 0;
  z-index: 99;
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
  .page-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    padding-right: 12px;
    width: 100%;
    height: 48px;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>

<script>
import ModuleCard from '../../../components/Common/ModuleCard';
export default {
  data: () => ({
    msg: 'myModule',
    list: [],
    total: 0,
    page: 1,
    pageSize: 10
  }),
  computed: {
    queryFields() {
      return {
        page: this.page,
        pageSize: this.pageSize
      }
    }
  },
  mounted() {
    this.fetchModuleList();
  },
  methods: {
    fetchModuleList() {
      this.$get('/api/mokuai/search', this.queryFields).then(res => {
        this.list = res.data.rows;
        this.total = res.data.total;
      })
    },
    onPaginationChange(page) {
      this.page = page;
      this.fetchModuleList();
    },
    handleFork(item) {
      this.$post('/api/mokuai/fork',{id: item._id}).then(res => {
        if (res.success) {
          this.$notification.success({message: '操作成功'});
          this.$router.push({
            path: '/ModuleEdit',
            query: {
              id: res.data._id
            }
          })
        }
      })
    },
    handleInfo(item) {
      console.log(item)
    }
  },
  components: {
    ModuleCard,
  }
}
</script>