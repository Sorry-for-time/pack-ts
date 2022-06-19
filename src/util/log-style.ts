export const enum styleEnum {
  "title" = `
    background-color: #555555;
    padding: 2px 6px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    box-shadow: 0 0 3px gray;
    font-weight: 500;
    text-shadow: 0 0 1px black;
  `,
  "main" = `
    background-color: hsl(36, 100%, 50%);
    color: rgba(0, 0, 0, 0.8);
    padding: 2px 6px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    box-shadow: 0 0 3px gray;
    font-weight: 800;
  `,
  "hint" = `
    background-color: #088A08;
    padding: 2px 6px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    box-shadow: 0 0 3px gray;
    font-weight: 500;
    color: white;
    text-shadow: 0 0 1px black;
  `,
  "warn" = `
    background-color: orange;
    padding: 2px 6px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    box-shadow: 0 0 3px gray;
    font-weight: 500;
    color: black;
  `,
}

export function formateLogOutput(
  msgs: Array<any> = ["hint", ""],
  styles: Array<string> = [styleEnum.title, styleEnum.main]
): void {
  let unwrap: string = "";
  msgs.forEach((item) => {
    unwrap += `%c${item}`;
  });
  window.console.log(unwrap, ...styles);
}
