import { Dispatch } from "../core/dispatch";

export function executeDispatchTest(): void {
  // 简单测试
  const dispatcher: Dispatch = new Dispatch();
  // 绑定事件
  dispatcher.on("test", (...params: any) => {
    console.log(...params);
  });

  // 重复添加测试
  dispatcher.on("test", (...params: any) => {
    console.log(...params);
  });

  // 触发
  dispatcher.emit("test", "how are you today");
  dispatcher.emit("test", "how are you today");

  // 绑定一个仅执行一次的事件
  dispatcher.once("happy", (...params: any) => {
    console.log(...params);
  });

  dispatcher.emit("happy", "I have seen better");
  // 重复触发
  dispatcher.emit("happy", "I have seen better");

  // 解绑事件
  dispatcher.off("test");
  dispatcher.emit("test", 1, false, { name: "Wayne" });
}
