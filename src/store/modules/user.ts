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

    // 发送验证码
    async getCode(mobile: string) {
      const res = await request.get<IAxiosRes<any>>("/login/code", {
        params: {
          mobile,
        },
      });
      console.log(res);
    },
    async mobileLogin(mobile: string, code: string) {
      const res = await request.post<IAxiosRes<UserType>>("/login/code", {
        mobile,
        code,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
    },
  },
});
