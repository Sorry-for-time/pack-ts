import { bubbleSort } from "../tools/sortFunctions";

export function sortFunctionTest(): void {
  const arr: Array<number> = [11, 313, 21, -12, 131, 11, 11, 13131, 43523];
  bubbleSort<number>(arr);
  console.log(arr.reverse());
  // reverse 会就地改变数组
  console.log(arr);
}
