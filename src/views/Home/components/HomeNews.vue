<script lang="ts" setup>
import HomeGoods from "@/views/Home/components/HomeGoods.vue";
import HomePannel from "@/views/Home/components/HomePannel.vue";
import useStore from "@/store";
import { useSyncRequest } from "@/hooks";

const { homeStore } = useStore();
const homeNewsRef = useSyncRequest(() => {
  homeStore.getNewGoods();
});
</script>

<template>
  <div ref="homeNewsRef" class="home-new">
    <HomePannel subTitle="新鲜出炉 品质靠谱" title="真的新鲜">
      <!--          更多-->
      <template #more>
        <XtxMore to="/goods"> 查看全部</XtxMore>
      </template>
      <!--          主体-->
      <template #body>
        <HomeGoods :goods="homeStore.newGoods">
          <template v-slot="{ row }">&yen; {{ row.price }}</template>
        </HomeGoods>
      </template>
    </HomePannel>
  </div>
</template>

<style scoped></style>
