import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { useFormStore } from "../store/useFormStore";

interface IFormStepper {
  stepsCount: number;
}

export const FormStepper: React.FC<IFormStepper> = ({ stepsCount }) => {
  const step = useFormStore((store) => store.step);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={step} connector={null} sx={{ gap: 2 }}>
        {new Array(stepsCount).fill(null).map((_, index) => {
          return (
            <Step
              key={index}
              sx={{
                backgroundColor: (theme) =>
                  index < step - 1
                    ? theme.palette.primary.dark
                    : index === step - 1
                    ? theme.palette.warning.dark
                    : theme.palette.grey[500],
                height: 8,
                width: `calc(100% / ${stepsCount} )`,
              }}
            />
          );
        })}
      </Stepper>
    </Box>
  );
};
