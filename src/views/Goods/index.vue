<script lang="ts" setup>
import { useRoute } from "vue-router";
import useStore from "@/store";
import GoodsImages from "@/views/Goods/components/GoodsImges.vue";
import { storeToRefs } from "pinia";
import GoodsSales from "@/views/Goods/components/GoodsSales.vue";
import GoodsName from "@/views/Goods/components/GoodsName.vue";
import GoodsSku from "@/views/Goods/components/GoodsSku.vue";
import { Sku } from "@/types/goods";
import { ref } from "vue";
import GoodsDetail from "@/views/Goods/components/GoodsDetail.vue";
import GoodsHot from "@/views/Goods/components/GoodsHot.vue";
import Message from "@/components/message/index.ts"; // 响应式

const route = useRoute();
const { goodsStore, cartStore } = useStore();

const { goods } = storeToRefs(goodsStore);
let currentSku = {} as Sku;

goodsStore.getGoodsInfo(route.params.goodsId as string);

const onGetSku = (sku: Sku) => {
  // console.log(sku);
  goods.value.price = sku.price;
  goods.value.oldPrice = sku.oldPrice;
  currentSku = sku;
};

const buyCount = ref(1);

const addShopCar = () => {
  if (!currentSku.id) Message.warning("请选择完整的规格");
  cartStore.addCart(currentSku.id, buyCount.value);
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
          <!--          sku-->
          <GoodsSku
            :goods="goods"
            :skuId="'1369155864430120962'"
            @getSku="onGetSku"
          />
          <!--          商品数量-->
          <XtxNumBox
            v-model:buyCount="buyCount"
            :isShowLabel="true"
            :max="10"
            :min="1"
          >
            😄
          </XtxNumBox>
          <!--          加入购物车-->
          <XtxButton
            size="middle"
            style="margin: 10px 5px"
            type="primary"
            @click="addShopCar"
          >
            加入购物车
          </XtxButton>
        </div>
      </div>
      <!--      商品详情-->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <!-- 商品详情 -->
            <GoodsDetail :goods="goods" />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
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

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>