import { App } from "vue";

import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";
import { useIntersectionObserver } from "@vueuse/core";
import defaultImg from "@/assets/images/200.png";

const components = [XtxSkeleton, XtxCarousel, XtxMore];

export default function (app: App) {
  components.forEach((comp) => {
    app.component(comp.name, comp);
  });
  // 自定义指令 懒加载
  app.directive("lazy", {
    mounted(el, binding) {
      console.log(binding);
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
