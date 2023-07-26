import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

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
