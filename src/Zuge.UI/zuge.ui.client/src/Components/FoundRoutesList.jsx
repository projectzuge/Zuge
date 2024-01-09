import SingleFoundRoute from "./SingleFoundRoute";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../Styles/FoundRoutesList.css";
import { useContext, useEffect, useState } from "react";
import { RouteContext } from "../Contexts/RouteContext";
import moment from "moment";

const FoundRoutesList = (props) => {
  const journeys = useContext(RouteContext);
  const [filteredJourneys, setFilteredJourneys] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  const fromCity = props.from;
  const toCity = props.to;
  const passengerType = props.passenger;

  useEffect(() => {
    setFormattedDate(moment(props.date.$d).format("DD.MM.YYYY"));
  }, []);

  useEffect(() => {
    const foundJourneysArray = journeys.filter((route) => {

      // check that date matches
      const isMatchingDate = route.date === formattedDate;

      // check that stops match
      const hasStops =
        route.stops.some((obj) => obj.station === fromCity) &&
        route.stops.some((obj) => obj.station === toCity);

      return isMatchingDate && hasStops;
    });

    setFilteredJourneys(foundJourneysArray);
  }, [formattedDate]);

  useEffect(() => {
  }, [filteredJourneys]);

  const getDeparture = (route) => {
    const stationInfo = route.stops.filter((stop) => stop.station === fromCity);
    const departureTime =
      stationInfo.length > 0 ? stationInfo[0].departure : null;
    return departureTime;
  };

  const getArrival = (route) => {
    const stationInfo = route.stops.filter((stop) => stop.station === toCity);

    const arrivalTime =
      stationInfo.length > 0 ? stationInfo[0].departure : null;

    return arrivalTime;
  };

  const countDuration = (departure, arrival) => {
    const [startHour, startMinute] = departure.split(":");
    const [endHour, endMinute] = arrival.split(":");

    const startTime = new Date(0, 0, 0, startHour, startMinute);
    const endTime = new Date(0, 0, 0, endHour, endMinute);

    const timeDiff = endTime.getTime() - startTime.getTime();

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    // Format the time difference
    let formattedTime = "";
    if (hours > 0) {
      formattedTime = `${hours} h ${minutes} min`;
    } else {
      formattedTime = `${minutes} min`;
    }

    return formattedTime;
  };

  return (
    <Box id="found-routes-list-box" marginTop="80px">
      <Grid container id="info-row" alignItems="center">
        <Grid item xs={4} textAlign="left">
          <Typography>Meno: {formattedDate}</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography>{passengerType}</Typography>
        </Grid>
        <Grid item xs={4} textAlign="right">
          <Typography>
            {fromCity} - {toCity}
          </Typography>
        </Grid>
      </Grid>
      {filteredJourneys.length > 0 ? (
        filteredJourneys.map((route, index) => (
          <SingleFoundRoute
            key={index}
            departure={getDeparture(route)}
            arrival={getArrival(route)}
            duration={countDuration(getDeparture(route), getArrival(route))}
            price={route.price}
            date={formattedDate}
            from={fromCity}
            to={toCity}
            train={route.train}
            passengerType={passengerType}
          />
        ))
      ) : (
        <Typography variant="largeBoldFont">
          Valitsemillasi hakuehdoilla ei löytynyt matkoja.
        </Typography>
      )}
    </Box>
  );
};

export default FoundRoutesList;
