import { defineStore } from "pinia";
import request from "@/utils/request.ts";

export default defineStore("", {
  state: () => {
    return {
      test: 1,
    };
  },
  actions: {
    // 添加购物车
    async addCart(skuId: string, count: number) {
      await request.post("/member/cart", {
        skuId,
        count,
      });
    },
  },
});
