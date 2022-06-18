interface DispatchInf {
  /**
   * @description 绑定事件
   */
  on: (name: string, callBack: Function) => void;

  /**
   * @description 派发事件
   */
  emit: (name: string, ...params: Array<any>) => void;

  /**
   * @description 绑定一个临时事件(只执行一次)
   */
  once: (name: string, callBack: Function) => void;

  /**
   * @description 解绑事件
   */
  off: (name: string) => void;
}

type MyList = {
  [key: string]: Function;
};

/**
 * @description 一个简单的消息订阅发布机制实现类
 * @export
 * @class Dispatch
 * @implements {DispatchInf}
 * @version v0.01
 */
export class Dispatch implements DispatchInf {
  /**
   * @description 用于存储绑定的事件
   * @private
   * @type {MyList}
   * @memberof Dispatch
   */
  private eventList: MyList;

  constructor() {
    this.eventList = {};
  }

  on(name: string, callBack: Function): void {
    if (this.eventList[name]) {
      console.warn(`the event --> [ ${name} ] already exists, pleas remove it before set new listener`);
    } else {
      this.eventList[name] = callBack;
    }
  }

  emit(name: string, ...params: Array<any>): void {
    const event = this.eventList[name];
    if (event) {
      event.apply(this, params);
    } else {
      console.warn(`the event --> [ ${name} ] doesn't exist in eventList, please check your code or report bug`);
    }
  }

  once(name: string, callBack: Function): void {
    // 将仅执行一次的事件进行简单包装
    const tmpFn: Function = (...params: any) => {
      callBack.apply(this, params);
      // 在执行完成后立即解绑
      this.off(name);
    };
    // 将回调添加到列表当中
    this.on(name, tmpFn);
  }

  off(name: string): void {
    if (this.eventList[name]) {
      // 删除属性
      delete this.eventList[name];
    }
  }
}
