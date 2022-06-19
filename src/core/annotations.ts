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
