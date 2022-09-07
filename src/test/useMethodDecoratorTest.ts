import { useDebounce } from "../core/annotations";

class TestClass {
  public name: string = "Wayne";

  /**
   * @description 随便打印些什么
   * @memberof TestClass
   */
  @useDebounce(300, true)
  sayName(): void {
    console.log("只因太没");
  }

  @useDebounce()
  public static justLog() {
    console.log("2333");
  }
}

/**
 * @description 防抖注解简单测试
 * @export
 */
export function useMethodDecoratorTest(): void {
  const testInstance = new TestClass();
  const header: HTMLElement | null = document.querySelector("header");
  header && header.addEventListener("click", testInstance.sayName);
  console.log(TestClass.prototype);
}
