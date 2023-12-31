<script lang="ts" name="HomeCategory" setup>
import useStore from "@/store/index.ts";
import { GoodsType } from "@/types/data";
import { ref } from "vue";

const { categoryStore } = useStore();

const currentGoods = ref<GoodsType[]>([]);
const currentId = ref(-1); // 记录鼠标移动哪一项高亮
// 鼠标移入获取一级分类goods
const getCurrentGoods = (goods: GoodsType[], id: number) => {
  currentGoods.value = goods;
  currentId.value = id;
};
</script>
<template>
  <div class="home-category">
    <ul class="menu">
      <li
        v-for="item in categoryStore.list"
        :key="item.id"
        :class="{ active: currentId === item.id }"
        @mouseenter="getCurrentGoods(item.goods, item.id)"
      >
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <!--        渲染的内容-->
        <template v-if="item.children">
          <RouterLink
            v-for="sub in item.children?.slice(0, 2)"
            :key="sub.id"
            to="/"
          >
            {{ sub.name }}
          </RouterLink>
        </template>
        <!--        骨架屏-->
        <template v-else>
          <xtx-skeleton
            :height="20"
            :width="35"
            animated
            bg="hotpink"
            fade
            style="margin-left: 10px"
          />
          <xtx-skeleton
            :height="20"
            :width="35"
            animated
            bg="hotpink"
            fade
            style="margin-left: 10px"
          />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer" @mouseleave="currentId = -1">
      <h4>
        分类推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul>
        <li v-for="item in currentGoods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price">
                <i>¥</i>
                {{ item.price }}
              </p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      //&:hover,
      &.active {
        background: @xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;

      small {
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;

          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;

            .name {
              font-size: 16px;
              color: #666;
            }

            .desc {
              color: #999;
            }

            .price {
              font-size: 22px;
              color: @priceColor;

              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
