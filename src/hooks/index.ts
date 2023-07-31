import {useIntersectionObserver} from "@vueuse/core";
import {ref} from "vue";

/**
 * 异步加载数据
 * @param fn 需要异步加载的逻辑
 */
export function useSyncRequest(fn: () => void) {
  const target = ref(null);
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      fn();
      stop();
    }
  });
  return target;
}
