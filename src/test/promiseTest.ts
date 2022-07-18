// simple review Promise built in apis

/**
 * 基本认知: 浏览器本身是多线程和多进程的(确信, 比如 chrome 的每一个标签页都是单独的进程)
 * 包含了 GUI 渲染线程: 渲染和解析页面
 * JS 引擎(比如 google v8)线程: 渲染和解析 js (浏览器只会分配一个线程去解析线程, 所以说 js 是单线程)
 * 定时器监听线程
 * 事件监听线程
 * http 网络请求线程, 特点: 同源下浏览器最多同时分配 5-7 个 http 线程(有并发限制)
 * worker 线程
 * JS 是单线程运行的, 所以大部分代码是同步的, 例如基本循环
 * ...
 */

/**
 * [异步微任务]:
 * requestAnimationFrame(存在争议)
 * Promise.then/catch/finally
 * async/await
 * queueMicroTask 手动创建一个异步微任务
 * MutationObserver
 * IntersectionObserver
 */

/**
 * [异步宏任务]
 * 定时器(settimeout, ...)
 * script 标签
 * 事件绑定/事件队列
 * 网络请求(ajax, fetch...)
 * MessageChannel(消息队列)
 */

/**
 * JavaScript 的异步操作是借用浏览器的多线程机制, 再基于 EventLoop 事件循环机制, 实现单线程的异步效果
 * 对于定时器, 即使设置执行回调的时间为 0, 也无法立即执行, 因为存在精度上的限制
 * 打开页面后浏览器会创建的线程
 * 执行环境[主线程]: 自上而下解析执行
 *
 * WebAPI: 任务监听队列, 监听异步的对垒是否可执行了
 * 1: 同步代码执行过程当中如果遇到异步任务, 将其放到队列中进行监听
 * 2: 将其放到 EventQueue 中进行排队等待
 *
 * EventQueue: 事件/任务队列, 所有可执行的异步任务需要在这里排队执行
 * 3: 在同步代码执行完后, 会从事件队列当中取出可执行的异步任务放入栈中去执行,
 *  - 分为异步微任务和异步宏任务
 * 4: 会先执行
 */

export function promiseTest(): void {
  // 异步的微任务优先级比较高, 不论其中的任务是先放入的还是后放入的, 只要有可执行的异步微任务永远先执行它
  // asyncMarcoAndMicroTaskCompare1();
  // is Promise
  // resolve value
  // is setTimeout
  // asyncMarcoAndMicroTaskCompare2();
  // 2
  // 4
  // v.length 200000
  // 5
  // 7
  // 9
  // try set zero // 待定, 取决于同步代码中那耗时操作所消耗的时间
  // 3 // 待定, 取决于同步代码中那耗时操作所消耗的时间
  // 1 // 待定, 取决于同步代码中那耗时操作所消耗的时间
  // 6 // 待定, 取决于同步代码中那耗时操作所消耗的时间, 但会在 try set zero 之后
  // 8 会在 try set zero 之后, 在 6 之后

  // asyncMarcoAndMicroTaskCompare3();
  // script start
  // async1 start
  // async2
  // Promise1
  // script end
  // async1 end
  // Promise2
  // setTimeout
}

export function promiseBasicReview(): void {

}

// 一个没有感情的例子
function asyncMarcoAndMicroTaskCompare1(): void {
  setTimeout(() => {
    console.log("is setTimeout");
  }, 0);

  new Promise((resolve) => {
    console.log("is Promise");
    resolve("resolve value");
  }).then((res: unknown) => {
    console.log(res);
  });
}

function asyncMarcoAndMicroTaskCompare2(): void {
  setTimeout(() => {
    console.log(1);
  }, 20); // 第一个添加到监听队列
  console.log(2);

  setTimeout(() => {
    console.log(3);
  }, 10); // 第二个添加到监听队列, 但是为第一个进行输出的异步宏任务(原因如下)

  console.log(4);

  {
    // 设置耗时操作
    const v: Array<Object> = [];
    for (let i = 1; i <= 200000; i++) {
      v.push(new Object({ idx: i }));
    }
    console.log("v.length: ", v.length);
    // 在耗时代码执行完成后, 第二个添加到监听队列的宏任务已经达到时间(假设), 被添加到宏任务队列队首等待所有同步代码执行完成, 主线程空闲后再添加到栈中去执行
  }

  console.log(5);

  setTimeout(() => {
    console.log(6);
  }, 8); // 第一个进行输出的异步宏任务

  setTimeout(() => {
    console.log("try set zero");
  }, 0);

  console.log(7);

  setTimeout(() => {
    console.log(8);
  }, 15);

  console.log(9);
}

function asyncMarcoAndMicroTaskCompare3(): void {
  async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }

  async function async2() {
    console.log("async2");
  }

  console.log("script start");

  setTimeout(() => {
    console.log("setTimeout");
  }, 0);

  async1();

  new Promise((resolve) => {
    console.log("Promise1");
    resolve(23);
  }).then((_value) => {
    console.log("Promise2");
  });

  console.log("script end");
}
