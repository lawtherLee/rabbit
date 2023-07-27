// axios相应数据类型
export interface IAxiosRes<T> {
  code?: string;
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
// 轮播图类型
export type HomeBanner = {
  imgUrl: string;
  hrefUrl: string;
  id: string;
  type: string;
};
// 新鲜好物
export type NewGoods = {
  price: string;
  name: string;
  orderNum: number;
  id: string;
  picture: string;
  desc: string;
};
// 人气推荐
export type HomeHotGoods = {
  alt: string;
  id: string;
  picture: string;
  title: string;
};
// 热门品牌
export type HomeBrand = {
  desc: string;
  id: string;
  logo: string;
  name: string;
  nameEn: string;
  picture: string;
  place: string;
  type: null;
};
// 产品类型
export type HomeProduct = {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: subProductChildren[];
  goods: GoodsType[];
};
export type subProductChildren = {
  id: string;
  layer: number;
  name: string;
  parent: null;
};
