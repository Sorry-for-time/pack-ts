/**
 * @description 简单的测试 demo
 * @class Demo
 */
class Demo {
  private _name: string;
  private _age: number;
  public readonly sex: 0 | 1;

  constructor(name: string, age: number, sex: 0 | 1) {
    this._name = name;
    this._age = age;
    this.sex = sex;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    this._age = value;
  }
}

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

/**
 * @description keyof 简单回顾测试用例
 * @export
 */
export function keyofTest(): void {
  const tmp = new Demo("Wayne", 23, 1);
  console.log(outputObjValue(tmp, "name"));
  console.log(outputObjValue(tmp, "age"));
  console.log(outputObjValue(tmp, "sex"));
  // console.log(outputObjValue(tmp, "nothing")); // 语法检测不通过, 不存在 "nothing" 这个 key
}
