<script lang="ts" setup>
import HomeCategory from "@/views/Home/components/HomeCategory.vue";
import HomeBanner from "@/views/Home/components/HomeBanner.vue";
import HomeNews from "@/views/Home/components/HomeNews.vue";
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
        <!--        新鲜好物-->
        <HomeNews />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
