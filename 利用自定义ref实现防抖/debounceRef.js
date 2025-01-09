function debounceRef(value, delay = 1000) {
  let timer = null;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          trigger();
          value = newValue;
        }, delay);
      },
    };
  });
}
