/**
 * @description 消息订阅机制接口基本定义
 * @interface DispatchInf
 */
interface DispatchInf {
  /**
   * @description 绑定事件
   */
  on: (eventName: string, callBackFn: Function) => void;

  /**
   * @description 派发事件
   */
  emit: (eventName: string, ...params: Array<any>) => void;

  /**
   * @description 绑定一个临时事件(只执行一次)
   */
  once: (eventName: string, callBackFn: Function) => void;

  /**
   * @description 解绑事件
   */
  off: (eventName: string) => void;
}

/**
 * @description 一个简单的消息订阅发布机制实现类
 * @export
 * @class Dispatch
 * @implements { DispatchInf }
 * @version v0.01
 */
export class Dispatch implements DispatchInf {
  /**
   * @description 用于存储绑定的事件
   * @private
   * @type { MyList }
   * @memberof Dispatch
   */
  private eventsMap: Map<string, Function>;

  constructor() {
    this.eventsMap = new Map();
  }

  on(eventName: string, callBackFn: Function): void {
    // 已存在的情况不允许再次添加绑定
    if (this.eventsMap.has(eventName)) {
      console.warn(`the event --> [ ${eventName} ] already exists, please remove it before set new listener`);
    } else {
      this.eventsMap.set(eventName, callBackFn);
    }
  }

  emit(eventName: string, ...params: Array<any>): void {
    const event = this.eventsMap.get(eventName);
    // 判断是否存在相关的注册
    if (event) {
      event.apply(this, params);
    } else {
      console.warn(`the event --> [ ${eventName} ] doesn't exist in eventList, please check your code or report bug`);
    }
  }

  once(eventName: string, callBackFn: Function): void {
    // 将仅执行一次的事件进行简单包装
    const onceFn: Function = (...params: any) => {
      callBackFn.apply(this, params);
      this.off(eventName); // 在执行完成后立即解绑
    };
    this.on(eventName, onceFn); // 将回调添加到列表当中
  }

  off(eventName: string): void {
    if (this.eventsMap.has(eventName)) {
      // 删除属性
      const isSuccess: boolean = this.eventsMap.delete(eventName);
      if (!isSuccess) {
        console.warn(`the event --> ${eventName} delete fail`);
      }
    }
  }
}
