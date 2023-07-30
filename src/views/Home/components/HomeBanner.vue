<script lang="ts" setup>
import useStore from "@/store";

const { homeStore } = useStore();

homeStore.getBannerList();
</script>
<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel :banners="homeStore.bannerList" autoplay />
  </div>
</template>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;
}
</style>
