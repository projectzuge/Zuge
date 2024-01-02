import "../Styles/FrontPage.css";
import RouteSearchForm from "../Components/RouteSearchForm";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import "./../Styles/FrontPage.css";
// import FoundRoutesList from "../Components/FoundRoutesList";

function FrontPage() {
  return (
    <>
      <Box>
        <Grid container spacing={20} id="search-form-grid">
          <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            <RouteSearchForm />
          </Grid>
          <Grid xs={12} sm={12} md={10} lg={8} xl={8} id="route-list-grid"/>
        </Grid>
      </Box>
    </>
  );
}

export default FrontPage;
