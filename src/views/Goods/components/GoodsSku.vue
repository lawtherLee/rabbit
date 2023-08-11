<script lang="ts" name="GoodsSku" setup>
import { GoodsInfo, SpecVal } from "@/types/goods";

defineProps<{
  goods: GoodsInfo;
}>();
// 点击加动态类名
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
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values">
          <img
            v-if="val.picture"
            :class="{ selected: val.selected }"
            :src="val.picture"
            alt=""
            @click="changeSelected(val, item.values)"
          />
          <span
            v-else
            :class="{ selected: val.selected }"
            @click="changeSelected(val, item.values)"
            >{{ val.desc }}</span
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
