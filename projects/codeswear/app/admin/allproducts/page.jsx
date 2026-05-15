"use client"
import FullLayout from "@/src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/theme/theme";

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        Hello Products
      </FullLayout>
    </ThemeProvider>
  );
}
