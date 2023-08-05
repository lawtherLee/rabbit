<script lang="ts" setup>
import { useRoute } from "vue-router";
import useStore from "@/store";
import GoodsImages from "@/views/Goods/components/GoodsImges.vue";

const route = useRoute();
const { goodsStore } = useStore();
goodsStore.getGoodsInfo(route.params.goodsId as string);
</script>

<template>
  <div class="goods-container">
    <!--    解决1前面是undefined的报错-->
    <div v-if="goodsStore.goods.name" class="container">
      <!--      面包屑-->
      <xtx-bread>
        <xtx-bread-item>首页</xtx-bread-item>
        <xtx-bread-item
          >{{ goodsStore.goods.categories[1].name }}
        </xtx-bread-item>
        <xtx-bread-item
          >{{ goodsStore.goods.categories[0]?.name }}
        </xtx-bread-item>
        <xtx-bread-item>{{ goodsStore.goods.name }}</xtx-bread-item>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImages></GoodsImages>
        </div>
        <div class="spec"></div>
      </div>
    </div>
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
