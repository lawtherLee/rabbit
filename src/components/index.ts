import { App } from "vue";

import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";

const components = [XtxSkeleton, XtxCarousel];

export default function (app: App) {
  components.forEach((comp) => {
    app.component(comp.name, comp);
  });
}
