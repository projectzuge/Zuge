import "../Styles/FrontPage.css";
import RouteSearchForm from "../Components/RouteSearchForm";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import './../Styles/FrontPage.css';

function FrontPage() {
  return (
    <>
      <Box>
        <Grid container spacing={10}>
          <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            <RouteSearchForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default FrontPage;
