export function debounce(func: Function, time = 300) {
  let timer: string | number | NodeJS.Timeout | undefined;

  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, time);
  };
}
