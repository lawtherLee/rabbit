<script lang="ts" name="XtxCarousel" setup>
import { HomeBanner } from "@/types/data";
import { ref } from "vue"; // 记录当前显示哪个banner

const props = defineProps<{
  banners: HomeBanner[];
  duration?: number; // 播放间隔
  autoplay?: boolean; // 自动播放
  isShowIndicator?: boolean; // 显示小点
}>();

// 记录当前显示哪个banner
const active = ref(0);
let timer: number | null = null;

// 自动播放轮播
const play = () => {
  if (!props.autoplay) return;
  timer = window.setInterval(() => {
    active.value = (active.value + 1) % props.banners.length;
  }, props.duration || 2500);
};
play();

const stop = () => {
  clearInterval(timer!);
};
// 下一张
const next = () => {
  active.value = (active.value + 1) % props.banners.length;
};
// 上一张
const prev = () => {
  active.value =
    (active.value - 1 + props.banners.length) % props.banners.length;
};
</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
    <ul class="carousel-body">
      <li
        v-for="(item, index) in banners"
        :key="item.id"
        :class="{ fade: active === index }"
        class="carousel-item"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a class="carousel-btn prev" href="javascript:" @click="prev">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a class="carousel-btn next" href="javascript:" @click="next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <div v-if="!props.isShowIndicator" class="carousel-indicator">
      <span
        v-for="(item, index) in banners"
        :key="item.id"
        :class="{ active: index === active }"
        @click="active = index"
      ></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
