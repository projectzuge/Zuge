import "../Styles/FrontPage.css";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import './../Styles/FrontPage.css';
import Button from "@mui/material/Button";
import { useEffect, useState} from "react";
import ServiceNews from "../Components/ServiceNews";

const SingleNews = () => {
  const[news, setNews] = useState([]);

  useEffect(() => {
    ServiceNews
      .getAllNews()
       .then(initialNews => {
        setNews(initialNews)
      })
  }, []);
  return (
    <div>
      <Button margin={10}
          id="fetch-routes-button"
          color={"primary"}
          variant="contained"
      >
        Takaisin
      </Button>
      <Box margin={10} id="search-form-container">
         <Grid > 
            <Grid margin={20} xs={12} sm={12} md={8} lg={6} xl={4}>
            {news.map((item) => (
              <div key={item.id}>
                <h3>{item.otsikko}</h3>
                <p>{item.teksti}</p>
              </div>
            ))}
            </Grid>
          </Grid>    
      </Box>
    </div>
  );
};

export default SingleNews;
