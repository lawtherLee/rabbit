<script lang="ts" name="AppHeaderSticky" setup>
import AppHeaderNav from "@/views/Layout/components/AppHeaderNav.vue";
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll(); // 使用插件获取scrollTop的值

// const y = ref(0);
// const onScroll = () => {
//   y.value = document.documentElement.scrollTop;
// };
// window.addEventListener("scroll", onScroll);
//
// onBeforeUnmount(() => {
//   window.removeEventListener("scroll", onScroll);
// });
</script>

<template>
  <div :class="{ show: y >= 78 }" class="app-header-sticky">
    <div v-show="y >= 78" class="container">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s ease-in;

  &.show {
    transform: translateY(0);
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url(@/assets/images/xtxlogo.png) no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
