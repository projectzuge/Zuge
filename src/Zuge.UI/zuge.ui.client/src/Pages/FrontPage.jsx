import "../Styles/FrontPage.css";
import RouteSearchForm from "../Components/RouteSearchForm";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import { useState, useEffect, useContext } from "react";
import "./../Styles/FrontPage.css";
import { extractUniqueStations } from "../dataUtils";
import { RouteContext } from "../Contexts/RouteContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from 'prop-types';

FrontPage.propTypes = {
  DarkMode: PropTypes.bool,
};

function FrontPage({DarkMode}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const spacing = isSmallScreen ? 0 : 20;

  const journeys = useContext(RouteContext);
  const [arrayOfCities, setArrayOfCities] = useState([]);

  useEffect(() => {
    const cities = extractUniqueStations(journeys);
    setArrayOfCities(cities);
  }, []);

  return (
    <>
      <Box id="frontpage-box">
        <Grid container spacing={spacing} id="search-form-grid">
          <Grid xs={12} sm={12} md={8} lg={6} xl={4}>
            <RouteSearchForm cities={arrayOfCities} DarkMode={DarkMode} />
          </Grid>
          <Grid xs={12} sm={12} md={10} lg={8} xl={8} id="route-list-grid" />
        </Grid>
      </Box>
    </>
  );
}

export default FrontPage;
