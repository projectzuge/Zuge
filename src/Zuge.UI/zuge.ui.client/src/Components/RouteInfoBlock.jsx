import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../Styles/RouteInfoBlock.css";
import rightArrow from "./../assets/right-arrow.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useJourney } from "../Contexts/SelectedRouteContext";

const RouteInfoBlock = () => {
  const selectedJourney = useJourney().selectedJourney;
  const navigate = useNavigate();

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
        <Box id="route-info-box">
          <Typography id="title-typography" variant="largeBoldFont">
            MENOMATKA:
          </Typography>
          <Box id="route-inside-box">
            <Typography variant="mediumBoldFont">
              {selectedJourney.date}
            </Typography>
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
                <Typography variant="smallBoldFont">
                  {selectedJourney.departure}
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography variant="smallBoldFont">
                  {selectedJourney.arrival}
                </Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="largeBoldFont">
                  {selectedJourney.from}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                id="arrow-item-grid"
                alignContent={"center"}
              ></Grid>
              <Grid item xs={4}>
                <Typography variant="largeBoldFont">
                  {selectedJourney.to}
                </Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="mediumFont">
                  {selectedJourney.train}
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4} textAlign={"start"}>
                <Typography variant="mediumFont">
                  Kesto: {selectedJourney.duration}
                </Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="mediumFont">
                  {selectedJourney.passengerType}
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4} textAlign={"start"}>
                <Typography variant="largeBoldFont">
                  {selectedJourney.price} €
                </Typography>
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
              <Typography variant="mediumBoldFont">
                ({selectedJourney.price} €)
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RouteInfoBlock;
