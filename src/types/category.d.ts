// 一级分类详情
export type TopCategory = {
  id: string;
  name: string;
  picture: null;
  children: SubCategory[];
};
export type SubCategory = {
  brands: null;
  categories: null;
  goods: any;
  id: string;
  name: string;
  parentId: null;
  parentName: null;
  picture: string;
  saleProperties: null;
};
