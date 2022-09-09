type ObjectPick<T extends object, K extends keyof T> = {
  [Prop in K]: T[Prop];
};

/**
 * @description 通过指定的描述符从源对象中拷贝返回一个包含描述符属性的的独立拷贝对象
 * @author [Shalling]
 * @date 2022-09-10 01:09:23
 * @export
 * @template O
 * @template K
 * @param {O} source 拷贝源对象
 * @param {Array<K>} descriptors 描述符数组
 * @returns {*}  {ObjectPick<O, K>}
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify} MDN 上的使用参考
 */
export function cloneDeepWithDescriptors<O extends object, K extends keyof O>(
  source: O,
  descriptors: Array<K>,
): ObjectPick<O, K> {
  const returnValue: Partial<O> = {};
  descriptors.forEach((descriptor) => {
    returnValue[descriptor] = source[descriptor];
  });

  return JSON.parse(JSON.stringify(returnValue));
}
