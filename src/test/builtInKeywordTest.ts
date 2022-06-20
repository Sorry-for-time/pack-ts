interface Foo {
  name: string;
  age: number;
}

type FooSelectable = Partial<Foo>;

type Qux<T> = {
  [p in keyof T]?: T[p];
};

interface QuxSelectable extends Qux<Foo> {
  fun: string;
}

const foo: QuxSelectable = {
  name: "Wayne",
  // age: 23, // 可选属性
  fun: "do something",
};
