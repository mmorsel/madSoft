import { Button } from "@mui/material";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useFormStore } from "../store/useFormStore";
import { useShallow } from "zustand/react/shallow";
import { memo, useCallback } from "react";

export const PreviousButton: React.FC = memo(() => {
  const { step, setStep } = useFormStore(
    useShallow((store) => ({
      setStep: store.setStep,
      step: store.step,
    }))
  );

  const onClickHandler = useCallback(() => {
    setStep(step - 1);
  }, [setStep, step]);

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ minWidth: 100 }}
      startIcon={<BiLeftArrowAlt />}
      onClick={onClickHandler}
      type="button"
    >
      Назад
    </Button>
  );
});
