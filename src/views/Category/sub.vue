<script lang="ts" setup>
import useStore from "@/store";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";

const route = useRoute();
const { categoryStore } = useStore();

watchEffect(() => {
  if (!route.params.id) return;
  categoryStore.getSubCategory(route.params.id as string);
});
</script>

<template>
  <div class="category-sub-container">
    <!--    面包屑-->
    <xtx-bread>
      <xtx-bread-item>首页</xtx-bread-item>
      <xtx-bread-item>
        {{ categoryStore.subCategory.parentName }}
      </xtx-bread-item>
      <xtx-bread-item>
        {{ categoryStore.subCategory.name }}
      </xtx-bread-item>
    </xtx-bread>
    <!-- 筛选区 -->
    <div class="sub-filter">
      <div
        v-for="item in categoryStore.subCategory.saleProperties"
        :key="item.id"
        class="item"
      >
        <div class="head">{{ item.name }}：</div>
        <div class="body">
          <a href="javascript:">全部</a>
          <a v-for="i in item.properties" :key="i.id" href="javascript:">{{
            i.name
          }}</a>
        </div>
      </div>
    </div>
    <!-- 商品区域 -->
    <div class="goods-list">
      <!-- 排序区域 -->
      <div class="sub-sort">
        <div class="sort">
          <a class="active" href="javascript:">默认排序</a>
          <a href="javascript:">最新商品</a>
          <a href="javascript:">最高人气</a>
          <a href="javascript:">评论最多</a>
          <a href="javascript:">
            价格排序
            <i class="arrow up" />
            <i class="arrow down" />
          </a>
        </div>
      </div>
      <!-- 商品列表 -->
      <ul>
        <li v-for="goods in categoryStore.subCategory.goods" :key="goods.id">
          <XtxGoodsItem :goods="goods" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.category-sub-container {
  width: 1240px;
  margin: auto;
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;

    .item {
      display: flex;
      line-height: 40px;

      .head {
        width: 80px;
        color: #999;
      }

      .body {
        flex: 1;

        a {
          margin-right: 36px;
          transition: all 0.3s;
          display: inline-block;

          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }

  .goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5px;

      li {
        margin-right: 20px;
        margin-bottom: 20px;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }

    .sub-sort {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .sort {
        display: flex;

        a {
          height: 30px;
          line-height: 28px;
          border: 1px solid #e4e4e4;
          padding: 0 20px;
          margin-right: 20px;
          color: #999;
          border-radius: 2px;
          position: relative;
          transition: all 0.3s;

          &.active {
            background: @xtxColor;
            border-color: @xtxColor;
            color: #fff;
          }

          .arrow {
            position: absolute;
            border: 5px solid transparent;
            right: 8px;

            &.up {
              top: 3px;
              border-bottom-color: #bbb;

              &.active {
                border-bottom-color: @xtxColor;
              }
            }

            &.down {
              top: 15px;
              border-top-color: #bbb;

              &.active {
                border-top-color: @xtxColor;
              }
            }
          }
        }
      }

      .check {
        .xtx-checkbox {
          margin-left: 20px;
          color: #999;
        }
      }
    }
  }
}
</style>
