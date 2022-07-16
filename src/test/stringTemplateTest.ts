export function stringTemplateTest(): void {
  /**
   * @description 设置模板字符串标签函数, 通过前缀到模板字面量, 收到参数依次是原始字符串数组和对每个表达式求(${expression})值的结果
   * @description 通过设置表达可以自定义模板字符串插值行为
   * @description 要求必须返回一个类型为 string 的结果
   * @returns {string}
   */
  function simpleTag1(strings: any, aValExpression: any, bValExpression: any, sumExpression: any): string {
    console.log(strings); // 原始字符串数组
    console.log(aValExpression, bValExpression, sumExpression);
    return "foobar";
  }

  let a = 6,
    b = 9;
  let taggedResult: string = simpleTag1`${a}+${b} = ${a + b}`;
  // ['', '+', ' = ', '', raw: Array(4)] 原始字符串数组
  // 6, 9, 15 每个表达式的结果
  console.log(taggedResult); // foobar

  function simpleTag2(strings: any, ...expressions: Array<any>): string {
    console.log(strings);
    for (const current of expressions) {
      console.log(current);
    }
    return "foobar";
  }
  let taggedResult2: string = simpleTag2`${"我很好, 谢谢"}, ${233}, ${"line"}`; //
  // (4) ['', ', ', ', ', '', raw: Array(4)] (第一个参数的字符串个数永远是 n+1)
  // 我很好, 谢谢
  // 233
  // line
  console.log(taggedResult2);

  function zipTag(strings: any, ...expressions: Array<any>): string {
    console.log(strings);
    return (
      strings[0] +
      expressions
        .map((e, i) => {
          return `${e}${strings[i + 1]}`;
        })
        .join("")
    );
  }
  let taggedResult3 = zipTag`${a}+${b}=${a + b}`; // (4) ['', '+', '=', '', raw: Array(4)]
  console.log(taggedResult3); // 6+9=15

  // 可以使用 String.raw 函数来获取模板的原始字面量内容
  console.log(String.raw`\n`); // \n
  console.log(String.raw`hello
world`);
  // hello
  // world

  function printRaw(strings: any): void {
    // 对于模板字符串的第一个参数永远是 原始字符串数组
    // 可以通过字符串的 .raw 属性来取得每个字符串的原始内容
    console.log(strings.raw); // ['\\t\\u00A9']
    for (const v of strings.raw) {
      console.log(v);
    }
  }
  console.log(`\t\u00A9`); //   ©
  printRaw`\t\u00A9`; // \t\u00A9
}
