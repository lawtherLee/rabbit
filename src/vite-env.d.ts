/// <reference types="vite/client" />

type GetMeCb = (openId: string) => void;
namespace QC {
  // 类型声明
  declare const Login: {
    check: () => boolean;
    getMe: (GetMeCb) => void;
  };
  declare const api = (api: string) => any;
}
