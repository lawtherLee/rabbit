<template>
  <div>
    <XtxDialog v-model="visible" title="添加收货地址" @close="onClose">
      <template #body>
        <div>form</div>
      </template>
      <template></template>
    </XtxDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const visible = ref(true);

const onClose = () => {
  console.log("close");
};
</script>

<style scoped></style>