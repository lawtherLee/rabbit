<script lang="ts" name="XtxCheckbox" setup>
const props = defineProps<{
  agree: boolean;
}>();
const emit = defineEmits(["update:agree", "change"]);
const onChange = () => {
  emit("update:agree", !props.agree);
  emit("change");
};
</script>

<template>
  <div class="xtx-checkbox" @click="onChange">
    <i v-if="agree" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span><slot /></span>
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
