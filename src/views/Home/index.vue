<script lang="ts" setup>
import HomeCategory from "@/views/Home/components/HomeCategory.vue";
import HomeBanner from "@/views/Home/components/HomeBanner.vue";
import HomeNews from "@/views/Home/components/HomeNews.vue";
import HomeHot from "@/views/Home/components/HomeHot.vue";
import HomeBrand from "@/views/Home/components/HomeBrand.vue";
import HomeProduct from "@/views/Home/components/HomeProduct.vue";
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
        <!--        人气推荐-->
        <HomeHot />
        <!--        热门品牌-->
        <HomeBrand />
        <!--        产品区域-->
        <HomeProduct />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-home {
  /deep/ .xtx-carousel {
    .prev {
      left: 270px;
    }
  }
}
</style>
