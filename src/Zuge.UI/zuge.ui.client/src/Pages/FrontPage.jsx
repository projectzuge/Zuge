import "../Styles/FrontPage.css";
import RouteSearchForm from "../Components/RouteSearchForm";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import { useState, useEffect, useContext } from "react";
import "./../Styles/FrontPage.css";
import { extractUniqueStations } from "../dataUtils";
import { RouteContext } from "../Contexts/RouteContext";

function FrontPage() {
  const journeys = useContext(RouteContext);
  const [arrayOfCities, setArrayOfCities] = useState([]);

  useEffect(() => {
    const cities = extractUniqueStations(journeys);
    console.log("cities in front page:", cities);
    setArrayOfCities(cities);
  }, []);

  return (
    <>
      <Box>
        <Grid container spacing={20} id="search-form-grid">
          <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            <RouteSearchForm cities={arrayOfCities} />
          </Grid>
          <Grid xs={12} sm={12} md={10} lg={8} xl={8} id="route-list-grid" />
        </Grid>
      </Box>
    </>
  );
}

export default FrontPage;
