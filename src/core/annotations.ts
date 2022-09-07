import { debounce } from "src/util/performance";

interface InjectFn {
  name: string;
  callBack: Function;
}

/**
 * @description 为类注入额外方法
 * @param fns
 * @returns
 */
export function inject(...fns: Array<InjectFn>): ClassDecorator {
  return (target: Function) => {
    fns.forEach((item) => {
      console.log("===>", item);
      Reflect.set(target, item.name, item.callBack);
    });
  };
}

/**
 * @description 方法防抖节流装饰器
 * @export
 * @param {number} [delay=300] 防抖间隔延迟
 * @param {boolean} [startImmediate=true] 第一次使用函数时是否立即执行, 无需等待
 * @return {*}  {MethodDecorator}
 */
export function useDebounce(delay: number = 300, startImmediate: boolean = true): MethodDecorator {
  return (_target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    console.log(`%cbefore use method decorator ${descriptor.value}`, "color: cyan");
    descriptor.value = debounce(descriptor.value, delay, startImmediate);
    console.log(`%cafter use method decorator ===>" ${descriptor.value}`, "color: yellow");
  };
}
