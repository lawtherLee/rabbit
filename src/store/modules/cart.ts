import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { CartItem } from "@/types/cart";
import Message from "@/components/message/index.ts";
import useStore from "@/store";

export default defineStore("cart", {
  persist: true,
  state: () => {
    return {
      list: [] as CartItem[],
    };
  },
  actions: {
    // 添加购物车
    async addCart(data: CartItem) {
      if (this.isLogin) {
        const { skuId, count } = data;
        await request.post("/member/cart", {
          skuId,
          count,
        });
        await this.getCart();
      } else {
        console.log("操作本地", data);
        const findItem = this.list.find((item) => item.id === data.id);
        if (findItem) {
          findItem.count += data.count;
        } else {
          this.list.unshift(data);
        }
      }
    },
    // 获取购物车数据
    async getCart() {
      if (this.isLogin) {
        const res = await request.get<IAxiosRes<CartItem[]>>("/member/cart");
        this.list = res.data.result;
        return;
      }
      for (const item of this.list) {
        const res = await request.get("/goods/stock/" + item.skuId);
        item.nowPrice = res.data.result.nowPrice;
        item.stock = res.data.result.stock;
      }
    },

    // 删除购物车
    async delCart(skuIds: string[]) {
      if (this.isLogin) {
        await request.delete("/member/cart", {
          data: {
            ids: skuIds,
          },
        });
        await this.getCart();
      } else {
        this.list = this.list.filter((item) => !skuIds.includes(item.skuId));
      }
    },
    // 监听数量变化
    async changeCount(id: string, count: number) {
      const findItem = this.list.find((item) => item.skuId === id);
      if (findItem) {
        findItem.count = count;
      }
      await this.updateCart(id, {
        count: count,
      });
    },
    // 更新选中和数量
    async updateCart(
      skuId: string,
      data: {
        selected?: boolean;
        count: number;
      },
    ) {
      if (this.isLogin) {
        await request.put("/member/cart/" + skuId, data);
        Message.success("更新成功");
        return;
      }
      const findItem = this.list.find((item) => item.skuId === skuId);
      if (!findItem) return;
      if (data.selected === undefined && findItem) {
        findItem.count = data.count;
      } else {
        if (data.selected) {
          findItem.selected = data.selected;
        }
      }
    },
    // 更新全选
    async updateAllCheck(selected: boolean) {
      if (this.isLogin) {
        await request.put("member/cart/selected", { selected });
        await this.getCart();
        return;
      }
      this.list.forEach((item) => (item.selected = selected));
    },
    // 合并购物车
    async mergeStorageCart() {
      const data = this.list.map((item) => ({
        skuId: item.skuId,
        count: item.count,
        selected: item.selected,
      }));
      await request.post("/member/cart/merge", data);
      await this.getCart();
    },
  },
  getters: {
    // 区分是否登录
    isLogin(): boolean {
      const { userStore } = useStore();
      return !!userStore.profile.token; // 隐式转换布尔值
    },
    cartCount(): number {
      return this.list.reduce((acc: number, item: CartItem) => {
        return acc + item.count;
      }, 0);
    },
    cartTotalPrice(): string {
      return this.list
        .reduce((price: number, item: CartItem) => {
          return price + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    selectedGoods(): number {
      return this.list.reduce((count: number, item: CartItem) => {
        if (item.selected) {
          return count + item.count;
        }
        return count;
      }, 0);
    },
    selectedTotalPrice(): string {
      return this.list
        .reduce((price: number, item: CartItem) => {
          if (item.selected) {
            return price + item.count * item.price;
          }
          return price;
        }, 0)
        .toFixed(2);
    },
    isAllCheck(): boolean {
      return this.list.every((item) => item.selected);
    },
  },
});
