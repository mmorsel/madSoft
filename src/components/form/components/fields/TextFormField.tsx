import TextField from "@mui/material/TextField";
import { IField } from "../../types/FormType";
import { useController, useFormContext } from "react-hook-form";
import { memo, useCallback } from "react";
import { useFormStore } from "../../store/useFormStore";

export const TextFormField: React.FC<IField> = memo(
  ({ id, required, type }) => {
    const { control } = useFormContext();

    const { defaultValue, setFormFieldValue } = useFormStore((store) => ({
      defaultValue: store.formState[id],
      setFormFieldValue: store.setFormFieldValue,
    }));

    const {
      field: { onChange, ref, ...fieldProps },
    } = useController({
      name: id,
      control,
      rules: { required },
      defaultValue: defaultValue ?? "",
    });

    const onChangeHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        onChange(value);
        setFormFieldValue(id, value);
      },
      [id, onChange, setFormFieldValue]
    );

    return (
      <TextField
        aria-labelledby={`form field ${id}`}
        id={id}
        onChange={onChangeHandler}
        inputRef={ref}
        sx={{ maxWidth: { xs: "100%", sm: 400, md: 600 }, flexShrink: 0 }}
        {...fieldProps}
        multiline={type === "textArea"}
        minRows={4}
        placeholder="Ваш ответ ..."
      />
    );
  }
);
