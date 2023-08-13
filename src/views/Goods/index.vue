<script lang="ts" setup>
import { useRoute } from "vue-router";
import useStore from "@/store";
import GoodsImages from "@/views/Goods/components/GoodsImges.vue";
import { storeToRefs } from "pinia";
import GoodsSales from "@/views/Goods/components/GoodsSales.vue";
import GoodsName from "@/views/Goods/components/GoodsName.vue";
import GoodsSku from "@/views/Goods/components/GoodsSku.vue";
import { Sku } from "@/types/goods"; // 响应式

const route = useRoute();
const { goodsStore } = useStore();
const { goods } = storeToRefs(goodsStore);
goodsStore.getGoodsInfo(route.params.goodsId as string);

const onGetSku = (sku: Sku) => {
  console.log(sku);
  goods.value.price = sku.price;
  goods.value.oldPrice = sku.oldPrice;
};
</script>

<template>
  <div class="goods-container">
    <!--    解决1前面是undefined的报错-->
    <div v-if="goods.name" class="container">
      <!--      面包屑-->
      <xtx-bread>
        <xtx-bread-item>首页</xtx-bread-item>
        <xtx-bread-item>{{ goods.categories[1].name }}</xtx-bread-item>
        <xtx-bread-item>{{ goods.categories[0]?.name }}</xtx-bread-item>
        <xtx-bread-item>{{ goods.name }}</xtx-bread-item>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImages :goodsImg="goods.mainPictures"></GoodsImages>
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <GoodsSku
            :goods="goods"
            :skuId="'1369155864430120962'"
            @getSku="onGetSku"
          />
          <XtxNumBox :isShowLabel="true">😄</XtxNumBox>
        </div>
      </div>
    </div>
    <div v-else class="container">骨架屏加载中</div>
  </div>
</template>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
