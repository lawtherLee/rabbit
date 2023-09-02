import { createRouter, createWebHashHistory } from "vue-router";
import useStore from "@/store";

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
        {
          path: "/cart",
          component: () => import("@/views/Cart/index.vue"),
        },
        {
          path: "/member/checkout",
          component: () => import("@/views/Member/pay/checkout.vue"),
          // beforeEnter: () => {
          //
          // }
        },
        {
          path: "/member/pay",
          component: () => import("@/views/Member/pay/index.vue"),
        },
        {
          path: "/pay/callback",
          component: () => import("@/views/Member/pay/callback.vue"),
        },
      ],
    },
    {
      path: "/playground",
      component: () => import("@/views/PlayGround/index.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/login/callback",
      component: () => import("@/views/Login/callback.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { cartStore } = useStore();
  if (!cartStore.isLogin && to.path.startsWith("/member")) {
    next("/login");
  } else {
    next();
  }
});
export default router;
