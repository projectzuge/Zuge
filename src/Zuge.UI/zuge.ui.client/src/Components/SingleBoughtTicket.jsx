import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../Styles/SingleBoughtTicket.css";

const SingleBoughtTicket = (props) => {
  const from = props.from;
  const to = props.to;
  const arrival = props.arrival;
  const departure = props.departure;
  const date = props.date;

  const handleRouteClick = () => {
    // this will open either the ticket or the receipt
  };

  return (
    <Box id={props.DarkMode? "single-bought-journey-container-dark" : "single-bought-journey-container"}>
      <Button
        color={"primary"}
        id="single-route-button"
        onClick={handleRouteClick}
      >
        <Grid container alignItems="center" id="single-route-grid-container">
          <Grid item id="from-to-item">
            <Typography
              variant="mediumBoldFont"
              id="departure-arrival-container"
            >
              {from}
              {" - "}
              {to}
            </Typography>
          </Grid>
          <Grid item textAlign="center">
            <Typography>{date}</Typography>
          </Grid>
          <Grid item id="times-item">
            <Typography id="departure-arrival-container">
              {departure}
              {" - "}
              {arrival}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
};

export default SingleBoughtTicket;
