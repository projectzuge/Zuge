import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../Styles/RouteInfoBlock.css";
import rightArrow from "./../assets/right-arrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const RouteInfoBlock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  const onConfirmClicked = () => {
    console.log("Confirm clicked");
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
            <Typography variant="mediumBoldFont">{data.date}</Typography>
            <Grid id="times-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="smallBoldFont">
                  {data.departure}
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography variant="smallBoldFont">{data.arrival}</Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="largeBoldFont">{data.from}</Typography>
              </Grid>
              <Grid item xs={4} id="arrow-item-grid" alignContent={"center"}>
                <img src={rightArrow} alt="Array Icon" id="right-arrow-icon" />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="largeBoldFont">{data.to}</Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="mediumFont">{data.train}</Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4} textAlign={"start"}>
                <Typography variant="mediumFont">
                  Kesto: {data.duration}
                </Typography>
              </Grid>
            </Grid>
            <Grid id="from-to-grid" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="mediumFont">
                  {data.passengerType}
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4} textAlign={"start"}>
                <Typography variant="largeBoldFont">{data.price} €</Typography>
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
            <Typography variant="mediumBoldFont">({data.price} €)</Typography>
          </Button>
      </Grid>
    </>
  );
};

export default RouteInfoBlock;
