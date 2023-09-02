<template>
  <div>
    <teleport to="body">
      <XtxDialog
        v-model="visible"
        title="添加收货地址"
        @close="onClose"
        @confirm="onConfirm"
      >
        <template #body>
          <div>form</div>
        </template>
        <template></template>
      </XtxDialog>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const visible = ref(true);

const onClose = () => {
  console.log("close");
};
const onConfirm = () => {
  console.log("confirm");
};
</script>

<style scoped></style>