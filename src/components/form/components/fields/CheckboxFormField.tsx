import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { IField } from "../../types/FormType";
import { useController, useFormContext } from "react-hook-form";
import { useFormStore } from "../../store/useFormStore";
import { memo, useCallback, useEffect, useState } from "react";
import { convertToChecks } from "../../utils/convertToOptions";

export const CheckboxFormField: React.FC<IField> = memo(
  ({ variants, id, required }) => {
    const [state, setState] = useState<Record<string, boolean>>(
      convertToChecks(variants ?? [])
    );

    const { control } = useFormContext();

    const { defaultValue, setFormFieldValue } = useFormStore((store) => ({
      defaultValue: store.formState[id] as string[],
      setFormFieldValue: store.setFormFieldValue,
    }));

    const {
      field: { onChange, ...fieldProps },
    } = useController({
      name: id,
      control,
      rules: { required },
    });

    useEffect(() => {
      defaultValue?.forEach((item) => {
        setState((initState) => ({ ...initState, [item]: true }));
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fieldOptions = Object.keys(state).reduce(
        (options: string[], item: string) => {
          if (state[item]) {
            options.push(item);
          }
          return options;
        },
        []
      );

      setFormFieldValue(id, fieldOptions);
      onChange(fieldOptions);
    }, [id, onChange, setFormFieldValue, state]);

    const onChangeHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      },
      [state]
    );

    return (
      <FormControl
        aria-labelledby={`form field ${id}`}
        component="fieldset"
        variant="standard"
        id={id}
        {...fieldProps}
      >
        <FormGroup>
          {variants?.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={state[item]}
                  name={item}
                  onChange={onChangeHandler}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }
);
