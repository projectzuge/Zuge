import SingleFoundRoute from "./SingleFoundRoute";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../Styles/FoundRoutesList.css";

const FoundRoutesList = (props) => {
  const tempRoutes = [
    { departure: "08.13", arrival: "09.20", duration: "67", price: "12" },
    { departure: "14.13", arrival: "15.20", duration: "67", price: "10" },
    { departure: "19.13", arrival: "20.00", duration: "47", price: "15" },
  ];

  const fromCity = props.from;
  const toCity = props.to;
  const passengerType = props.passenger;
  const travelDate = props.date;

  return (
    <Box id="found-routes-list-box">
      <Grid container id="info-row" alignItems="center">
        <Grid item xs={4} textAlign="left">
          <Typography>Meno: {travelDate}</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography>{passengerType}</Typography>
        </Grid>
        <Grid item xs={4} textAlign="right">
          <Typography>{fromCity} - {toCity}</Typography>
        </Grid>
      </Grid>
      {tempRoutes.map((route, index) => (
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
