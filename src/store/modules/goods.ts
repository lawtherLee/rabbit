import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { GoodsInfo } from "@/types/goods";

export default defineStore("goods", {
  state: () => {
    return {
      goods: {} as GoodsInfo,
    };
  },
  actions: {
    async getGoodsInfo(id: string) {
      const res = await request.get<IAxiosRes<GoodsInfo>>("/goods?id=" + id);
      this.goods = res.data.result;
    },
  },
});
