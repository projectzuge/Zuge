import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import "../Styles/SingleNews.css";
import moment from "moment";
import { Link } from "react-router-dom";
import news from  "./../assets/news.json";
import { toast } from "react-toastify";

const SingleNews = ({ DarkMode, cookies }) => {
  toast.dismiss();

  return (
    <Box>
      <Link to="/NewsPage" style={{textDecoration: "none"}}>
      <Button
          id={(cookies.userData !== undefined && 
            cookies.userData.roles.includes("Employee")) ? "manage-button" : 
            "manage-button-hidden"}
          color="primary"
          variant="contained"
      >
        Hallinnoi
      </Button>
      </Link>
      <Box id={DarkMode? "single-news-container-dark" : 
      "single-news-container"}>
        <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            {news.news.map(item => (
              <Grid item key={item.id} marginBottom={2}>
                <Typography id="header-news" align="left" >
                  {moment(item.date).format('DD.MM.YYYY')}</Typography>
                <Typography id="header-news" variant="largeBoldFont" 
                align="center" >{item.otsikko}</Typography>
              </Grid>
            ))}
        </Grid>
        <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
          {news.news.map(item => (
            <Grid item key={item.id} style={{ width: 'auto' }}>
              <Typography paragraph={true} align="left">{item.teksti}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SingleNews;
