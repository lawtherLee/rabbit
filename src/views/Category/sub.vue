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
    <!-- 筛选区 -->
    <div class="sub-filter">
      <div
        v-for="item in categoryStore.subCategory.saleProperties"
        :key="item.id"
        class="item"
      >
        <div class="head">{{ item.name }}：</div>
        <div class="body">
          <a href="javascript:">全部</a>
          <a v-for="i in item.properties" :key="i.id" href="javascript:">{{
            i.name
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.category-sub-container {
  width: 1240px;
  margin: auto;
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;

    .item {
      display: flex;
      line-height: 40px;

      .head {
        width: 80px;
        color: #999;
      }

      .body {
        flex: 1;

        a {
          margin-right: 36px;
          transition: all 0.3s;
          display: inline-block;

          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
