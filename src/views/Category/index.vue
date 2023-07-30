<script lang="ts" name="Category" setup>
import useStore from "@/store";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";
import CategorySub from "@/views/Category/components/CategorySub.vue";

const route = useRoute();
const { categoryStore, homeStore } = useStore();
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
    <!--    面包屑-->
    <xtx-bread separator="/">
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item to="/">
        {{ categoryStore.topCategory.name }}
      </xtx-bread-item>
    </xtx-bread>
    <!--    轮播图-->
    <xtx-carousel :banners="homeStore.bannerList" style="height: 500px" />
    <!--    二级分类-->
    <category-sub />
  </div>
</template>

<style scoped>
.category-container {
  width: 1240px;
  margin: auto;
}
</style>
