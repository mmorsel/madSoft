import { IFormQuestion } from "../types/FormType";
import { CheckboxFormField } from "./fields/CheckboxFormField";
import { RadioFormField } from "./fields/RadioFormField";
import { SelectFormField } from "./fields/SelectFormField";
import { TextFormField } from "./fields/TextFormField";

interface IRenderForm {
  config: IFormQuestion[];
}

export const RenderForm: React.FC<IRenderForm> = ({ config }) => {
  return config.map((question) => {
    const { key, required, variants, type } = question;
    switch (type) {
      case "select": {
        return (
          <SelectFormField
            id={key}
            key={key}
            variants={variants}
            required={required}
          />
        );
      }
      case "radio": {
        return (
          <RadioFormField
            id={key}
            key={key}
            variants={variants}
            required={required}
          />
        );
      }
      case "check": {
        return (
          <CheckboxFormField
            id={key}
            key={key}
            variants={variants}
            required={required}
          />
        );
      }
      case "text":
      case "textArea": {
        return (
          <TextFormField id={key} key={key} required={required} type={type} />
        );
      }
    }
  });
};
