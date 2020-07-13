<template>
    <a-card
      hoverable
      class="module-card"
    >
    
    <div slot="cover" class="poster-box">
      <img
        class="modole-poster"
        alt="example"
        :src="item.poster"
      />
      <div class="author-info">
        <div class="author-name">作者：{{item.author && item.author.name}}</div>
        <div class="module-version">版本号：{{item.version}}</div>
      </div>
    </div>
      
      <a-card-meta
        :title="item.name">
        <template slot="description">
          <div class="module-desc">{{item.desc}}</div>
        </template>
      </a-card-meta>
      <template class="ant-card-actions" slot="actions" v-if="showAction">
        <slot :item="item" name="actinos"/>
      </template>
    </a-card>
</template>

<style lang="less">
@primary: #6e4bc2;
  .module-card {
    width: 100%;
    box-shadow: 00 2px 1px #f6f1fe;
    .poster-box {
      border-bottom: 1px solid #f6f1fe;
      position: relative;
      width: 100%;
      padding-bottom: 80%;
      overflow: hidden;
    }
    .author-info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 4px 8px;
      font-size: 12px;
      background: rgba(255, 255, 255, 1);
      color: #999;
    }
    .modole-poster {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .ant-card-body {
      padding: 8px;
    }
    .ant-card-meta-title {
      font-size: 14px;
    }
    .ant-card-meta-detail > div:not(:last-child) {
      margin-bottom: 0;
    }
    .module-desc {
      font-size: 12px;
    }
    &.ant-card-bordered {
      border-color: #f6f1fe;
    }
    .ant-card-actions {
      border-color: #f6f1fe;
      background: #fff;
      .anticon {
        color: @primary;
      }
    }
  }
  .module-desc {
    height: 32px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
</style>

<script>
export default {
  name: 'moduleCard',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    showAction: {
      type: Boolean,
      default: true
    }
  },
  methods: {
  }
}
</script>