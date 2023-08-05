<script lang="ts" name="GoodsImage" setup>
import { computed, ref } from "vue";
import { useMouseInElement } from "@vueuse/core";

const active = ref(0);
defineProps<{
  goodsImg: string[];
}>();

// 控制遮照大图
const target = ref(null);
const { isOutside, elementY, elementX } = useMouseInElement(target);
const position = computed(() => {
  let top = elementY.value - 100,
    left = elementX.value - 100;
  if (left <= 0) left = 0;
  if (left >= 200) left = 200;
  if (top <= 0) top = 0;
  if (top >= 200) top = 200;
  return {
    top,
    left,
  };
});
</script>
<template>
  <div class="goods-image">
    <!--    大图-->
    <div
      v-show="!isOutside"
      :style="[
        {
          backgroundImage: `url(${goodsImg[active]})`,
          backgroundPosition: `-${position.left * 2}px -${position.top * 2}px`,
        },
      ]"
      class="large"
    />
    <!--    头图-->
    <div ref="target" class="middle">
      <img :src="goodsImg[active]" alt="" />
      <div
        v-show="!isOutside"
        :style="{
          top: position.top + 'px',
          left: position.left + 'px',
        }"
        class="layer"
      />
    </div>
    <!--    小图-->
    <ul class="small">
      <li
        v-for="(item, index) in goodsImg"
        :key="item"
        :class="{ active: active === index }"
        @click="active = index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
