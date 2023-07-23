import category from "@/store/modules/category.ts";
import home from "@/store/modules/home.ts";

export default function useStore() {
  return {
    categoryStore: category(),
    homeStore: home(),
  };
}
