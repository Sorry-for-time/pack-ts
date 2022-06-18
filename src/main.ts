import { formateLogOutput } from "./util/log-style";
import { styleEnum } from "./util/log-style";

formateLogOutput(["✨", `you are running on ${process.env.NODE_ENV} mode!`]);
formateLogOutput(["👋", `https://www.github.com/sorry-for-time`], [styleEnum.title, styleEnum.hint]);
