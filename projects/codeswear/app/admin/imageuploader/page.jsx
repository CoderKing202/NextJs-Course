"use client"
import FullLayout from "@/src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/theme/theme";
const page = () => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>Image Uploader</FullLayout>
    </ThemeProvider>
  );
};

export default page;
