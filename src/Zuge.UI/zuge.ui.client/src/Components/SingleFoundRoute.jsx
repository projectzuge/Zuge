import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../Styles/SingleFoundRoute.css";
import rightArrow from "./../assets/right-arrow.png";
import { useNavigate } from "react-router-dom";

const SingleFoundRoute = (props) => {
  const departure = props.departure;
  const arrival = props.arrival;
  const duration = props.duration;
  const price = props.price;

  const navigate = useNavigate();

  const convertMinutesToHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours === 0 ? `${minutes} min` : `${hours} h ${minutes} min`;
  };

  const handleRouteClick = async () => {
    navigate("/route");
  }

  return (
    <Box id="single-route-container">
      <Button color={"primary"} id="single-route-button" onClick={handleRouteClick}>
        <Grid container alignItems="center">
          <Grid item xs={4} textAlign="left">
            <Typography id="departure-arrival-container">
              {departure}{" "}
              <img src={rightArrow} alt="Array Icon" id="right-arrow-icon" />
              {arrival}
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <Typography>{convertMinutesToHoursAndMinutes(duration)}</Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography variant="h6" fontWeight="bold">
              {price} €
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
};

export default SingleFoundRoute;
