export const debounce = (
  callback: (...any: unknown[]) => void,
  wait: number
) => {
  let timeoutId: undefined | number = undefined;
  return (...args: unknown[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
