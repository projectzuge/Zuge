import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { useEffect, useState} from "react";
import ServiceNews from "../Components/ServiceNews";
import { Typography } from "@mui/material";
import "../Styles/SingleNews.css";
import moment from "moment";
import { Link } from "react-router-dom";



const SingleNews = () => {
  const[news, setNews] = useState([]);

  let today = new Date();
  let todayFormatted = moment(today).format('DD-MM-YYYY');
  
  useEffect(() => {
    ServiceNews
      .getAllNews()
       .then(initialNews => {
        setNews(initialNews)
      })
  }, []);
  return (
    <Box>
      <Link to="/NewsPage">
      <Button
          id="takaisin-button"
          color="primary"
          variant="contained"
          
      >
        Takaisin
      </Button>
      </Link>
      <Box id="single-news-container">
        <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            {news.map((item) => (
              <Grid item key={item.id} >
                <Typography id="header-news" align="left" >{todayFormatted}</Typography>
                <Typography id="header-news" align="center" >{item.otsikko}</Typography>
              </Grid>
            ))}
        </Grid>
            <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            {news.map((item) => (
              <Grid item key={item.id} style={{ width: 'auto' }}>
                <Typography id="text-news" paragraph={true} align="left">{item.teksti}</Typography>
              </Grid>
            ))}
            </Grid>    
      </Box>
    </Box>
  );
};

export default SingleNews;
