<template>
  <div class="mypages-list">
    <a-card
      hoverable
      class="mypages-item"
      v-for="(item, index) in list" :key="item._id"
    >
      <div slot="cover">
        <iframe @load="onLoad(index)" class="mypages-page" :src="item.loadurl"></iframe>
      </div>
      <template slot="actions">
        <a-tooltip placement="top" @click="handleOpen(item)">
          <template slot="title">
            <span>打开链接</span>
          </template>
          <a-icon type="link" />
        </a-tooltip>
        <a-tooltip placement="top" @click="handleCopy(item)">
          <template slot="title">
            <span>拷贝创作</span>
          </template>
          <a-icon type="copy" />
        </a-tooltip>
        <a-tooltip placement="top" @click="handleDelete(item)" >
          <template slot="title">
            <span>删除创作</span>
          </template>
          <a-icon type="delete" />
        </a-tooltip>
      </template>
    </a-card>
  </div>
</template>

<style lang="less">
@import '../../../styles/common.less';

.mypages-list {
  .display-grid(5);
  .mypages-item {
    background: #fff;
    box-shadow: 2px 2px 2px #eee;
  }
  .mypages-item-control {
    padding: 12px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  .mypages-page {
    height: 320px;
    outline: none;
    border: none;
  }
}
</style>

<script>
export default {
  data: () =>({
    list: []
  }),
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$get('/api/page/mypages').then(res => {
        this.list = res.data.map((item, index) => ({
          ...item,
          loadurl: index === 0 ? item.url : ''
        }));
      })
    },
    onLoad(index) {
      this.list[index].loadurl = this.list[index].url;
    },
    handleOpen(item) {
      window.window.location = item.url;
    },
    handleCopy() {
      this.$notification.warn({message: '未实现!'});
    },
    handleDelete(item) {
      this.list = this.list.filter(vo => vo !== item)
    }
  }
}
</script>