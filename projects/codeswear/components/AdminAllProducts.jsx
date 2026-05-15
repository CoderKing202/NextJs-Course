"use client";
import FullLayout from "@/src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/theme/theme";
import { Grid } from "@mui/material";
import AllProducts from "@/src/components/dashboard/AllProducts";

const AdminAllProducts = ({products}) => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid size={12}>
            <AllProducts products={products}/>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default AdminAllProducts;
