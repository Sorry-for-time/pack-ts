class A {
  name: string = "AAA";
}

class B {
  age: number = 233;
}

/**
 * @description 混合实现类
 * @class C
 * @implements {A}
 * @implements {B}
 */
class C implements A, B {
  name: string = "CCC";
  age: number = 223;
}

/**
 * @description 将类进行混合的函数
 * @param {Function} targetClass 目标类
 * @param {Array<Function>} mixinClass 进行属性合并的类
 */
function mixin(targetClass: Function, mixinClass: Array<Function>): void {
  mixinClass.forEach((aClass) => {
    Object.getOwnPropertyNames(aClass.prototype).forEach((descriptor) => {
      targetClass.prototype[descriptor] = aClass.prototype[descriptor];
    });
  });
}

export function classMixinTest(): void {
  mixin(C, [A, B]);
  let cInstance = new C();
  console.log(cInstance.age);
  console.log(cInstance.name);
}
