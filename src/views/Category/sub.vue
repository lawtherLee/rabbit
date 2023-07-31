<script lang="ts" setup>
import useStore from "@/store";
import { useRoute } from "vue-router";

const route = useRoute();
const { categoryStore } = useStore();
categoryStore.getSubCategory(route.params.id as string);
</script>

<template>
  <div class="category-sub-container">
    <!--    面包屑-->
    <xtx-bread>
      <xtx-bread-item>首页</xtx-bread-item>
    </xtx-bread>
  </div>
</template>

<style scoped>
.category-sub-container {
  width: 1240px;
  margin: auto;
}
</style>
