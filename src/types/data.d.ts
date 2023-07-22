// axios相应数据类型
export interface IAxiosRes {
  code: string;
  msg: string;
  result: T;
}

export type GoodsType = {
  price: string;
  name: string;
  orderNum: null;
  id: string;
  picture: string;
  desc: string;
};
// 首页分类类型
export type CategoryItem = {
  id: number;
  name: string;
  children: CategoryItem[];
  picture: string;
  goods: GoodsType[];
  open: boolean;
};
