<template>
    <a-card
      hoverable
      class="module-card"
    >
      <img
        alt="example"
        :src="item.img"
        slot="cover"
      />
      <a-card-meta
        :title="item.name">
        <template slot="description">{{item.desc}}</template>
      </a-card-meta>
      <template class="ant-card-actions" slot="actions">
        <a-tooltip placement="top" >
          <template slot="title">
            <span>分支</span>
          </template>
          <a-icon type="fork" />
        </a-tooltip>
        <a-tooltip placement="top" >
          <template slot="title">
            <span>编辑</span>
          </template>
          <a-icon type="edit"/>
        </a-tooltip>
        <a-tooltip placement="top" v-if="item.lockFlag" >
          <template slot="title">
            <span>解锁</span>
          </template>
          <a-icon type="lock" />
        </a-tooltip>
        <a-tooltip placement="top" v-else >
          <template slot="title">
            <span>锁定</span>
          </template>
          <a-icon type="unlock"  />
        </a-tooltip>
        <a-tooltip placement="top" >
          <template slot="title">
            <span>信息</span>
          </template>
          <a-icon type="info-circle" />
        </a-tooltip>
      </template>
    </a-card>
</template>

<style lang="less">
  .module-card {
    width: 240px;
    .ant-card-body {
      padding: 12px;
    }
  }
</style>

<script>
export default {
  name: 'moduleCard',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>