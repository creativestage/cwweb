<template>
<div class="configuration-contianer">
    <div class="configuration-title">配置项</div>
    <div class="configuration-main">
      <div class="configuration-item-wrap" v-for="item in configuration" :key="item.key">
        <div class="configuration-item-label">{{item.label}}</div>
        <div class="configuration-item-control">
          <InputConfig v-if="item.type === 'input'" :config="item" :onChange="onChange" />
          <SelectConfig v-if="item.type === 'select'" :config="item" :onChange="onChange" />
          <RadioConfig v-if="item.type === 'radio'" :config="item" :onChange="onChange" />
        </div>
      </div>
    </div>
    <div class="configuration-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="less">
.configuration-contianer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #efedf8;
  box-shadow:  1px 1px 4px #d3b7db;
}

.configuration-title {
  padding: 8px 0 6px;
  font-size: 16px;
  text-align: center;
  color: #6e4bc2;
  letter-spacing: 4px;
  border-bottom: 1px solid #ddd;
}
.configuration-footer {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ddd;
}
.configuration-main {
  padding: 12px;
  flex: 1;
  overflow: auto;
}
  .configuration-item-wrap {
    display: flex;
    align-items: center;
    margin: 12px 0;
  }
  .configuration-item-label {
    max-width: 120px;
    min-width: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 8px;
    flex: none;
  }
  .configuration-item-control {
    flex: 1;
  }
</style>

<script>
import InputConfig from './InputConfig';
import SelectConfig from './SelectConfig';
import RadioConfig from './RadioConfig'
export default {
  name: 'ConfigForm',
  props: {
    configuration: Array
  },
  components: {
    InputConfig,
    SelectConfig,
    RadioConfig,
  },
  methods: {
    onChange(field, value) {
      this.$emit('onChange', field, value);
    }
  }
}
</script>