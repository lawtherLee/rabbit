<script lang="ts" name="XtxConfirm" setup>
import XtxButton from "@/components/button/index.vue";
import { onMounted, ref } from "vue";

const props = defineProps<{
  title?: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}>();

const show = ref(false);
onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 20);
});
</script>
<template>
  <div :class="{ fade: show }" class="xtx-confirm">
    <div :class="{ fade: show }" class="wrapper">
      <div class="header">
        <h3>{{ props.title || "温馨提示" }}</h3>
        <a class="iconfont icon-close-new" href="JavaScript:"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ props.content }}</span>
      </div>
      <div class="footer">
        <XtxButton size="mini" type="gray" @click="onCancel">取消</XtxButton>
        <XtxButton size="mini" type="primary" @click="onConfirm"
          >确认
        </XtxButton>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;

  background: rgba(0, 0, 0, 0);

  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }

  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;

    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }

    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }

    .footer {
      text-align: right;

      .xtx-button {
        margin-left: 20px;
      }
    }

    .header {
      position: relative;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>