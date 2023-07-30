<script lang="ts" name="Category" setup>
import useStore from "@/store";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";

const route = useRoute();
const { categoryStore } = useStore();
// watch(
//   () => route.params.id,
//   (val) => {
//     categoryStore.getTopCategory(val as string);
//   },
//   {
//     immediate: true,
//   },
// );

watchEffect(() => {
  // 依赖发生变化立即执行
  if (route.params.id) {
    categoryStore.getTopCategory(route.params.id as string);
  }
  return;
});
</script>

<template>
  <div class="category-container">
    <xtx-bread separator="/">
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item to="/">
        {{ categoryStore.topCategory.name }}
      </xtx-bread-item>
    </xtx-bread>
  </div>
</template>

<style scoped>
.category-container {
  width: 1240px;
  margin: auto;
}
</style>
