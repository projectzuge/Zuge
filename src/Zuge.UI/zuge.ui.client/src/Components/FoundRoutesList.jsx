import SingleFoundRoute from "./SingleFoundRoute";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../Styles/FoundRoutesList.css";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const FoundRoutesList = (props) => {
  const journeys = props.journeys;
  const [formattedDate, setFormattedDate] = useState("");

  const fromCity = props.from;
  const toCity = props.to;
  const passengerType = props.passengerType;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("480px"));
  const variant = isSmallScreen ? "smallBoldFont" : "mediumBoldFont";

  const componentRef = useRef(null);
  useEffect(() => {
    componentRef.current.focus();
  }, []);

  useEffect(() => {
    setFormattedDate(moment(props.date.$d).format("DD.MM.YYYY"));
  }, []);

  return (
    <Box
      id={
        props.DarkMode ? "found-routes-list-box-dark" : "found-routes-list-box"
      }
      marginTop="40px"
    >
      <Grid container id="info-row" alignItems="left">
        <Grid item id="trip">
          <Typography variant={variant}>Meno: {formattedDate}</Typography>
        </Grid>
        <Grid item id="passenger" textAlign="center">
          <Typography variant={variant}>{passengerType}</Typography>
        </Grid>
        <Grid item id="from-to" tabIndex={-1} ref={componentRef}>
          <Typography variant={variant}>
            {fromCity} - {toCity}
          </Typography>
        </Grid>
      </Grid>
      {journeys.length > 0 ? (
        journeys.map((route, index) => (
          <SingleFoundRoute
            key={index}
            departure={moment(route.stops[0].departsAt).format("HH:mm")}
            arrival={moment(
              route.stops[route.stops.length - 1].arrivesAt
            ).format("HH:mm")}
            duration={route.duration}
            price={route.price}
            date={formattedDate}
            from={fromCity}
            to={toCity}
            train={route.train}
            passengerType={passengerType}
            id={route.id}
            DarkMode={props.DarkMode}
          />
        ))
      ) : (
        <Box id={props.DarkMode ? "inner-box-dark" : "inner-box"}>
          <Typography variant="largeBoldFont">
            Valitsemillasi hakuehdoilla ei löytynyt matkoja.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FoundRoutesList;
