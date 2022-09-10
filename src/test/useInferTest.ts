/**
 * @description 定义一个类型, 如果是数组类型, 就返回数组元素类型, 否则就传入什么类型就返回什么类型
 */
// type Tp<T> = T extends Array<any> ? T[number] : T;
type Tp<T> = T extends Array<infer U> ? U : T; // 这里的 U 不是泛型, 只是充当占位符, 读取 Array 里的类型

// A: number | undefined | string
type A = Tp<Array<number | undefined | string>>;

// B: string
type B = Tp<Array<string>>;

// C: number | undefined | string | null
type C = Tp<A | null>;

// string | number
type D = Tp<[number, string]>;

type Arr = ["a", "b", "c", "d"];

// 取得数组首元素
type First<T extends Array<any>> = T extends [infer one, ...Array<any>] ? one : [];
// 取得数组尾元素
type Last<T extends Array<any>> = T extends [...Array<any>, infer last] ? last : [];
// 去除首元素
type Shift<T extends Array<any>> = T extends [infer first, ...infer Leaves] ? Leaves : [];
// 去除尾元素
type Pop<T extends Array<any>> = T extends [...infer leaves, infer last] ? leaves : [];

// 数组翻转
type Reverse<T extends Array<any>> = T extends [infer first, ...infer leaves] ? [...Reverse<leaves>, first] : T;

// "a"
type TestFirst = First<Arr>;

// "d"
type TestLast = Last<Arr>;

// ["b", "c", "d"]
type testShift = Shift<Arr>;

// ["a", "b", "c"]
type testPop = Pop<Arr>;

// ["d", "c", "b", "a"]
type testReverse = Reverse<Arr>;
