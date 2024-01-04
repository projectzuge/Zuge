import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../Styles/RouteInfoBlock.css";
import rightArrow from "./../assets/right-arrow.png";

const RouteInfoBlock = () => {
  const placeholderDate = "01.01.2024";
  const placeholderFrom = "Tampere";
  const placeholderTo = "Helsinki";
  const placeholderDeparture = "15.00";
  const placeholderArrival = "17.00";
  const placeholderTrain = "Lähijuna R";
  const placeholderTime = "2 h";
  const placeholderTraveller = "Aikuinen";
  const placeholderPrice = "14,90 €";

  return (
    <Grid id="route-info-grid" container>
      <Box id="route-info-box">
        <Typography id="title-typography" variant="largeBoldFont">
          MENOMATKA:
        </Typography>
        <Box id="route-inside-box">
          <Typography variant="mediumBoldFont">
            {placeholderDate}
          </Typography>
          <Grid id="times-grid" paddingRight={"200px"}>
            <Grid item xs={4}>
              <Typography variant="smallBoldFont">
                {placeholderDeparture}
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant="smallBoldFont">
                {placeholderArrival}
              </Typography>
            </Grid>
          </Grid>
          <Grid id="from-to-grid" paddingRight={"200px"}>
            <Grid item xs={4}>
              <Typography variant="largeBoldFont">{placeholderFrom}</Typography>
            </Grid>
            <Grid item xs={4} id="arrow-item-grid" alignContent={"center"}>
              <img src={rightArrow} alt="Array Icon" id="right-arrow-icon" />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="largeBoldFont">{placeholderTo}</Typography>
            </Grid>
          </Grid>
          <Grid id="from-to-grid">
            <Grid item xs={4}>
              <Typography variant="mediumFont">{placeholderTrain}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="mediumFont">
                Matka-aika: {placeholderTime}
              </Typography>
            </Grid>
          </Grid>
          <Grid id="from-to-grid">
            <Grid item xs={6}>
              <Typography variant="mediumFont">
                {placeholderTraveller}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign={"end"}>
              <Typography variant="largeBoldFont">
                {placeholderPrice}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default RouteInfoBlock;
