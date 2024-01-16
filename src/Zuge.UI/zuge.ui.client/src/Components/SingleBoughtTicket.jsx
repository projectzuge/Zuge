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
    <Box id="single-bought-journey-container">
      <Button
        color={"primary"}
        id="single-route-button"
        onClick={handleRouteClick}
      >
        <Grid container alignItems="center" id="single-route-grid-container">
          <Grid item xs={12} md={4} xl={4} textAlign="left">
            <Typography
              variant="mediumBoldFont"
              id="departure-arrival-container"
            >
              {from}
              {" - "}
              {to}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} xl={4} textAlign="center">
            <Typography>{date}</Typography>
          </Grid>
          <Grid item xs={12} md={4} xl={4} textAlign="right">
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
