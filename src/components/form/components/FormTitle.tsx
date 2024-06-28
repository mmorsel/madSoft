import { Stack, Typography } from "@mui/material";
import { IFormContainer } from "./FormContainer";
import { lazy } from "react";

const Timer = lazy(() => import("./Timer"));

interface IFormTitle extends Omit<IFormContainer, "children"> {}

export const FormTitle: React.FC<IFormTitle> = ({ title, withTimer }) => {
  return (
    <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      {withTimer && <Timer />}
    </Stack>
  );
};
