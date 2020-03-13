<template>
  <a-checkbox-group :options="config.options" @change="onChange(config.key, $event)" :value="config.value" />
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