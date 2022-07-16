export function referenceValueTest(): void {
  let s1: string = "string";
  let s2: string = "string";
  console.log(s1 == s2); // true
  console.log(s1 === s2); // true

  let s3: String = new String("string"); // 包装对象
  console.log("-".repeat(30));

  console.log(s1 == s3); // true, 进行转化后的字面量比较
  console.log(s1 === s3); // false, 严格比较
  console.log(typeof s1, typeof s3); // string object

  // basic review
  try {
    throw new Error("just a simple test");
  } catch {
    console.warn("%coh no", "background: yellow; color: black");
  } finally {
    console.log("%c====finally====", "background: green; color: black");
  }
}
