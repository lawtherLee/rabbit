import {defineStore} from "pinia";
import request from "@/utils/request.ts";

export default defineStore('category', {
  state: () => {
    return {
      text: 1
    }
  },
  actions: {
    // 获取分类数据
    async getCategory() {
      const res = await request.get('/home/category/head')
      console.log(res)
    }
  }
})
