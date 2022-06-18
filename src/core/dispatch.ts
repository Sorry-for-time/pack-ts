interface DispatchInf {
  on: (name: string, callBack: Function) => void /* 绑定事件 */;
  emit: (name: string, ...params: Array<any>) => void /* 触发事件 */;
  once: (name: string, callBack: Function) => void /* 只执行一次事件 */;
  off: (name: string) => void /* 时间解绑 */;
}

type MyList = {
  [key: string]: Function;
};

export class Dispatch implements DispatchInf {
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
