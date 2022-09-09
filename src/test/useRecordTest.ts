type Prop = "A" | "B" | "C";

type RecB = Record<Prop, string>;

export function useRecordTest(): void {
  const A = "A",
    B = "B",
    C = "C";
  const instance: RecB = {
    A,
    B,
    C,
  };
  console.log(instance);
}
