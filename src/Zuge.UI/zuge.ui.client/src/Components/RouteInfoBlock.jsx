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
        <Button
          color={"primary"}
          id="back-button"
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Takaisin
        </Button>
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
              <Grid item xs={4} id="arrow-item-grid" alignContent={"center"}>
                <img src={rightArrow} alt="Array Icon" id="right-arrow-icon" />
              </Grid>
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
        <Button
          color={"primary"}
          id="confirm-journey-button"
          variant="contained"
          onClick={onConfirmClicked}
        >
          <Typography variant="smallFont">Vahvista matka</Typography>
          <Typography>&nbsp;</Typography>
          <Typography variant="mediumBoldFont">
            ({selectedJourney.price} €)
          </Typography>
        </Button>
      </Grid>
    </>
  );
};

export default RouteInfoBlock;
