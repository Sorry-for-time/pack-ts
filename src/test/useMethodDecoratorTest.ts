import { useDebounce, useGlobalErrorHandler, useThrottle } from "../core/annotations";

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
  @useGlobalErrorHandler()
  public static justLog() {
    console.log("2333");
    throw new Error("这里只是没有明确意义的随便抛出错误, 好让装饰器捕获");
  }

  @useThrottle(1000)
  @useGlobalErrorHandler()
  public clickNav(): void {
    console.log("这里只是没有明确意义的 Log");
  }
}

/**
 * @description 防抖注解简单测试
 * @export
 */
export function useMethodDecoratorTest(): void {
  const testInstance = new TestClass();

  const header: HTMLElement | null = document.querySelector("header");
  const nav: HTMLElement | null = document.querySelector("nav");

  header && header.addEventListener("click", testInstance.sayName);
  nav && nav.addEventListener("click", testInstance.clickNav);

  console.log(TestClass.prototype);
}
