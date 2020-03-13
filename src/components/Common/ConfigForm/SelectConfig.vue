<template>
  <a-select class="config-select-form" :defaultValue="config.defaultValue || ''" @change="onChange(config.key, $event)">
    <a-select-option v-for="item in config.options" :key="item.value" :value="item.value">{{item.name}}</a-select-option>
  </a-select>
</template>

<style scoped>
.config-select-form {
  background: rgba(255, 255, 255, 0.6);
  width: 100%;
}
</style>
<script>
export default {
  props: {
    config: Object,
    onChange: Function
  }
}
</script>