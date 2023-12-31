// 创建实例时配置默认值
import axios, { AxiosError } from "axios";
import Message from "@/components/message/index.ts";
import useStore from "@/store";

export const baseURL = "http://pcapi-xiaotuxian-front.itheima.net/";
// export const baseURL = "http://apipc-xiaotuxian-front.itheima.net/";
const instance = axios.create({
  baseURL,
  // baseURL: "http://apipc-xiaotuxian-front.itheima.net/",
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { userStore } = useStore();
    if (userStore.profile.token) {
      config.headers.Authorization = "Bearer " + userStore.profile.token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error: AxiosError<{ message: string }>) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    if (error.response) {
      // error.response的报错是Message.error抛出的
      Message.error(error.response.data.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
