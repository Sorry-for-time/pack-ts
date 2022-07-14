import { formateLogOutput } from "./util/log-style";
import { styleEnum } from "./util/log-style";
import { basicDataTypeTest } from "../src/test/basicDataTypeTest";
// import { executeDispatchTest } from "./test/dispatchTest";
// import { proxyFactoryTest } from "./test/proxyTest";
// import { eventLoopTest } from "./test/eventLoopTest";
// import { sortFunctionTest } from "./test/sortFunctionTests";

formateLogOutput(["✨", `you are running on ${process.env.NODE_ENV} mode!`]);
formateLogOutput(["👋", `https://www.github.com/sorry-for-time`], [styleEnum.title, styleEnum.hint]);

// executeDispatchTest();
// proxyFactoryTest();
// eventLoopTest();
// sortFunctionTest();
basicDataTypeTest();
