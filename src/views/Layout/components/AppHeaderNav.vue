<script lang="ts" setup>
import useStore from "@/store/index.ts";

// 获取分类信息
const { categoryStore } = useStore();
categoryStore.getCategory();
</script>

<template>
  <ul class="app-header-nav">
    <li class="home">
      <router-link to="/">首页</router-link>
    </li>
    <!--    一级分类-->
    <li
      v-for="item in categoryStore.list"
      :key="item.id"
      @mouseenter="categoryStore.toggleSub(item.id, true)"
      @mouseleave="categoryStore.toggleSub(item.id, false)"
    >
      <router-link
        :to="'/category/' + item.id"
        @click="categoryStore.toggleSub(item.id, false)"
        >{{ item.name }}
      </router-link>
      <!--      二级分类-->
      <div :class="{ 'open-sub': item.open }" class="layer">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link
              :to="'/category/sub/' + sub.id"
              @click="categoryStore.toggleSub(item.id, false)"
            >
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }

    // 通过js处理二级分类显隐
    //&:hover {
    //  > a {
    //    color: @xtxColor;
    //    border-bottom: 1px solid @xtxColor;
    //  }
    //
    //  > .layer {
    //    height: 132px;
    //    opacity: 1;
    //  }
    //}
  }
}

.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}

.open-sub {
  height: 132px;
  opacity: 1;
}
</style>
