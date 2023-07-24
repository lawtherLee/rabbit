<script lang="ts" name="HomeHot" setup>
import HomePannel from "@/views/Home/components/HomePannel.vue";
import useStore from "@/store";
import HomeGoods from "@/views/Home/components/HomeGoods.vue";
import { computed } from "vue";
import { GoodsType } from "@/types/data";

const { homeStore } = useStore();
homeStore.getHotGoods();

// 规避类型检查 计算属性重新处理数据
const goods = computed<GoodsType[]>(() => {
  return homeStore.hotGoods.map((item) => ({
    price: "0",
    name: item.title,
    orderNum: null,
    id: item.id,
    picture: item.picture,
    desc: item.alt,
  }));
});
</script>

<template>
  <div class="home-hot">
    <HomePannel sub-title="人气爆款 不容错过" title="人气推荐">
      <template #body>
        <HomeGoods :goods="goods">
          <template v-slot="{ row }">
            <span style="color: #999">{{ row.desc }}</span>
          </template>
        </HomeGoods>
      </template>
    </HomePannel>
  </div>
</template>

<style scoped></style>
