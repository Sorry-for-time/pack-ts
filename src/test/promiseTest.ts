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

/**
 * @notes
 * es6 新增了期约(promise)引用数据类型
 * javascript模型为单线程时间循环模型
 * 异步行为类似系统中断, 即当前线程外部的实体可以触发代码执行
 * es6 的 Promise 规范接受了 CommonJs 的 Promises/A+ 规范
 * 期约默认包含三种状态: pending(初始状态), fulfilled, rejected
 * 状态只要从待定变为兑现或者失败, 就不可再改变, 且期约的状态为私有, 不允许外部修改
 * 执行器函数是同步执行的(执行器函数是期约的初始化函数)
 *
 * 拒绝期约的的错误并没有抛到执行的同步代码里, 而是通过浏览器的异步消息队列来处理的
 * 所以代码一旦开始以异步模式执行, 那么与之交互的方式就是使用异步结构(期约的方法)
 */
export function promiseBasicReview1(): void {
  // console.log(oldAsyncExample());
  // 实例化一个空的 Promise 实例对象(要求至少传递一个空的执行器函数)
  const aPromise: Promise<unknown> = new Promise(() => {});
  console.log(aPromise); // Promise {<pending>}
  // 通过调用静态方法可以实例化一个解决的期约
  const secondPromise: Promise<string> = Promise.resolve("second");
  console.log(secondPromise); // Promise {<fulfilled>: 'second'}

  // 链式调用
  secondPromise
    .then(
      // onfulfilled
      (res: string): string => {
        console.log(res);
        return res.toUpperCase();
      },
      // onrejected
      (err: any): void => {
        console.warn(err);
      }
    )
    .then((res: string | void): void => {
      console.log(res);
    })
    .catch((err: unknown): void => {
      console.log(err);
    })
    .finally((): void => {
      console.log("everything will leave");
    });
  // second
  // SECOND
  // everything will leave

  // 对于静态方法而言, 如果传入的参数本身是一个期约, 那它的行为就类似一个空包装, 因此可以说 Promise.resolve 是一个幂等方法
  const p: Promise<() => void> = new Promise(() => {});
  setTimeout(console.log, 300, p === Promise.resolve(p)); // true
  console.log(p); // Promise {<pending>}

  // Promise.reject() 方法会实例化一个拒绝的期约并抛出一个异步的错误(这个错误不能通过 try/catch 捕获)
  const p1 = Promise.reject("is why?");
  p1.then(null, (reason) => {
    console.log("onrejected:", reason);
  }); // onrejected: is why?
  console.log(p1); // Promise {<rejected>: 'is why?'}
}

/**
 * @notes
 * 在 ecmascript 暴露的结构当中, 任何对象都有一个 then 方法[实现 Thenable 接口]
 * then 方法最多接收两个参数(且都为可选)
 */
export function promiseBasicReview2(): void {
  console.log(Promise.prototype);
  type TestV = {
    value: string;
    cost: number;
  };

  // .then 方法会返回一个新的期约实例
  const aPromise: Promise<void> = new Promise((resolve: (value: TestV) => void, _reject) => {
    const start: number = Date.now();
    setTimeout(() => {
      const res: TestV = {
        value: "distinguish is evil",
        cost: Date.now() - start,
      };
      resolve(res);
    }, 3000);
  }).then(
    (onResolved: TestV): void => {
      console.log(onResolved.value);
      console.log((onResolved as TestV).cost);
    },
    (onRejected: any): void => {
      console.warn(onRejected);
    }
  );

  // distinguish is evil
  // promiseTest.ts:165 3015
  console.log(aPromise); // Promise {<pending>}
  setTimeout((): void => {
    console.log(aPromise);
  }, 4000); // Promise {<fulfilled>: undefined}
}

// 以前进行异步操作的一个简单栗子
function oldAsyncExample(): number {
  return window.setTimeout(() => {
    try {
      console.log(2 * 2);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(`%c${"-".repeat(12)} everything will done ${"-".repeat(12)}`, "background: #ccc; color: black");
    }
  });
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
