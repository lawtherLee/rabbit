<script lang="ts" name="HomeProduct" setup>
import HomePanel from "@/views/Home/components/HomePannel.vue";
import useStore from "@/store";
import { useSyncRequest } from "@/hooks";

const { homeStore } = useStore();
const productRef = useSyncRequest(() => {
  homeStore.getProductList();
});
</script>
<template>
  <div ref="productRef" class="home-product">
    <HomePanel
      v-for="item in homeStore.productList"
      :key="item.id"
      :title="item.name"
      sub-title=""
    >
      <template v-slot:more>
        <div class="sub">
          <RouterLink v-for="subItem in item.children" :key="subItem.id" to="/">
            {{ subItem.name }}
          </RouterLink>
        </div>
        <XtxMore to="/" />
      </template>
      <template #body>
        <div class="box">
          <RouterLink class="cover" to="/">
            <img :src="item.picture" alt="" />
            <strong class="label">
              <span>{{ item.name }}馆</span>
              <span>{{ item.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="good in item.goods" :key="good.id">
              <div class="goods-item">
                <RouterLink class="image" to="/">
                  <img :src="good.picture" alt="" />
                </RouterLink>
                <p class="name ellipsis-2">{{ good.name }}</p>
                <p class="desc">{{ good.desc }}</p>
                <p class="price">&yen;{{ good.price }}</p>
                <div class="extra">
                  <RouterLink to="/">
                    <span>找相似</span>
                    <span>发现现多宝贝 &gt;</span>
                  </RouterLink>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<style lang="less" scoped>
.home-product {
  background: #fff;
  height: 2900px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: @xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}

.goods-item {
  width: 240px;
  height: 300px;
  padding: 10px 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  transition: all 0.5s;

  .image {
    display: block;
    width: 160px;
    height: 160px;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    margin-top: 6px;
    font-size: 16px;

    &.name {
      height: 44px;
    }

    &.ellipsis-2 {
      width: 160px;
      overflow: hidden;
      //white-space: nowrap;
      text-overflow: ellipsis;
    }

    &.desc {
      color: #666;
      height: 22px;
      width: 160px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &.price {
      margin-top: 10px;
      font-size: 20px;
      color: @priceColor;
    }
  }

  .extra {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 86px;
    width: 100%;
    background: @xtxColor;
    text-align: center;
    transform: translate3d(0, 100%, 0);
    transition: all 0.5s;

    span {
      display: block;
      color: #fff;
      width: 120px;
      margin: 0 auto;
      line-height: 30px;

      &:first-child {
        font-size: 18px;
        border-bottom: 1px solid #fff;
        line-height: 40px;
        margin-top: 5px;
      }
    }
  }

  &:hover {
    border-color: @xtxColor;

    .extra {
      transform: none;
    }
  }
}
</style>
