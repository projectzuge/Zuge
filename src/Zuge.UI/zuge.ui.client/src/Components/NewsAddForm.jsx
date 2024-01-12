import { useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme.jsx";
import '../Styles/NewsAddForm.css';
import ServiceNews from "./ServiceNews.jsx";

const NewsAddForm = () => {  
  const [news, setNews] = useState({
    otsikko: "",
    teksti: "",
    päivämäärä: ""
  })


  const handleClick = (event) => {
    event.preventDefault()
    
    addNews(news)
    setNews({
      otsikko: "",
      teksti: "",
      päivämäärä: ""
    })
  }

  const addNews = (news) => {
     const newsData = {
      otsikko: news.otsikko, 
      teksti: news.teksti,
      päivämäärä: news.päivämäärä
     }
     ServiceNews
      .create(newsData)
       .then(returnedNews => {
       setNews([...news, returnedNews])
       console.log("Succseful ");
      })
      .catch(error => {
        console.error('Error creating news:', error);
      });
  }
  const handleChange = (item, value) => {
    setNews({
      ...news,
      [item]: value,
    });
  };
  
  return (
    <Grid container paddingLeft={3} paddingRight={3}>
      <Grid item id="button-group-container">
        <ButtonGroup   style={{ height: '70px'}} fullWidth variant="contained" aria-label="outlined primary button group">
          <Button>Matkat</Button>
          <Button>Käyttäjät</Button>
          <Button>Tiedotteet</Button>  
        </ButtonGroup>
      </Grid>
      <Grid  id="news-add-container"> 
        <FormGroup >
        <FormControl >
            <Grid  item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box  p={1}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={1}
                  value={news.otsikko}
                  onChange={(event) => handleChange('otsikko', event.target.value)}
                  placeholder="Otsikko"
                  InputProps={{
                    style: { backgroundColor: 'rgba(238, 238, 238)' }
                  }}                  
                  fullWidth
                  />
              </Box>
            </Grid>
            <Grid item xs={12} >
              <Box p={1}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  value={news.teksti}
                  onChange={(event) => handleChange('teksti', event.target.value)}
                  placeholder="Lisää teksti"
                  InputProps={{
                    style: { backgroundColor: 'rgba(238, 238, 238)' }
                  }}  
                  fullWidth
                  />
              </Box>
            </Grid>
        </FormControl>
            <Grid  item xs={12} sm={12} md={8} lg={12} xl={12}>
              <Box p={1} textAlign="left" >
                <ThemeProvider theme={theme}>
                  <Button
                    color={"primary"}
                    style={{ width: '200px' }}
                    id="fetch-routes-button"
                    variant="contained"
                    type="submit"
                    onClick={handleClick}
                  >
                  Tallenna
                  </Button>
                </ThemeProvider>  
              </Box>
            </Grid>
       </FormGroup>
      </Grid>
    
</Grid> 
  );
};

export default NewsAddForm;
