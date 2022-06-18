import path from "path";
import ts from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";

// 判断当前环境是否为开发模式
const isDev = () => {
  return process.env.NODE_ENV === "development";
};

export default {
  // 入口配置
  input: "./src/main.ts",
  // 出口
  output: {
    file: path.resolve(__dirname, "./lib/index.js"),
    format: "umd",
    sourcemap: isDev() /* 映射文件 */,
  },

  // 插件
  plugins: [
    ts(),
    // 前端服务配置
    isDev() &&
      serve({
        open: true,
        port: 3033,
        openPage: "/public/index.html" /* 打开的页面 */,
      }),
    isDev() && livereload(), // 热更新
    terser({
      compress: {
        drop_console: !isDev(), // 在生产环境下删除 console.log 输出
      },
    }), // 代码压缩
    // 将 node 环境变量注入到浏览器环境下
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
