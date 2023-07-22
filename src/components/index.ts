import { App } from "vue";

import XtxSkeleton from "@/components/skeleton/index.vue";

const components = [XtxSkeleton];

export default function (app: App) {
  components.forEach((comp) => {
    app.component(comp.name, comp);
  });
}
