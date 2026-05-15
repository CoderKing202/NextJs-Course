"use client";
import FullLayout from "@/src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/theme/theme";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "@/src/components/baseCard/BaseCard";
import { useState } from "react";
const page = () => {
  const [form, setForm] = useState({});
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form)
  };
  const submitForm = async (e)=>{
    e.preventDefault()
    // fetch API Request to add a product 
    let a  = await fetch("http://localhost:3000/api/addproducts")
  }
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid size={12}>
            <BaseCard title="Add a Product">
              <Stack spacing={3} style={{ width: "100%" }}>
                <TextField onChange={onChange} value={form.title?form.title:""} name="title" label="title" variant="outlined" />
                <TextField onChange={onChange} value={form.type?form.type:""} name="type" label="Type" variant="outlined" />
                <TextField onChange={onChange} value={form.size?form.size:""} name="size" label="Size" variant="outlined" />
                <TextField onChange={onChange} value={form.color?form.color:""} name="color" label="Color" variant="outlined" />
                <TextField onChange={onChange} value={form.slug?form.slug:""} name="slug" label="Slug" variant="outlined" />

                <TextField onChange={onChange}
                  value={form.description?form.description:""} name="description"
                  label="Description"
                  multiline
                  rows={4}
                />
              </Stack>
              <br />
              <Button onClick={submitForm} variant="contained" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default page;
