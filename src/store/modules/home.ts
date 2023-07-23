import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { GoodsType, HomeBanner, IAxiosRes } from "@/types/data";

export default defineStore("home", {
  state: () => {
    return {
      bannerList: [] as HomeBanner[],
      newGoods: [] as GoodsType[],
    };
  },
  actions: {
    async getBannerList() {
      const res = await request.get<IAxiosRes<HomeBanner[]>>("/home/banner");
      this.bannerList = res.data.result;
    },
    async getNewGoods() {
      const res = await request.get<IAxiosRes<GoodsType[]>>("/home/new");
      this.newGoods = res.data.result;
    },
  },
});
