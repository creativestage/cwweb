<template>
    <div class="mock-phone-container">
        <div class="page-preview-title">
          <span>{{title}}</span>
            <a-icon @click="handleClose" class="page-preview-close" type="close-circle" />
          </div>
        <div class="mock-phone">
            <slot name="main"></slot>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<style scoped lang="less">
@primary: #b1a3dc;
.mock-phone-container {
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid @primary;
  border-radius: 6px;
  display:flex;
  flex-direction: column;
  overflow: hidden;
  background: #fefefe;
  box-shadow: 0 0 4px 1px #ddd;
}
.mock-phone {
  flex:1;
  overflow: auto;
}
.page-preview-title {
  position: relative;
  padding: 8px 8px;
  border-bottom: 1px solid @primary;
  opacity: 0.6;
  clear: both;
  flex: none;
}
.page-preview-close {
  float: right;
  margin-top: 4px;
  font-size: 18px;
}

</style>

<script>
export default {
  props: {
    title: String,
    handleClose: Function
  }
}
</script>
