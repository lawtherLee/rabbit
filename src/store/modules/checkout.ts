import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { CheckoutInfo, UserAddress } from "@/types/checkout.ts";

export default defineStore("checkout", {
  state: () => {
    return {
      checkoutInfo: {} as CheckoutInfo,
    };
  },
  actions: {
    // 获取结算信息
    async getCheckoutInfo() {
      const res = await request.get<IAxiosRes<CheckoutInfo>>(
        "/member/order/pre",
      );
      this.checkoutInfo = res.data.result;
      console.log(this.checkoutInfo);
    },
  },
  getters: {
    showUserAddress(): UserAddress | null {
      if (!this.checkoutInfo.userAddresses?.length) {
        return null;
      } else {
        const findItem = this.checkoutInfo.userAddresses?.find(
          (item) => !item.isDefault,
        );
        return findItem || this.checkoutInfo.userAddresses[0];
      }
    },
  },
});
