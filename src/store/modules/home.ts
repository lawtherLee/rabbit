import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { GoodsType, HomeBanner, HomeHotGoods, IAxiosRes } from "@/types/data";

export default defineStore("home", {
  state: () => {
    return {
      bannerList: [] as HomeBanner[],
      newGoods: [] as GoodsType[],
      hotGoods: [] as HomeHotGoods[],
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
    async getHotGoods() {
      const res = await request.get<IAxiosRes<HomeHotGoods[]>>("/home/hot");
      this.hotGoods = res.data.result;
    },
  },
});
