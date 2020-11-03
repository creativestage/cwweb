<template>
  <a-checkbox-group :options="config.options" @change="onChange(config.key, $event)" :value="config.value" :placeholder="config.placeholder || ''" />
</template>

<style scoped>
</style>
<script>
export default {
  props: {
    config: Object,
    onChange: Function
  }
}
</script>