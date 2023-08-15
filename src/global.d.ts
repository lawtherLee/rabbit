import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxBread from "@/components/bread/index.vue";
import XtxBreadItem from "@/components/breadItem/index.vue";
import XtxCity from "@/components/city/index.vue";
import XtxNumBox from "@/components/number/index.vue";
import XtxButton from "@/components/button/index.vue";

declare module "vue" {
  export interface GlobalComponents {
    // key是全局组件名
    XtxSkeleton: typeof XtxSkeleton;
    XtxCarousel: typeof XtxCarousel;
    XtxBread: typeof XtxBread;
    XtxBreadItem: typeof XtxBreadItem;
    XtxCity: typeof XtxCity;
    XtxNumBox: typeof XtxNumBox;
    XtxButton: typeof XtxButton;
  }
}
export {};
