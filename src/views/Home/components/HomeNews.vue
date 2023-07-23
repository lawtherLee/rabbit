<script lang="ts" setup>
import HomeGoods from "@/views/Home/components/HomeGoods.vue";
import HomePannel from "@/views/Home/components/HomePannel.vue";
import useStore from "@/store";

const { homeStore } = useStore();
homeStore.getNewGoods();
</script>

<template>
  <div class="home-new">
    <HomePannel subTitle="123" title="真的新鲜">
      <!--          更多-->
      <template #more>
        <XtxMore to="/goods"> 查看全部</XtxMore>
      </template>
      <!--          主体-->
      <template #body>
        <HomeGoods :goods="homeStore.newGoods" />
      </template>
    </HomePannel>
  </div>
</template>

<style scoped></style>
