import { IOption } from "../types/FormType";

export const convertToOptions = (data: string[]): IOption[] => {
  return data.map((item) => ({
    label: item,
    value: item,
  }));
};

export const convertToChecks = (data: string[]): Record<string, boolean> => {
  return data.reduce(
    (options: Record<string, boolean>, item: string, index: number) => {
      if (!(item in options)) {
        options[item] = index === 0;
      }
      return options;
    },
    {}
  );
};
