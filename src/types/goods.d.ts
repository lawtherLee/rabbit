// 商品模块的类型声明

type GoodsDetail = {
  pictures: string[];
  properties: {
    name: string;
    value: string;
  }[];
};
export type Sku = {
  id: string;
  inventory: number;
  oldPrice: string;
  price: number;
  skuCode: string;
  specs: { name: string; valueName: string }[];
};
export type SpecVal = {
  desc: string;
  name: string;
  picture: string;
  selected: boolean;
  disabled: boolean;
};
export type Spec = {
  name: string;
  values: SpecVal[];
};
export type GoodsInfo = {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: number;
  oldPrice: number;
  discount: number;
  inventory: number;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: any[];
  videoScale: number;
  mainPictures: string[];
  isPreSale: boolean;
  isCollect?: any;
  recommends?: any;
  userAddresses?: any;
  evaluationInfo?: any;
  categories: {
    id: string;
    name: string;
  }[];
  specs: Spec[];
  skus: Sku[];
  details: GoodsDetail;
};
// 城市类型
export type CityList = {
  areaList: CityList[];
  code: string;
  level: number;
  name: string;
};
