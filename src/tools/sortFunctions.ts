/**
 * @detail 一个简单的冒泡排序
 * @param list Array<T>
 * @return {list} Array<T>
 * @detail 时间复杂度: O(n^2), 非破坏性更新
 */
export function bubbleSort<T>(list: Array<T>): Array<T> {
  for (let i: number = 0; i < list.length - 1; ++i) {
    for (let k: number = 0; k < list.length - 1; ++k) {
      // 后一个元素比前一个元素的小的情况下
      if (list[k] > list[k + 1]) {
        // 取得索引值
        const tmpIdx = k + 1;
        // 保持当前值
        const tmp: T = list[k];
        // 将后面较小的值移动到当前;
        list[k] = list[tmpIdx];
        // 前一个值移动到后面
        list[tmpIdx] = tmp;
      }
    }
  }
  return list;
}
