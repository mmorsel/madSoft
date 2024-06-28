import { Button } from "@mui/material";
import { BiRightArrowAlt, BiSend } from "react-icons/bi";
import { useFormStore } from "../store/useFormStore";
import { useShallow } from "zustand/react/shallow";
import { memo, useCallback } from "react";
import { IActionBar } from "./ActionBar";
import { useFormContext } from "react-hook-form";

type SendButtonType = Pick<IActionBar, "isLastStep">;

export const SendButton: React.FC<SendButtonType> = memo(({ isLastStep }) => {
  const { getValues, reset } = useFormContext();

  const { step, setStep, resetForm } = useFormStore(
    useShallow((store) => ({
      setStep: store.setStep,
      step: store.step,
      resetForm: store.resetForm,
    }))
  );

  const onClickHandler = useCallback(() => {
    if (isLastStep) {
      console.log("Ответы: ", getValues());
      resetForm(); // в случае удачной отправки
      reset({});
    } else {
      setStep(step + 1);
    }
  }, [getValues, isLastStep, reset, resetForm, setStep, step]);

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ minWidth: 100 }}
      endIcon={isLastStep ? <BiSend /> : <BiRightArrowAlt />}
      onClick={onClickHandler}
      type="button"
    >
      {isLastStep ? "Отправить" : "Далее"}
    </Button>
  );
});
