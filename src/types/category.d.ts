// 一级分类详情
import { GoodsType } from "@/types/data";

export type CaleProp = {
  id: string;
  name: string;
};
export type Cale = {
  id: string;
  name: string;
  properties: CaleProp[];
};
export type TopCategory = {
  id: string;
  name: string;
  picture: null;
  children: SubCategory[];
};
export type SubCategory = {
  brands: null;
  categories: null;
  goods: GoodsType[];
  id: string;
  name: string;
  parentId: null;
  parentName: null;
  picture: string;
  saleProperties: Cale[];
};
