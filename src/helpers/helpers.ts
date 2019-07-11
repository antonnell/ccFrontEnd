type ConsoleColors = 'lightGreen' | 'white' | 'lightBlue' | 'lightsalmon' | 'black';
export const helperRenderConsoleText = (
  message: string,
  background: ConsoleColors,
  color?: ConsoleColors
) => {
  return [`%c${message}`, `background: ${background};color: ${color ? color : 'black'};`];
};

export const hexEncode = (value:string) => {
  let hex, i;
  let result = '';
  for (i = 0; i < value.length; i++) {
    hex = value.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }
  return result;
};
