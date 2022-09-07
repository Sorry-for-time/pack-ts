/**
 * @description
 * @export
 * @param {Function} executorFn 进行节流的函数
 * @param {number} [delay=300] 防抖延迟
 * @param {boolean} [startImmediate=true] 第一遍执行是否立即生效
 * @param {...Array<any>} args 函数参数
 * @return {*}  {() => void}
 */
export function debounce(
  executorFn: Function,
  delay: number = 300,
  startImmediate: boolean = true,
  ...args: Array<any>
): () => void {
  let timer: number | undefined;
  return (): void => {
    if (startImmediate) {
      timer = window.setTimeout(executorFn, 0, ...args);
      startImmediate = false;
    } else {
      if (timer) {
        clearInterval(timer);
      }
      timer = window.setTimeout(executorFn, delay, ...args);
    }
  };
}
