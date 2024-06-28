export type QuestionType = "select" | "radio" | "check" | "text" | "textArea";

export interface IFormQuestion {
  key: string;
  title: string;
  type: QuestionType;
  variants?: string[];
  required?: boolean;
}

export interface IField extends Pick<IFormQuestion, "required" | "variants"> {
  id: string;
  type?: QuestionType;
}

export type FieldValueType = string | string[] | IOption;

export interface IOption {
  label: string;
  value: string;
}
