export function arrayFunctionTest(): void {
  // 通过构造器初始化一个长度为 20 的数组
  const arr1: Array<any> = new Array(20);
  // 如果存入的是非数值, 那么会将其保存到数组当中
  const arr2: Array<any> = new Array("233", "Shalling");
  // const arr3 = Array(3.1); // 传入单个数值的话不允许为小数, 否则会认为是创建的初始容量
  // 允许省略 new 操作符
  const arr3 = Array(11.2, 12.1);
  // 使用对象字面量的形式直接创建
  const arr4: Array<any> = [12, 12];

  console.log(arr1.length); // 20
  console.log(arr2.length); // 2
  console.log(arr3.length); // 2
  console.log(arr4.length); // 2
  console.log(typeof arr1, typeof arr2, typeof arr3); // object object object
  console.log(typeof arr4); // object
}
