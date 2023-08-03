import { defineStore } from "pinia";

export default defineStore("goods", {
  state: () => {
    return {
      goods: {},
    };
  },
  actions: {
    getGoodsInfo(id: string) {
      console.log("goodsDetail");
    },
  },
});
