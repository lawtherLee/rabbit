import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { CategoryItem, IAxiosRes } from "@/types/data";
import { topCategory } from "@/constant/home.ts";

const defaultCategory = topCategory.map((item) => {
  return {
    name: item,
  };
});
export default defineStore("category", {
  state: function () {
    return {
      list: defaultCategory as CategoryItem[],
    };
  },
  actions: {
    // 获取分类数据
    async getCategory() {
      const res = await request.get<IAxiosRes>("/home/category/head");
      this.list = res.data.result;
    },
  },
});
