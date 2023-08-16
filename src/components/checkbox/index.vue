<script lang="ts" name="XtxCheckbox" setup>
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue", "change"]);
const onChange = () => {
  emit("update:modelValue", !props.modelValue);
  // emit("change");
};
</script>

<template>
  <div class="xtx-checkbox" @click="onChange">
    <i v-if="modelValue" class="iconfont icon-checked"></i>
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
