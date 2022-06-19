/**
 * @description 一个简单的代理工厂实现类
 * @export
 * @abstract
 * @class proxyFactory
 */
export abstract class proxyFactory {
  static getProxy<T>(target: any): T {
    return new Proxy(target, {
      get(target, propKey, receiver) {
        return Reflect.get(target, propKey, receiver);
      },
      set(target, propKey, value, receiver): boolean {
        return Reflect.set(target, propKey, value, receiver);
      },
    });
  }
}
