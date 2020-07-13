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
      <ModuleCard  v-for="item in filterList" :key="item._id" :item="item">
        <template v-slot:actinos="item">
          <a-tooltip placement="top" @click="handleFork">
            <template slot="title">
              <span>分支</span>
            </template>
            <a-icon type="fork" />
          </a-tooltip>
          <a-tooltip placement="top" @click="handleEdit">
            <template slot="title">
              <span>编辑</span>
            </template>
            <a-icon type="edit"/>
          </a-tooltip>
          <a-tooltip placement="top" v-if="item.lockFlag" @click="handleUnLock" >
            <template slot="title">
              <span>解锁</span>
            </template>
            <a-icon type="lock" />
          </a-tooltip>
          <a-tooltip placement="top" v-else  @click="handleLock" >
            <template slot="title">
              <span>锁定</span>
            </template>
            <a-icon type="unlock"  />
          </a-tooltip>
          <a-tooltip placement="top" @click="handleInfo(item)" >
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
      this.$get('/api/mokuai/searchByUser').then(res => {
        this.list = res.data;
      })
    },
    handleFork() {
      this.$post('/api/mokuai/fork',{id: this.item._id}).then(res => {
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
    handleEdit() {
      this.$router.push({
        path: '/ModuleEdit',
        query: {
          id: this.item._id
        }
      })
    },
    handleLock() {
      this.$post('/api/mokuai/lock',{id: this.item._id}).then(res => {
        if (res.success) {
          this.$notification.success({message: '锁定成功'});
          this.item.lockFlag = res.data.lockFlag;
        }
      })
    },
    handleUnLock() {
      this.$post('/api/mokuai/unlock', {id: this.item._id}).then(res => {
        if (res.success) {
          this.$notification.success({message: '解锁成功'})
          this.item.lockFlag = res.data.lockFlag;
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