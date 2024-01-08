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

  const tempRoutes = [
    { departure: "08.13", arrival: "09.20", duration: "67", price: "12" },
    { departure: "14.13", arrival: "15.20", duration: "67", price: "10" },
    { departure: "19.13", arrival: "20.00", duration: "47", price: "15" },
  ];

  const fromCity = props.from;
  const toCity = props.to;
  const passengerType = props.passenger;

  useEffect(() => {
    setFormattedDate(moment(props.date.$d).format("DD.MM.YYYY"));
  }, []);

  useEffect(() => {
    const foundJourneysArray = journeys.filter((route) => {
      console.log("route in filter:", route);

      // check that date matches
      const isMatchingDate = route.date === formattedDate;

      // check that stops match
      const hasStops =
        route.stops.some(obj => obj.station === fromCity) && route.stops.some(obj => obj.station === toCity);

      console.log(
        "is matching date?",
        isMatchingDate,
        "has all stops?",
        hasStops
      );
      return isMatchingDate && hasStops;
    });

    setFilteredJourneys(foundJourneysArray);
  }, [formattedDate]);

  useEffect(() => {
    console.log("filtered journeys:", filteredJourneys);
  }, [filteredJourneys]);

  return (
    <Box id="found-routes-list-box">
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
      {filteredJourneys.map((route, index) => (
        <SingleFoundRoute
          key={index}
          departure={route.departure}
          arrival={route.arrival}
          duration={route.duration}
          price={route.price}
        />
      ))}
    </Box>
  );
};

export default FoundRoutesList;
