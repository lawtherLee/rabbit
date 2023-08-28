export type CartItem = {
  attrsText: string;
  count: number;
  discount?: null;
  id: string;
  isCollect?: boolean;
  isEffective: boolean;
  name: string;
  nowOriginalPrice?: string;
  picture: string;
  postFee?: number;
  price: number;
  selected: boolean;
  skuId: string;
  specs?: string[];
  stock: number;
  nowPrice: number;
};
