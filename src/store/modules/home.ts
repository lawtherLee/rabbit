import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { HomeBanner, IAxiosRes } from "@/types/data";

export default defineStore("home", {
  state: () => {
    return {
      bannerList: [] as HomeBanner[],
    };
  },
  actions: {
    async getBannerList() {
      const res = await request.get<IAxiosRes<HomeBanner[]>>("/home/banner");
      console.log(res.data);
      this.bannerList = res.data.result;
    },
  },
});
