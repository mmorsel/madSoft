import { Paper } from "@mui/material";
import { FormTitle } from "./FormTitle";

export interface IFormContainer extends React.PropsWithChildren {
  title?: string;
  withTimer?: boolean;
}

export const FormContainer: React.FC<IFormContainer> = ({
  children,
  title = "Тестирование",
  withTimer = true,
}) => (
  <Paper
    component="form"
    noValidate
    sx={{
      px: { xs: 2, md: 3 },
      py: 3,
      minWidth: { xs: "90%", md: "70%" },
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      gap: 3,
    }}
  >
    <FormTitle title={title} withTimer={withTimer} />
    {children}
  </Paper>
);
