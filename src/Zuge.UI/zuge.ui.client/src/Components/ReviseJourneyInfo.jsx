import "../Styles/ReviseAndPay.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useJourney } from "../Contexts/SelectedRouteContext";
import { TextField } from "@mui/material";
import { useState } from "react";
import plusSign from "./../assets/plus-sign.png";
import { useNavigate } from "react-router-dom";

const ReviseJourneyInfo = ({ DarkMode }) => {
  const navigate = useNavigate();
  const [emailFields, setEmailFields] = useState([
    { value: "", isValid: false },
  ]);

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const selectedJourney = useJourney().selectedJourney;

  const onEmailChange = (index, value) => {
    if (
      value &&
      value.match(isValidEmail) &&
      !emailFields.some((field) => field.value === value)
    ) {
      setEmailFields((prevFields) => {
        // create new array to prevent modifying the states directly
        const newEmailFields = prevFields.map((field, i) =>
          i === index ? { ...field, value, isValid: true } : field
        );
        return newEmailFields;
      });
    } else {
      setEmailFields((prevFields) => {
        const newEmailFields = prevFields.map((field, i) =>
          i === index ? { ...field, value, isValid: false } : field
        );
        return newEmailFields;
      });
    }
  };

  const handleAddEmailFields = () => {
    // allow max 5 fields and only add field if previous ones are valid
    if (emailFields.length < 5 && emailFields.every((field) => field.isValid)) {
      setEmailFields([...emailFields, ""]);
    }
  };

  const handlePaymentCardClick = async () => {
    // check that only one email is recognized in case of multiple same emails, and that they are valid
    const uniqueEmails = new Map();
    const validUniqueEmails = emailFields.reduce((result, field) => {
      if (field.isValid && !uniqueEmails.has(field.value)) {
        uniqueEmails.set(field.value, true);
        result.push(field);
      }
      return result;
    }, []);

    if (validUniqueEmails.length > 0) {
      navigate("/payment", { state: { emails: validUniqueEmails } });
    } else {
      window.alert("Lisää ainakin yksi sähköpostiosoite");
    }
  };

  return (
    <>
      <div id="back-button-div">
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
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
      <Grid container id="revise-box">
        <Grid item id={DarkMode ? "revise-sub-grid-dark" : "revise-sub-grid"}>
          <Typography variant="largeFont" marginBottom={"10px"}>
            Menomatka:
          </Typography>
          <Grid
            container
            id={DarkMode ? "selected-journey-dark" : "selected-journey"}
          >
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
              <Grid item xs={12} md={6} lg={3} xl={3} textAlign={"end"}>
                <Typography variant="largeBoldFont" style={{ lineHeight: 1.5 }}>
                  {selectedJourney.price} €
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item id={DarkMode ? "revise-sub-grid-dark" : "revise-sub-grid"}>
          <Typography variant="largeFont" marginBottom={"10px"}>
            Lipun toimitus:
          </Typography>
          {emailFields.map((email, index) => (
            <Grid
              container
              alignItems="center"
              key={index}
              marginBottom={"10px"}
            >
              <Grid item xs={11} md={11} lg={5} xl={5}>
                <TextField
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: "10px" } }}
                  sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder":
                      {
                        color: DarkMode ? "white" : "black",
                      },
                  }}
                  id={`profile-text-field-${index}`}
                  fullWidth
                  placeholder="Sähköpostiosoite"
                  value={email.value}
                  onChange={(e) => onEmailChange(index, e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={1}>
                {index === emailFields.length - 1 && (
                  <Button
                    style={{ minWidth: 0 }}
                    id="add-email-button"
                    color="addEmailButton"
                    variant="containedAddEmailButton"
                    onClick={handleAddEmailFields}
                  >
                    <img
                      src={plusSign}
                      alt="Plus Icon"
                      id="plus-icon"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid item id={DarkMode ? "revise-sub-grid-dark" : "revise-sub-grid"}>
          <Typography variant="largeFont" marginBottom={"10px"}>
            Maksutapa
          </Typography>
          <Grid container>
            <Grid item xs={12} md={8} lg={5} xl={5}>
              <Button
                fullWidth
                color={"primary"}
                variant="contained"
                sx={{ padding: "15px" }}
                onClick={handlePaymentCardClick}
              >
                Maksukortti
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviseJourneyInfo;
