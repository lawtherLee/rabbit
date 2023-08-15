<script lang="ts" setup>
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getHotAPI } from "@/api/goods.ts";
import GoodsItem from "@/components/goodsItem/index.vue";
import { GoodsType } from "@/types/data";

const props = defineProps({
  type: {
    type: Number as PropType<1 | 2 | 3>,
    default: 1,
  },
});

// 标题对象
const titleObj = {
  1: "24小时热销榜",
  2: "周热销榜",
  3: "总热销榜",
};

// 获取热销榜
const route = useRoute();
const hotGoods = ref<GoodsType[]>([]);
const getHotsList = async () => {
  const id = route.params.goodsId;
  const limit = 3;
  const type = props.type;
  const res = await getHotAPI(id as string, limit, type);
  console.log(res);
  hotGoods.value = res.data.result;
};
onMounted(() => {
  getHotsList();
});
</script>

<template>
  <div class="goods-hot">
    <h3>{{ titleObj[props.type] }}</h3>
    <div class="goods-list">
      <!-- 商品区块 -->
      <GoodsItem v-for="item in hotGoods" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.goods-hot {
  background-color: #fff;
  margin-bottom: 20px;

  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
