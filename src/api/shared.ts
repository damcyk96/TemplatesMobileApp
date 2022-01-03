type SelectorsMap = {
  [key: string]: (...arg: any[]) => any;
};

export function handleSelectors<T extends SelectorsMap, K extends keyof T>(
  selectors: T,
  ...additionalParams: any
) {
  return function selectorResult(rawData: any) {
    const keys = Object.keys(selectors) as K[];
    const initialData = {} as {
      [Key in K]: ReturnType<T[Key]>;
    };

    return keys.reduce((acc, selectorName) => {
      const selector = selectors[selectorName];

      acc[selectorName] = selector(rawData, additionalParams);
      return acc;
    }, initialData);
  };
}
