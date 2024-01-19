import "../Styles/ReviseAndPay.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useJourney } from "../Contexts/SelectedRouteContext";
import { TextField } from "@mui/material";
import { useState } from "react";
import plusSign from "./../assets/plus-sign.png";

const ReviseJourneyInfo = () => {
  const [email, setEmail] = useState("Sähköpostiosoite");
  const [emailNotValid, setEmailNotValid] = useState(false);

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const selectedJourney = useJourney().selectedJourney;
  console.log("selected journey in revise page:", selectedJourney);

  const onEmailChange = (e) => {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setEmailNotValid(false);
      setEmail(e.target.value);
    } else {
      setEmailNotValid(true);
    }
  };

  return (
    <>
      <Grid container id="revise-box">
        <Grid item id="revise-sub-grid">
          <Typography variant="largeFont" marginBottom={"10px"}>
            Menomatka:
          </Typography>
          <Grid container id="selected-journey">
            <Grid container marginBottom={"10px"}>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                xl={3}
                textAlign={"start"}
                justifyContent={"center"}
              >
                <Typography variant="mediumBoldFont">
                  {selectedJourney.date}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                xl={3}
                textAlign={"start"}
                justifyContent={"center"}
              >
                <Typography variant="mediumFont">
                  {selectedJourney.train}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                xl={3}
                textAlign={"start"}
                justifyContent={"center"}
              >
                <Typography variant="mediumFont">
                  Kesto: {selectedJourney.duration}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={3} xl={3}></Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                xl={3}
                textAlign={"start"}
                justifyContent={"center"}
              >
                <Typography variant="largeBoldFont" style={{ lineHeight: 1.5 }}>
                  {selectedJourney.from}
                  {" - "}
                  {selectedJourney.to}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                xl={3}
                textAlign={"start"}
                justifyContent={"center"}
              >
                <Typography variant="mediumFont" style={{ lineHeight: 2.0 }}>
                  Vaunu 4, paikka 55
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                xl={3}
                textAlign={"start"}
                justifyContent={"center"}
              >
                <Typography variant="mediumFont" style={{ lineHeight: 2.0 }}>
                  {selectedJourney.passengerType}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={3} xl={3}>
                <Typography variant="largeBoldFont" style={{ lineHeight: 1.5 }}>
                  {selectedJourney.price} €
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item id="revise-sub-grid">
          <Typography variant="largeFont">Lipun toimitus:</Typography>
          <Grid container alignItems="center">
            <Grid item xs={11} md={11} lg={5} xl={5}>
              <TextField
                variant="outlined"
                InputProps={{ sx: { borderRadius: "10px" } }}
                id="profile-text-field"
                fullWidth
                defaultValue={email}
                onChange={onEmailChange}
                required
                error={emailNotValid}
              ></TextField>
            </Grid>
            <Grid item xs={1}>
              <Button style={{ minWidth: 0 }} id="add-email-button">
                <img
                  src={plusSign}
                  alt="Plus Icon"
                  id="plus-icon"
                  style={{ maxWidth: "30px", maxHeight: "30px" }}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item id="revise-sub-grid">
          <Typography variant="largeFont">Maksutapa</Typography>
          <Grid container id="selected-journey"></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviseJourneyInfo;
