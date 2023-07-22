import {createApp} from "vue";
import App from "./App.vue";

// 引入normalize，将不同浏览器的样式进行统一重置
import "normalize.css";
// 引入公共样式
import "@/assets/styles/common.less";
import router from "@/router/index.ts";
import {createPinia} from "pinia";

// 引入全局组件
import xtxUI from "@/components/index.ts";
// 引入pinia
const pinia = createPinia();

const app = createApp(App);

app.use(xtxUI);
app.use(pinia);
app.use(router);
app.mount("#app");
