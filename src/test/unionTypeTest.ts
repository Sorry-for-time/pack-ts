interface Animal {
  sex: "0" | "1" | "2";
}

interface Fox {
  color: "gray" | "orange";
  name: string;
}

/**
 * @description 测试用例
 * @param {(Animal & Fox)} param 交叉参数
 */
function justRun(param: Animal & Fox): void {
  console.log(param);
}

/**
 * @description 交叉类型测试
 * @export
 */
export function unionTypeTest(): void {
  justRun({ color: "orange", name: "Devil", sex: "0" });
}
