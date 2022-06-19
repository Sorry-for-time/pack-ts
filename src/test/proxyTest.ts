import { proxyFactory } from "../core/proxyFactory";

type Person = {
  name: string;
  age: number;
};

/**
 * @description 工厂代理类测试用例
 * @export
 */
export function proxyFactoryTest(): void {
  const man: Person = proxyFactory.getProxy({
    name: "Wayne",
    age: 13,
  });

  console.log(man.name);
  console.log(man.age);
  console.log("=".repeat(23), "split line", "=".repeat(23));

  man.name = "Bruce";
  man.age = 23;
  console.log(man.name);
  console.log(man.age);

  const t = Reflect.get(proxyFactory, "saySomething");
  t && t();
}
