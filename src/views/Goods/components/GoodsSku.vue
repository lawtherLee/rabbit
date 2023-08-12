<script lang="ts" name="GoodsSku" setup>
import { GoodsInfo, SpecVal } from "@/types/goods";
import bwPowerSet from "@/utils/power-set.ts";

const props = defineProps<{
  goods: GoodsInfo;
}>();
// 切换选中状态
const changeSelected = (row: SpecVal, specVal: SpecVal[]) => {
  if (row.selected) {
    row.selected = false;
  } else {
    specVal.forEach((item) => {
      item.selected = false;
    });
    row.selected = true;
  }
};
// sku禁用状态
// 1.筛选所有有效sku
const optional = () => {
  return props.goods.skus.filter((item) => item.inventory);
};
// 2.在有效sku中规格，必然也是有效的
const pathMap: any = {};
optional().forEach((sku) => {
  // 每一个sku的规格属性 处理arr的幂集算法
  const powerSet = bwPowerSet(sku.specs.map((item) => item.valueName));
  // 3.将这些情况 放入路径字典
  powerSet.forEach((spec) => {
    const key = spec.join("+");
    pathMap[key] = true;
  });
});
// 4.默认选中 根据每一项的值和组合的值 去路径字典查找
const upDateSpecBtnDisable = () => {
  props.goods.specs.forEach((spec) => {
    spec.values.forEach((specBtn) => {
      const isSpec = pathMap[specBtn.name];
      if (!isSpec) {
        specBtn.disabled = true;
      } else {
        specBtn.disabled = false;
      }
    });
  });
};
upDateSpecBtnDisable();
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values">
          <img
            v-if="val.picture"
            :class="{ selected: val.selected, disabled: val.disabled }"
            :src="val.picture"
            alt=""
            @click="changeSelected(val, item.values)"
          />
          <span
            v-else
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSelected(val, item.values)"
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style lang="less" scoped>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
