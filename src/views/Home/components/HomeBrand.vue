<script lang="ts" name="HomeBrand" setup>
import HomePannel from "@/views/Home/components/HomePannel.vue";
import { useSyncRequest } from "@/hooks/index.ts";
import useStore from "@/store";
import { ref } from "vue";

const { homeStore } = useStore();

const brandRef = useSyncRequest(() => {
  homeStore.getBrandList();
});

// 切换
const currentIndex = ref(0);
</script>

<template>
  <div ref="brandRef">
    <HomePannel sub-title="国际经典 品质保证" title="热门品牌">
      <template v-slot:more>
        <a
          :class="{ disabled: currentIndex === 0 }"
          class="iconfont icon-angle-left prev"
          href="javascript:"
          @click="currentIndex = 0"
        />
        <a
          :class="{ disabled: currentIndex === 1 }"
          class="iconfont icon-angle-right next"
          href="javascript:"
          @click="currentIndex = 1"
        />
      </template>

      <template #body>
        <transition>
          <div v-if="homeStore.brandList.length" ref="box" class="box">
            <ul
              :style="{ transform: `translateX(-${currentIndex * 1240}px)` }"
              class="list"
            >
              <li v-for="item in homeStore.brandList" :key="item.id">
                <RouterLink to="/">
                  <img v-lazy="item.picture" alt="" />
                </RouterLink>
              </li>
            </ul>
          </div>
          <div v-else class="skeleton">
            <XtxSkeleton
              v-for="i in 5"
              :key="i"
              :height="305"
              :width="240"
              animated
              bg="#e4e4e4"
              class="item"
            />
          </div>
        </transition>
      </template>
    </HomePannel>
  </div>
</template>

<style lang="less" scoped>
.home-panel {
  background: #f5f5f5;
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;

  .item {
    margin-right: 10px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
