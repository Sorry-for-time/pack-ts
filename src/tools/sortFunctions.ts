/**
 * @detail 一个简单的冒泡排序
 * @brief 相邻的两个元素进行比较
 * @param list Array<T>
 * @return {list} Array<T>
 * @detail 时间复杂度: O(n^2), 稳定
 */
export function bubbleSort<T>(list: Array<T>): Array<T> {
  // 需要循环 n - 1 趟
  for (let i: number = 1; i < list.length - 1; ++i) {
    // 每次比较都将最大的元素进行沉底
    for (let k: number = 0; k < list.length - i - 1; ++k) {
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
