import { Autocomplete, TextField } from "@mui/material";
import { IField, IOption } from "../../types/FormType";
import { convertToOptions } from "../../utils/convertToOptions";
import { useController, useFormContext } from "react-hook-form";
import { memo, useCallback } from "react";
import { useFormStore } from "../../store/useFormStore";

export const SelectFormField: React.FC<IField> = memo(
  ({ variants, id, required }) => {
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
      defaultValue,
    });

    const onChangeHandler = useCallback(
      (_: React.SyntheticEvent, value: IOption) => {
        onChange(value);
        setFormFieldValue(id, value);
      },
      [id, onChange, setFormFieldValue]
    );

    return (
      <Autocomplete
        aria-labelledby={`form field ${id}`}
        disablePortal
        id={id}
        onChange={onChangeHandler}
        options={convertToOptions(variants ?? [])}
        sx={{ maxWidth: { xs: "100%", sm: 400, md: 600 }, flexShrink: 0 }}
        {...fieldProps}
        renderInput={(params) => <TextField {...params} inputRef={ref} />}
      />
    );
  }
);
