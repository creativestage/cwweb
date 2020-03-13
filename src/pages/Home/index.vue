<template>
  <div>
    hello world
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  data: () => ({
    msg: ''
  }),
  mounted() {
    this.$ajax({
      url: '/api/mokuai/list'
    })
  }
}
</script>