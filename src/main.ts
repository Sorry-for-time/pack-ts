import { formateLogOutput } from "./util/log-style";
import { styleEnum } from "./util/log-style";
// import { basicDataTypeTest } from "../src/test/basicDataTypeTest";
// import { executeDispatchTest } from "./test/dispatchTest";
// import { proxyFactoryTest } from "./test/proxyTest";
// import { eventLoopTest } from "./test/eventLoopTest";
// import { sortFunctionTest } from "./test/sortFunctionTests";
// import { stringTemplateTest } from "./test/stringTemplateTest";
// import {
//   symbolTest,
//   symbolTest2,
//   builtInSymbolTest,
//   testSymbolIterator,
//   symbolSpeciesTest,
//   loopRelativeTest,
// } from "./test/symbolTest";
// import { referenceValueTest } from "./test/referenceValueTest";
// import { arrayFunctionTest } from "./test/arrayFunctionTest";
// import { promiseTest, promiseBasicReview1, promiseBasicReview2 } from "./test/promiseTest";
// import { unionTypeTest } from "./test/unionTypeTest";
import { basicGrammarTest } from "./test/basicGrammar";

window.addEventListener("load", () => {
  const app: HTMLElement | null = document.getElementById("app");
  if (app) {
    app.removeAttribute("data-cloak");
  }
});

formateLogOutput(["✨", `you are running on ${process.env.NODE_ENV} mode!`]);
formateLogOutput(["👋", `https://www.github.com/sorry-for-time`], [styleEnum.title, styleEnum.hint]);

// executeDispatchTest();
// proxyFactoryTest();
// eventLoopTest();
// sortFunctionTest();
// basicDataTypeTest();
// stringTemplateTest();
// symbolTest()
// symbolTest2();
// builtInSymbolTest();
// testSymbolIterator();
// symbolSpeciesTest();
// loopRelativeTest();
// referenceValueTest();
// arrayFunctionTest();
// promiseTest();
// promiseBasicReview1();
// promiseBasicReview2();
// unionTypeTest();
basicGrammarTest();
