import request from "@/utils/request.ts";

/**
 * 获取商品热销榜
 * @param id 商品id
 * @param limit 数量限制
 * @param type 榜单类型
 */
export function getHotAPI(id: string, limit: number, type: number) {
  return request.get("/goods/hot", {
    params: {
      id,
      limit,
      type,
    },
  });
}
