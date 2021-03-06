export function symbolTest(): void {
  // 允许传入一个符号描述符, 但是与符号定义或标识完全无关
  // 且符号是唯一, 不可变的
  let sym1: symbol = Symbol("23");
  let sym2: symbol = Symbol("23");
  console.log(sym1, typeof sym2); // Symbol(23) 'symbol'
  // 符号没有字面量语法
  console.log(sym1 == sym2, sym1 === sym2); // false, false
  // 符号不能使用 new 关键字, 避免创建符号包装对象, 区别于 Boolean 等
  let aNumObj: Number = new Number(233);
  console.log(aNumObj, typeof aNumObj); // Number {233} 'object'
  console.log(aNumObj.valueOf()); // 233
  console.log(Symbol.keyFor(sym1));

  // 在全局符号注册表中创建并重用符号, 第一次发现不存在的时候会创建一个新的符号实例并添加到注册表中
  let fooGlobalSymbol: symbol = Symbol.for("foo");
  console.log(fooGlobalSymbol); // Symbol(foo)
  // 后续使用相同的字符串调用同样会检查注册表, 发现存在与该字符串对应的符号, 那么会返回该符号实例
  let otherFooGlobalSymbol: symbol = Symbol.for("foo");
  console.log(otherFooGlobalSymbol); // symbol("foo")
  console.log(fooGlobalSymbol == otherFooGlobalSymbol); // true
  console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true
  let sym3: symbol = Symbol("foo");
  console.log(sym3 == fooGlobalSymbol); // false

  // 查询全局注册表
  console.log(Symbol.keyFor(fooGlobalSymbol)); // foo
  console.log(Symbol.keyFor(sym3)); // undefined
}

export function symbolTest2(): void {
  let s1: symbol = Symbol("qux"),
    s2: symbol = Symbol("bar"),
    s3: symbol = Symbol("qux"),
    s4: symbol = Symbol("www");

  const obj: any = {
    origin: "2333",
  };

  obj[s1] = "海边的卡夫卡";

  console.log(obj); // {origin: '2333', Symbol(qux): '海边的卡夫卡'}

  Object.defineProperty(obj, s2, {
    value: "a new day",
  });

  console.log(obj);
  // {origin: '2333', Symbol(qux): '海边的卡夫卡', Symbol(bar): 'a new day'}

  Object.defineProperties(obj, {
    [s3]: { value: "nobody" },
    [s4]: { value: "care" },
  });

  console.log(obj);
  // {origin: '2333', Symbol(qux): '海边的卡夫卡', Symbol(bar): 'a new day', Symbol(qux): 'nobody', Symbol(www): 'care'}

  // 返回对象实例的常规属性数组
  console.log(Object.getOwnPropertyNames(obj));
  // ['origin']

  // 返回对象实例的符号属性数组
  console.log(Object.getOwnPropertySymbols(obj));
  // 0: Symbol(qux)
  // 1: Symbol(bar)
  // 2: Symbol(qux)
  // 3: Symbol(www)

  // 返回对象实例当中的常规和符号属性数组
  console.log(Object.getOwnPropertyDescriptors(obj));
  // origin: {value: '2333', writable: true, enumerable: true, configurable: true}
  // Symbol(bar): {value: 'a new day', writable: false, enumerable: false, configurable: false}
  // Symbol(qux): {value: '海边的卡夫卡', writable: true, enumerable: true, configurable: true}
  // Symbol(qux): {value: 'nobody', writable: false, enumerable: false, configurable: false}
  // Symbol(www): {value: 'care', writable: false, enumerable: false, configurable: false}

  // 返回两种类型的键的数组
  console.log(Reflect.ownKeys(obj));
  // 0: "origin"
  // 1: Symbol(qux)
  // 2: Symbol(bar)
  // 3: Symbol(qux)
  // 4: Symbol(www)
}

/**
 * @description 内置符号基本了解
 * @description 所有内置符号属性都是不可写, 不可枚举吗不可配置的
 */
