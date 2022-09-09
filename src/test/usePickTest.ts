import { cloneDeepWithDescriptors } from "../util/deepCloneObjByDescriptors";

interface Human {
  name: string;
  age: number;
  sex: "0" | "1" | "unKnow";
  country?: string;
  belief?: string;
}

export function usePickTest(): void {
  const aMan: Human = {
    name: "Wayne",
    age: 245,
    sex: "1",
    country: "America",
    belief: "none",
  };
  const tmp = cloneDeepWithDescriptors(aMan, ["age", "belief", "name"]);
  console.log(tmp.belief);
  console.log(tmp.name);
  console.log(tmp.age);
}
