<script lang="ts" name="XtxCheckbox" setup>
console.log(123);
</script>

<template>
  <div class="xtx-checkbox">
    <i class="iconfont icon-checked"></i>
    <i class="iconfont icon-unchecked"></i>
    <span>提示文本</span>
  </div>
</template>

<style lang="less" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;

  .icon-checked {
    color: @xtxColor;

    ~ span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>
