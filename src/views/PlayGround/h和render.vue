<script lang="ts" setup>
import { h, onMounted, render } from "vue";

const vNode = h("h2", { class: "my-h2", id: "my-id" }, "我是h2");
console.log(vNode);
onMounted(() => {
  const dom = document.getElementById("playground");
  render(vNode, dom!);
});
</script>

<template>
  <div id="playground"></div>
  <XtxMessage></XtxMessage>
</template>

<style scoped></style>
