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

/**
 * @description 简单的节流函数
 * @author [Shalling]
 * @date 2022-09-12 09:09:15
 * @export
 * @param {Function} executorFn 执行节流的函数
 * @param {number} [delay=200] 间隔执行延迟
 * @param {boolean} [startImmediate=true] 第一个函数是否立即执行
 * @param {...Array<any>} args 函数的参数
 * @returns {*}
 */
export function throttle(
  executorFn: Function,
  delay: number = 200,
  startImmediate: boolean = true,
  ...args: Array<any>
): () => void {
  /**
   * @description 用于判定是否进行节流的锁
   */
  let locker: boolean = false;
  return (): void => {
    // 第一次调用函数立即执行的情况
    if (startImmediate) {
      locker = true;
      executorFn(...args);
      // 切换状态
      startImmediate = false;
      locker = false;
    }
    // 第一次执行不等待定时器延迟
    else {
      if (!locker) {
        locker = true;
        setTimeout((): void => {
          executorFn(...args);
          locker = false;
        }, delay);
      } else {
        return;
      }
    }
  };
}
