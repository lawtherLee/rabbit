import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";

declare module "vue" {
  export interface GlobalComponents {
    // key是全局组件名
    XtxSkeleton: typeof XtxSkeleton;
    XtxCarousel: typeof XtxCarousel;
  }
}
export {};
