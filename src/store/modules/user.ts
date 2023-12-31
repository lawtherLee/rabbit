import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { UserType } from "@/types/user";
import { getProfile, removeProfile, setProfile } from "@/utils/storage.ts";
import router from "@/router";

export default defineStore("user", {
  state: () => {
    return {
      profile: getProfile() as UserType,
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
      setProfile(this.profile);
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
    // 短信登录
    async mobileLogin(mobile: string, code: string) {
      const res = await request.post<IAxiosRes<UserType>>("/login/code", {
        mobile,
        code,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(this.profile);
    },
    // QQ登录
    async qqLogin(openId: string) {
      const res = await request.post<IAxiosRes<UserType>>("/login/social", {
        unionId: openId,
        source: 6,
      });
      console.log(res);
    },
    // 绑定qq的短信验证码
    async sendQQBindMsg(mobile: string) {
      const res = await request.get("/login/social/code", {
        params: {
          mobile,
        },
      });
      console.log(res);
    },
    // 绑定qq并登录
    qqBindLogin(unionId: string, mobile: string, code: string) {
      request.post("/login/social/bind", {
        unionId,
        mobile,
        code,
      });
    },
    // 获取短信验证码
    // 绑定qq的短信验证码
    async sendQQPathMsg(mobile: string) {
      await request.get("/register/code", {
        params: {
          mobile,
        },
      });
    },

    async qqPatchLogin(data: any) {
      const res = await request.post<IAxiosRes<UserType>>(
        `/login/social/${data.openId}/complement`,
        data,
      );
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);
    },

    // 用户退出
    logout() {
      this.profile = {} as UserType;
      removeProfile();

      router.push("/login");
    },
  },
});