export function builtInSymbolTest(): void {
  /**
   * @description 一个书本上的简单示例
   */
  class Emitter {
    private max: number;
    private asyncIndex: number = 0;

    constructor(max: number) {
      this.max = max;
    }

    // 定义执行 for await (const x of xxx) 的行为
    // 隐式通过异步生成器函数返回
    async *[Symbol.asyncIterator]() {
      while (this.asyncIndex < this.max) {
        yield new Promise((resolve) => {
          resolve(this.asyncIndex++);
        });
      }
    }
  }

  async function emitterTest(): Promise<void> {
    const emitterInstance: Emitter = new Emitter(3);
    for await (const v of emitterInstance) {
      console.log(v);
    }
  }
  emitterTest(); // 0 1 2

  console.log(new Emitter(1) instanceof Emitter); // true
  console.log(Emitter[Symbol.hasInstance](new Emitter(12))); // true

  // Symbol.hasInstance 这个属性定义在 Function 的原型上,
  class EmitterSon extends Emitter {
    constructor(num: number) {
      super(num);
    }

    // 重写 hasInstance
    static [Symbol.hasInstance](_value: any) {
      // console.log("_value.__proto__ === EmitterSon.prototype", value.__proto__ === EmitterSon.prototype); // true
      return false;
    }
  }
  const b = new EmitterSon(12);
  console.log("b instanceof Emitter:", b instanceof Emitter); // true
  console.log("Emitter[Symbol.hasInstance](b): ", Emitter[Symbol.hasInstance](b)); // true
  console.log("-".repeat(23));
  console.log("b instanceof EmitterSon:", b instanceof EmitterSon); // false
  console.log("EmitterSon[Symbol.hasInstance](b)", EmitterSon[Symbol.hasInstance](b)); // false
  console.log("-".repeat(23));
}

/**
 * @description 迭代器基本定义
 */
export function testSymbolIterator(): void {
  class Foo {
    private max: number;
    constructor(max: number) {
      this.max = max;
    }

    *[Symbol.iterator]() {
      for (let i: number = 0; i < this.max; i++) {
        yield i;
      }
    }
  }

  const foo: Foo = new Foo(3);
  for (const v of foo) {
    console.log(v); // 0 1 2
  }
}

/**
 * @description 定义静态获取器(getter)方法, 覆盖新创建实例的原型定义
 */
export function symbolSpeciesTest(): void {
  class Bar extends Array {}

  class Baz extends Bar {
    // 重写 Baz 的原型定义
    static get [Symbol.species]() {
      return Array;
    }
  }

  let bar: Bar = new Bar();
  console.log(bar instanceof Array); // true
  console.log(bar instanceof Bar); // true
  bar = bar.concat("bar");
  console.log(bar);
  console.log("-".repeat(30));

  console.log(bar instanceof Array); // true
  console.log(bar instanceof Bar); // true
  console.log("-".repeat(30));

  let baz: Baz = new Baz();
  console.log(baz instanceof Array); // true
  console.log("-".repeat(30));

  console.log(baz instanceof Baz); // true
  baz = baz.concat("baz");
  console.log(baz instanceof Baz); // false
  console.log(baz instanceof Array); // true
  console.log("-".repeat(30));

  const obj = new Object({
    name: "Wayne",
    age: 23,
  });
  console.log(obj);
  // 判断对象实例身上是否存在某个属性
  console.log(obj.hasOwnProperty("name")); // true
}

export function loopRelativeTest(): void {
  const aSym = Symbol.for("aSym");

  const obj = {
    name: "Fox",
    age: 23,
    [aSym]: "LIVE FREE OR DIE",

    // 为 for of 提供
    *[Symbol.iterator]() {
      const keys: Array<string> = Object.getOwnPropertyNames(this);
      for (let i: number = 0; i < keys.length; ++i) {
        yield keys[i];
      }
    },
  };

  // for in 会枚举对象中非符号键属性
  // 推荐使用 const 确保局部变量不会被修改
  // ECMAScript 对象属性是无序的, 所以 for in 无法保证返回对象属性的顺序
  for (const v in obj) {
    console.log(v);
  }

  console.log("-".repeat(30));
  // for of 循环会参照可迭代对象的 next 方法产生值的顺序迭代元素
  for (const v of obj) {
    console.log(v);
  }
}
