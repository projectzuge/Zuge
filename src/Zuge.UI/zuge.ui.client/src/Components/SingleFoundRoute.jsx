import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../Styles/SingleFoundRoute.css";
import rightArrow from "./../assets/right-arrow.png";
import rightArrowDark from "./../assets/right-arrow-dark.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useJourney } from "../Contexts/SelectedRouteContext";

const SingleFoundRoute = (props) => {
  const { setJourney } = useJourney();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const showDuration = isSmallScreen ? false : true;

  const departure = props.departure;
  const arrival = props.arrival;
  const duration = props.duration;
  const price = props.price;
  const date = props.date;
  const from = props.from;
  const to = props.to;
  const train = props.train;
  const passengerType = props.passengerType;
  const id = props.id;

  const navigate = useNavigate();

  const handleRouteClick = async () => {
    const data = {
      date: date,
      arrival: arrival,
      departure: departure,
      from: from,
      to: to,
      train: train,
      duration: duration,
      passengerType: passengerType,
      price: price,
      id: id,
    };
    setJourney(data);
    console.log("data:", data);
    sessionStorage.setItem("routeDataState", JSON.stringify(data));
    navigate("/route");
  };

  return (
    <Box
      id={
        props.DarkMode
          ? "single-route-container-dark"
          : "single-route-container"
      }
    >
      <Button
        color={"primary"}
        id="single-route-button"
        onClick={handleRouteClick}
      >
        <Grid container alignItems="center" id="single-route-grid-container">
          <Grid item id="from-to-typography">
            <Typography id="departure-arrival-container">
              {departure}{" "}
              <img
                src={props.DarkMode ? rightArrowDark : rightArrow}
                alt="Array Icon"
                id="right-arrow-icon"
              />
              {arrival}
            </Typography>
          </Grid>
          <Grid item textAlign="center">
            <Typography>{duration}</Typography>
          </Grid>
          <Grid item id="price-typography">
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
