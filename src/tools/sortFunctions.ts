/**
 * @detail 一个简单的冒泡排序
 * @param list Array<T>
 * @return {list} Array<T>
 */
export function bubbleSort<T>(list: Array<T>): Array<T> {
  for (let i: number = 0; i < list.length - 1; ++i) {
    for (let k: number = 0; k < list.length - 1; ++k) {
      if (list[k] > list[k + 1]) {
        const tmpIdx = k + 1;
        const tmp: T = list[k];
        list[k] = list[tmpIdx];
        list[tmpIdx] = tmp;
      }
    }
  }
  return list;
}

