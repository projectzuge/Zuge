import "../Styles/ReviseAndPay.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useJourney } from "../Contexts/SelectedRouteContext";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
// import plusSign from "./../assets/plus-sign.png";
// import plusSignWhite from "./../assets/plus-sign-white.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviseJourneyInfo = ({ DarkMode, cookies }) => {
  const userInfo = cookies.userData;
  const navigate = useNavigate();
  const [emailFields, setEmailFields] = useState([]);

  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [train, setTrain] = useState("");
  const [duration, setDuration] = useState("");
  const [passengerType, setPassengerType] = useState("");
  const [price, setPrice] = useState("");

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const selectedJourney = useJourney().selectedJourney;

  useEffect(() => {
    if (userInfo && userInfo.email) {
      setEmailFields([{ value: userInfo.email, isValid: true }]);
    } else {
      setEmailFields([{ value: "", isValid: false }]);
    }
  }, [userInfo]);

  useEffect(() => {
    const savedRouteState = JSON.parse(
      sessionStorage.getItem("routeDataState")
    );
    if (savedRouteState || selectedJourney) {
      setDate(savedRouteState.date || selectedJourney.date);
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

  // Commented out for now, if the feature of adding more emails is created:
  // const handleAddEmailFields = () => {
  //   // allow max 5 fields and only add field if previous ones are valid
  //   if (emailFields.length < 5 && emailFields.every((field) => field.isValid)) {
  //     setEmailFields([...emailFields, ""]);
  //   }
  // };

  const handlePaymentCardClick = async () => {
    // check that only one email is recognized in case of multiple same emails, and that they are valid
    const uniqueEmails = new Map();
    const validUniqueEmails = emailFields.reduce((result, field) => {
      if (field.isValid && !uniqueEmails.has(field.value)) {
        uniqueEmails.set(field.value, true);
        result.push(field.value);
      }
      return result;
    }, []);

    if (validUniqueEmails.length > 0) {
      sessionStorage.setItem(
        "emailsForTickets",
        JSON.stringify(validUniqueEmails)
      );

      navigate("/payment");
    } else {
      toast.warning("Lisää tai tarkista sähköpostiosoite.", {
        position: "top-center",
        closeOnClick: false,
        closeButton: true,
        autoClose: 15000,
      });
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
                <Typography variant="mediumBoldFont">{date}</Typography>
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
                <Typography variant="mediumFont">{train}</Typography>
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
                <Typography variant="mediumFont">Kesto: {duration}</Typography>
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
                  {from}
                  {" - "}
                  {to}
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
                  {passengerType}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={3} xl={3} id="price-grid-item">
                <Typography variant="largeBoldFont" style={{ lineHeight: 1.5 }}>
                  {price} €
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
              <Grid item xs={12} md={12} lg={6} xl={5}>
                <TextField
                  autoComplete="off"
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

              {/* Commented out for now, if the feature of adding more emails is created */}
              {/* <Grid item xs={1}>
                {index === emailFields.length - 1 && (
                  <Button
                    style={{ minWidth: 0 }}
                    id="add-email-button"
                    color="addEmailButton"
                    variant="containedAddEmailButton"
                    onClick={handleAddEmailFields}
                  >
                    <img
                      src={DarkMode ? plusSignWhite : plusSign}
                      alt="Plus Icon"
                      id="plus-icon"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </Button>
                )}
              </Grid> */}
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
