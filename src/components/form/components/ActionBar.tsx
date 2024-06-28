import { Stack } from "@mui/material";
import { SendButton } from "./SendButton";
import { PreviousButton } from "./PreviousButton";

export interface IActionBar {
  isLastStep: boolean;
  isFirstStep: boolean;
}

export const ActionBar: React.FC<IActionBar> = ({
  isLastStep,
  isFirstStep,
}) => {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      {isFirstStep ? <div /> : <PreviousButton />}
      <SendButton isLastStep={isLastStep} />
    </Stack>
  );
};
