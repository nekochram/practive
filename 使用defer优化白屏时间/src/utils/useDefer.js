import { onUnmounted, ref } from "vue";

export const useDefer = (maxCount) => {
  const count = ref(0);
  let reqId = null;
  const updateCount = () => {
    count.value++;
    if (maxCount && count.value >= maxCount) {
      return;
    }
    reqId = requestAnimationFrame(updateCount);
  };
  updateCount();
  onUnmounted(() => {
    cancelAnimationFrame(reqId);
  });
  return (num) => {
    return count.value >= num;
  };
};
