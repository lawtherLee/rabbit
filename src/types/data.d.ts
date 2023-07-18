// axios相应数据类型
export interface IAxiosRes {
  code: string;
  msg: string;
  result: T;
}

// 首页分类类型
export type CategoryItem = {
  id: number;
  name: string;
  children: CategoryItem[];
  picture: string;
  goods: {}[];
};
