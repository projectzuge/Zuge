import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { useEffect, useState} from "react";
import ServiceNews from "../Components/ServiceNews";
import { Typography } from "@mui/material";
import "../Styles/SingleNews.css";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const SingleNews = () => {
  const[news, setNews] = useState([]);
  const [value, setValue] = useState(dayjs('2024-01-05')); // when I create a News page and be able to add news; IO ll change Data format

  useEffect(() => {
    ServiceNews
      .getAllNews()
       .then(initialNews => {
        setNews(initialNews)
      })
  }, []);
  return (
    <Box>
      <Button
          id="takaisin-button"
          color="primary"
          variant="contained"
      >
        Takaisin
      </Button>
      <Box id="single-news-container">
         <Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateField']}>
            <DateField
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        </Grid>
            <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            {news.map((item) => (
              <div key={item.id}>
                <Typography id="header-news" >{item.otsikko}</Typography>
                <Typography id="text-news"  align="left">{item.teksti}</Typography>
              </div>
            ))}
            </Grid>    
      </Box>
    </Box>
  );
};

export default SingleNews;
