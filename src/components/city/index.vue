<script lang="ts" name="XtxCity" setup>
import { ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
import { CityList } from "@/types/goods"; // 点击组件外隐藏城市选择

defineProps<{
  address: string;
}>();

const emit = defineEmits(["changeAddress"]);
// 点击组件外隐藏城市选择
const showCity = ref(false);
const target = ref(null);
onClickOutside(target, () => {
  showCity.value = false;
});

// 获取城市数据
const cityList = ref<CityList[]>([]);
const cacheList = ref<CityList[]>([]); // 缓存
const getCityList = async () => {
  const res = await axios.get<CityList[]>(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json",
  );
  cityList.value = res.data;
  cacheList.value = res.data;
};
getCityList();
// 选择配送地址
const selectCity = ref({
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countyCode: "",
  countyName: "",
});
const onSelectCity = (city: CityList) => {
  console.log(city);
  if (city.level === 0) {
    selectCity.value.provinceCode = city.code;
    selectCity.value.provinceName = city.name;
  }
  if (city.level === 1) {
    selectCity.value.cityCode = city.code;
    selectCity.value.cityName = city.name;
  }
  if (city.level === 2) {
    selectCity.value.countyCode = city.code;
    selectCity.value.countyName = city.name;
    showCity.value = false; // 关闭选择框
    emit("changeAddress", selectCity.value);
    return;
  }
  cityList.value = city.areaList;
};
watch(showCity, () => {
  if (!showCity.value) {
    // getCityList();
    cityList.value = cacheList.value;
  }
});
</script>
<template>
  <div ref="target" class="xtx-city">
    <div
      :class="showCity ? 'active' : ''"
      class="select"
      @click="showCity = !showCity"
    >
      <span v-if="address" class="placeholder">{{ address }}</span>
      <span v-else class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-show="showCity" class="option">
      <span
        v-for="item in cityList"
        :key="item.code"
        class="ellipsis"
        @click="onSelectCity(item)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
