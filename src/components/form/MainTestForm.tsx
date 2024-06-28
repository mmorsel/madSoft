import { FormProvider, useForm } from "react-hook-form";
import { TEST_QUESTIONS } from "../../mock/indx";
import { FormContainer } from "./components/FormContainer";
import { RenderForm } from "./components/RenderForm";
import { FormStepper } from "./components/FormStepper";
import { FIRST_FORM_STEP, useFormStore } from "./store/useFormStore";
import { useShallow } from "zustand/react/shallow";
import { ActionBar } from "./components/ActionBar";
import { Divider, Stack, Typography } from "@mui/material";

export const MainTestForm: React.FC = () => {
  const step = useFormStore(useShallow((store) => store.step));

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <FormStepper stepsCount={TEST_QUESTIONS.length} />
        <Stack sx={{ flex: 1 }} spacing={2}>
          <Typography variant="h6">{TEST_QUESTIONS[step - 1].title}</Typography>
          <Divider />
          <RenderForm config={[TEST_QUESTIONS[step - 1]]} />
        </Stack>
        <ActionBar
          isLastStep={step === TEST_QUESTIONS.length}
          isFirstStep={step === FIRST_FORM_STEP}
        />
      </FormContainer>
    </FormProvider>
  );
};
