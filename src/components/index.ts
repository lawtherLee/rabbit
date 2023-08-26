import { App } from "vue";

import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";
import XtxBreadItem from "@/components/breadItem/index.vue";
import XtxBread from "@/components/bread/index.vue";
import XtxGoodsItem from "@/components/goodsItem/index.vue";
import XtxCity from "@/components/city/index.vue";
import XtxNumBox from "@/components/number/index.vue";
import XtxButton from "@/components/button/index.vue";
import XtxConfirm from "@/components/confirm/index.vue";
import XtxCheckbox from "@/components/checkbox/index.vue";
import XtxMessage from "@/components/message/index.vue";
import { useIntersectionObserver } from "@vueuse/core";
import defaultImg from "@/assets/images/200.png";

const components = [
  XtxSkeleton,
  XtxCarousel,
  XtxMore,
  XtxBread,
  XtxBreadItem,
  XtxGoodsItem,
  XtxCity,
  XtxNumBox,
  XtxButton,
  XtxCheckbox,
  XtxMessage,
  XtxConfirm,
];

export default function (app: App) {
  components.forEach((comp) => {
    app.component(comp.name, comp);
  });
  // 自定义指令 懒加载
  app.directive("lazy", {
    mounted(el, binding) {
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = binding.value;
          el.onerror = function () {
            el.src = defaultImg;
          };
          stop();
        }
      });
    },
  });
}
