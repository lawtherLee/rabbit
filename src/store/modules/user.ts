import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { UserType } from "@/types/user";

export default defineStore("user", {
  state: () => {
    return {
      profile: {} as UserType,
    };
  },
  actions: {
    // 账号登录
    async accountLogin(account: string, password: string) {
      console.log("账号登录");
      const res = await request.post<IAxiosRes<UserType>>("/login", {
        account,
        password,
      });
      this.profile = res.data.result;
    },
  },
});
