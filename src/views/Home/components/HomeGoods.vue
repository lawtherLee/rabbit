<template>
  <ul class="goods-list">
    <li v-for="item in goods" :key="item.id">
      <RouterLink to="/">
        <img v-lazy="item.picture" alt="" />
        <p class="name ellipsis">{{ item.name }}</p>
        <p class="price">
          <!--          作用域插槽-->
          <slot :row="item"></slot>
        </p>
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { GoodsType } from "@/types/data";

const props = defineProps<{
  goods: GoodsType[];
}>();
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
