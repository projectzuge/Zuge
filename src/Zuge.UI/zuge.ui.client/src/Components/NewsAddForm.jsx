import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme.jsx";
import '../Styles/NewsAddForm.css';

const NewsAddForm = () => {
  
  return (
    <Box id="search-form-container">
      <FormGroup>
        <FormControl >
          <FormLabel>Otsikko</FormLabel>
            <div id="single-select-div">
              <TextField
                id="outlined-textarea"
                multiline
              />            
            </div>
          <FormLabel>Lisää teksti</FormLabel>
            <div id="single-select-div"> 
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                fullWidth
              />
            </div>
        </FormControl>
        <ThemeProvider theme={theme}>
          <Button
            color={"primary"}
            id="fetch-routes-button"
            variant="contained"
          >
            Talenna
          </Button>
        </ThemeProvider>
      </FormGroup>
    </Box>
  );
};

export default NewsAddForm;
