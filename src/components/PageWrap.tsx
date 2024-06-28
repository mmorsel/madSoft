import { Box } from "@mui/material";

export const PageWrap: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </Box>
);
