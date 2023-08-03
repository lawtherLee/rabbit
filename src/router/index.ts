import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  scrollBehavior() {
    // 切换路由的时候回到顶部
    return { top: 0 };
  },
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: "", // 默认子路由
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "/category/:id",
          component: () => import("@/views/Category/index.vue"),
        },
        {
          path: "/category/sub/:id",
          component: () => import("@/views/Category/sub.vue"),
        },
        {
          path: "/goods/:goodsId",
          component: () => import("@/views/Goods/index.vue"),
        },
      ],
    },
    {
      path: "/playground",
      component: () => import("@/views/PlayGround/index.vue"),
    },
  ],
});

export default router;
