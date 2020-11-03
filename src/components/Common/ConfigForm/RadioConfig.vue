<template>
  <a-radio-group :options="config.options" @change="onChange(config.key, $event.target.value)" :value="config.value" :placeholder="config.placeholder || ''" />
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