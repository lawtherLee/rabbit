<script lang="ts" setup>
import useStore from "@/store";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";

const route = useRoute();
const { categoryStore } = useStore();

watchEffect(() => {
  if (!route.params.id) return;
  categoryStore.getSubCategory(route.params.id as string);
});
</script>

<template>
  <div class="category-sub-container">
    <!--    面包屑-->
    <xtx-bread>
      <xtx-bread-item>首页</xtx-bread-item>
      <xtx-bread-item>
        {{ categoryStore.subCategory.parentName }}
      </xtx-bread-item>
      <xtx-bread-item>
        {{ categoryStore.subCategory.name }}
      </xtx-bread-item>
    </xtx-bread>
  </div>
</template>

<style scoped>
.category-sub-container {
  width: 1240px;
  margin: auto;
}
</style>
