import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { IField } from "../../types/FormType";
import { useController, useFormContext } from "react-hook-form";
import { useFormStore } from "../../store/useFormStore";
import { memo, useCallback } from "react";

export const RadioFormField: React.FC<IField> = memo(
  ({ variants, id, required }) => {
    const { control } = useFormContext();

    const { defaultValue, setFormFieldValue } = useFormStore((store) => ({
      defaultValue: store.formState[id],
      setFormFieldValue: store.setFormFieldValue,
    }));

    const {
      field: { onChange, ...fieldProps },
    } = useController({
      name: id,
      control,
      rules: { required },
      defaultValue: defaultValue ?? variants?.[0],
    });

    const onChangeHandler = useCallback(
      (_: React.SyntheticEvent, value: string) => {
        onChange(value);
        setFormFieldValue(id, value);
      },
      [id, onChange, setFormFieldValue]
    );

    return (
      <RadioGroup
        aria-labelledby={`form field ${id}`}
        defaultValue={variants?.[0]}
        {...fieldProps}
        onChange={onChangeHandler}
      >
        {variants?.map((item) => (
          <FormControlLabel
            value={item}
            control={<Radio />}
            label={item}
            key={item}
          />
        ))}
      </RadioGroup>
    );
  }
);
