import { type } from "os";

type ObjType = {
  name: string;
  salary: number;
  testFn: Function;
  symbolTest: symbol;
};

/**
 * @references <<JavaScript 高级程序设计>> 第四版
 * @description 回顾一下 js 的数据类型(章节起始页: P30)
 */
export function basicDataTypeTest(): void {
  let name: string = "this is a string";
  let testFn: Function = (): void => {};
  let salary: number = 5000;
  let symbolTest = Symbol("What");
  let obj: Partial<ObjType> = {
    name,
    salary,
    testFn,
    symbolTest,
  };
  let un; // 不要去显示指定赋值 undefined, undefined 主要是为了区别空引用(null)
  let aNull = null; // null, 因为特殊值 null 被认为是对一个空对象的引用

  class Foo {} // es6 的 class 实际上是基于原型链的语法糖

  // typeof 操作符(明确说明了他不是一个函数)用于确定数据类型, 并返回对应的类型说明字符串
  console.log(typeof name); // string
  console.log(typeof testFn); // function
  console.log(typeof salary); // number
  console.log(typeof symbolTest); // symbol, es6 新增
  console.log(typeof obj); // object
  console.log(typeof un); // undefined
  console.log(typeof undefined); // undefined
  console.log("-".repeat(30));

  console.log(typeof aNull); // object
  console.log(typeof Math); // object
  console.log("-".repeat(30));

  console.log(typeof Number); // function
  console.log(typeof Boolean); // function
  console.log(typeof String); // function
  console.log(typeof Object); // function
  console.log(typeof Foo); // function
  console.log(typeof obj.symbolTest); // symbol
  console.log(undefined == null); // true, 字面量比较
  console.log(undefined === null); // false, 严格比较
}
