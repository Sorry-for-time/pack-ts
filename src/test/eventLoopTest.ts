// 尝试去理解事件循环机制(Event Loop)
//
// @see

/**
 * @description 尝试理解性的去理解(没毛病)事件循环机制
 * @reference https://www.bilibili.com/video/BV1dS4y1y7vd?p=50&vd_source=7313597670b28c3c44c50e326d82d040
 * @reference https://zhuanlan.zhihu.com/p/362848320
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop
 * @detail 在被外部调用时相当于一整个宏任务
 */
export function eventLoopTest(): void {
  /**
   * 在主进程执执行栈之外, 还存在一个异步任务队列
   * 异步队列里的两种主要异步任务:
   * 宏任务: script(整体代码块), setTimeout 定时器, Ajax 等
   * 微任务: Promise 链等
   *
   * 运行机制:
   * 1.异步队列当中先执行宏任务, == 然后清空当前宏任务中所有的微任务再进行下一个 tick(姑且称为钩子), 如此进行一个循环, 直到结束 ==
   *    - 有可执行的微任务 -->  执行所有微任务 --> 开始新的为宏任务 --> ...
   *    - 无可执行的微任务 -->  执行洗一个宏任务 --> ...
   * 2.在事件循环期间的某个时刻，运行时会从最先进入队列的消息开始处理队列中的消息
   * 3.被处理的消息会被移出队列，并作为输入参数来调用与之关联的函数,调用一个函数总是会为其创造一个新的栈帧
   */

  async function Prom(): Promise<any> {
    console.log("Y"); // 一段同步代码, 在调用时被第一个输出
    // 底下可以理解为 .then 调用(微任务)
    await Promise.resolve();
    console.log("X");
  }

  // 第二个宏任务
  setTimeout(() => {
    console.log(1);
    Promise.resolve().then(() => {
      console.log(2);
    });
  }, 0);

  setTimeout(() => {
    console.log(3);
    Promise.resolve().then(() => {
      console.log(4);
    });
  }, 0);

  // =========================================

  // 添加到微任务里
  Promise.resolve().then(() => {
    console.log(5);
  });

  Promise.resolve().then(() => {
    console.log(6);
  });

  Promise.resolve().then(() => {
    console.log(7);
  });

  Promise.resolve().then(() => {
    console.log(8);
  });

  Prom(); /* 添加到主进程栈中 */
  console.log(0); // 第二个执行的同步任务
}

// Y 0 5 6 7 8 X 1 2 3 4
