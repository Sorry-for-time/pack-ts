/**
 * @description keyof 关键字的使用回顾
 * @template T
 * @param {T} target
 * @param {keyof T} descriptor
 * @return {*}  {{ descriptor: T[keyof T] }}
 */
function outputObjValue<T extends object>(target: T, descriptor: keyof T): { descriptor: T[keyof T] } {
  return {
    descriptor: target[descriptor],
  };
}

export function keyofTest(): void {
  const tmp = {
    name: "Smith",
    age: 23,
  };

  console.log(outputObjValue(tmp, "name"));
  console.log(outputObjValue(tmp, "age"));
  //   console.log(outputObjValue(tmp, "none")); // 不允许, 语法检查不通过
}
