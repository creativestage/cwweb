<template>
  <div>
    <mavon-editor :editable="false" :toolbarsFlag="false" :subfield="false" :defaultOpen="'preview'" v-model="value"/>
  </div>
</template>

<style scoped>

</style>


<script>
import value from './ConfigurationGuide';
export default {
  data: () => ({
    value: value
  })
}
</script>