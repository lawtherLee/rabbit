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
      res.data.result.forEach((item: CategoryItem) => {
        item.open = false;
      });
      this.list = res.data.result;
    },
    // 打开二级分类
    toggleSub(id: number, open: boolean) {
      const findItem = this.list.find((item) => item.id === id);
      if (findItem) findItem.open = open;
    },
  },
});
