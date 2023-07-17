import {defineStore} from "pinia";
import request from "@/utils/request.ts";

export default defineStore('category', {
  state: () => {
    return {
      list: []
    }
  },
  actions: {
    // 获取分类数据
    async getCategory() {
      const res = await request.get('/home/category/head')
      console.log(res)
      this.list = res.data.result
    }
  }
})
