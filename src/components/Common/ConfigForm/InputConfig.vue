<template>
  <a-input class="config-input-form" :value="config.value" :placeholder="config.placeholder || ''" @change="onChange(config.key, $event.target.value)"  />
</template>

<style scoped>
.config-input-form {
  background: rgba(255, 255, 255, 0.6);
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