import "../Styles/FrontPage.css";
import NewsAddForm from "../Components/NewsAddForm";"../Components/NewsAddForm";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import './../Styles/FrontPage.css';

function NewsPage() {
  return (
    <>
      <Box>
        <Grid container spacing={10}>
          <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            <NewsAddForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default NewsPage;
