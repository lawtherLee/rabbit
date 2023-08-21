declare module "@/types/goods";
declare module "@/types/category";
declare module "@/types/data";
declare module "@/types/user";
declare module "@/utils/request";
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// type GetMeCb = (openId: string) => void;
// namespace QC {
//   const Login: {
//     check: () => boolean;
//     getMe: (GetMeCb) => void;
//   };
// }
