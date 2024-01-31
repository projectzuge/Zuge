import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../Styles/RouteInfoBlock.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useJourney } from "../Contexts/SelectedRouteContext";
import { useEffect, useState } from "react";

const RouteInfoBlock = ({ DarkMode }) => {
  const [selectedJourney, setSelectedJourney] = useState(
    useJourney().selectedJourney
  );
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [train, setTrain] = useState("");
  const [duration, setDuration] = useState("");
  const [passengerType, setPassengerType] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const savedRouteState = JSON.parse(
      sessionStorage.getItem("routeDataState")
    );

    if (savedRouteState || selectedJourney) {
      setDate(savedRouteState.date || selectedJourney.date);
      setArrival(savedRouteState.arrival || selectedJourney.arrival);
      setDeparture(savedRouteState.departure || selectedJourney.departure);
      setFrom(savedRouteState.from || selectedJourney.from);
      setTo(savedRouteState.to || selectedJourney.to);
      setTrain(savedRouteState.train || selectedJourney.train);
      setDuration(savedRouteState.duration || selectedJourney.duration);
      setPassengerType(
        savedRouteState.passengerType || selectedJourney.passengerType
      );
      setPrice(savedRouteState.price || selectedJourney.price);
    } else {
      navigate("/");
    }
  }, []);

  const onConfirmClicked = () => {
    navigate("/revise");
  };

  return (
    <>
      <div id="back-button-div">
        <Grid container>
          <Grid item xs={12} md={4} lg={2} xl={2}>
            <Button
              fullWidth
              color={"primary"}
              variant="contained"
              onClick={() => navigate(-1)}
            >
              Takaisin
            </Button>
          </Grid>
        </Grid>
      </div>
      <Grid id="route-info-grid" container direction="column">
        <Box id={DarkMode ? "route-info-box-dark" : "route-info-box"}>
          <Typography id="title-typography" variant="largeBoldFont">
            MENOMATKA:
          </Typography>
          <Box id={DarkMode ? "route-inside-box-dark" : "route-inside-box"}>
            <Typography variant="mediumBoldFont">{date}</Typography>
            <Grid id="departure-arrival-text-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="mediumBoldFont">Lähtö:</Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography variant="mediumBoldFont">Määränpää:</Typography>
              </Grid>
            </Grid>
            <Grid id="times-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="smallBoldFont">{departure}</Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography variant="smallBoldFont">{arrival}</Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="largeBoldFont">{from}</Typography>
              </Grid>
              <Grid
                item
                xs={4}
                id="arrow-item-grid"
                alignContent={"center"}
              ></Grid>
              <Grid item xs={4}>
                <Typography variant="largeBoldFont">{to}</Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="mediumFont">{train}</Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4} textAlign={"start"}>
                <Typography variant="mediumFont">Kesto: {duration}</Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="mediumFont">{passengerType}</Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4} textAlign={"start"}>
                <Typography variant="largeBoldFont">{price} €</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={0} md={0} lg={4} xl={4}></Grid>
          <Grid item xs={12} md={12} lg={4} xl={4}>
            <Button
              color={"primary"}
              id="confirm-journey-button"
              variant="contained"
              onClick={onConfirmClicked}
              fullWidth
            >
              <Typography variant="smallFont">Vahvista matka</Typography>
              <Typography>&nbsp;</Typography>
              <Typography variant="mediumBoldFont">({price} €)</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RouteInfoBlock;
