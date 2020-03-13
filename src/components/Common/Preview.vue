<template>
    <div class="mock-phone-container">
        <div class="mock-phone">
            <div class="inner">
                <slot name="main"></slot>
            </div>
            <div class="camera"></div>
            <div class="earpiece"></div>
            <a target="_blank" href="" class="phone-home-btn"></a>
        </div>
    </div>
</template>

<style scoped lang="less">
@primary: #6e4bc2;
@lightPrimary: #f6f1fe;
.mock-phone-container {
  position: relative;
}
.mock-phone {
    margin: 0 auto;
    position: absolute;
    top: 0;
    z-index: 10;
    width: 297px;
    height: 600px;
    border: 2px solid @primary;
    border-radius: 30px;
}
.mock-phone .inner {
    position: absolute;
    top: 60px;
    z-index: 26;
    left: 12px;
    width: 267px;
    height: 441px;
    overflow: auto;
    border: 1px solid @primary;
}
.mock-phone .camera {
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background: @lightPrimary;
    border: 1px solid @primary;
    top: 23px;
    left: 94px;
}
.mock-phone .earpiece {
    position: absolute;
    width: 70px;
    height: 8px;
    border-radius: 8px;
    background: @lightPrimary;
    border: 1px solid @primary;
    top: 26px;
    left: 124px;
}
.mock-phone .phone-home-btn {
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius: 56px;
    background: @lightPrimary;
    border: 1px solid @primary;
    bottom: 14px;
    left: 50%;
    margin-left: -28px;
}
</style>

<script>
export default {
    data: () => ({

    }),

}
</script>
