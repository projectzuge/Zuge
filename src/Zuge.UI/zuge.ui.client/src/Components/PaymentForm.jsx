import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import "../Styles/Payment.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useCreditCardValidator } from "react-creditcard-validator";
import InputMask from "react-input-mask";
import { useJourney } from "../Contexts/SelectedRouteContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentForm = ({ DarkMode }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();
  const [selectedJourney, setSelectedJourney] = useState(
    useJourney().selectedJourney
  );
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const email = JSON.parse(sessionStorage.getItem("emailsForTickets"));

  useEffect(() => {
    const savedRouteState = JSON.parse(
      sessionStorage.getItem("routeDataState")
    );

    if (savedRouteState || selectedJourney) {
      setPrice(savedRouteState.price || selectedJourney.price);
    } else {
      navigate("/");
    }
  }, []);

  const {
    getCardNumberProps,
    getCVCProps,
    getExpiryDateProps,
    meta: { erroredInputs },
  } = useCreditCardValidator();

  const onCardNumberChange = (e) => {
    e.preventDefault();
    const cardNumberNoSpaces = e.target.value.replace(/[\s_]/g, "");
    setCardNumber(cardNumberNoSpaces);
  };

  const checkLuhn = (cardNo) => {
    if (cardNo.length != 16) {
      return false;
    }

    let nDigits = cardNo.length;

    let nSum = 0;
    let isSecond = false;
    for (let i = nDigits - 1; i >= 0; i--) {
      let d = cardNo[i].charCodeAt() - "0".charCodeAt();

      if (isSecond == true) d = d * 2;

      // We add two digits to handle cases that make two digits after doubling
      nSum += parseInt(d / 10, 10);
      nSum += d % 10;

      isSecond = !isSecond;
    }
    return nSum % 10 == 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (
      !checkLuhn(cardNumber) ||
      erroredInputs.cvc ||
      erroredInputs.expiryDate ||
      cardNumber.length === 0 ||
      cvc.length === 0 ||
      expiryDate === 0
    ) {
      window.alert("Tarkista kortin tiedot ja yritä uudelleen.");
    } else if (!email.match(isValidEmail)) {
      window.alert("Tarkista sähköpostiosoite");
      navigate(-1);
    } else {
      await axios
        .post("purchase", {
          cardCvc: { cvc },
          cardDate: "2025-01-01",
          cardHolder: "John Doe",
          cardNumber: { cardNumber },
          emailAddress: "john.doe@zuge.fi",
          journeyId: 1,
        })
        .then((response) => {
          console.log("purchase response:", response);
          navigate("/purchaseDone");
        })
        .catch((error) => {
          console.error("Something went wrong with purchase:", error);
        });

      // needs to check here if the payment really goes through even though the card info was correct
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div id="payment-div">
        <Grid
          container
          id={DarkMode ? "payment-container-dark" : "payment-container"}
        >
          <Typography variant="largeBoldFont" marginBottom="40px">
            {price}€
          </Typography>
          <Grid item xs={12} marginBottom={"20px"}>
            <Grid container direction={"column"} textAlign={"start"}>
              <Typography variant="mediumFont" marginBottom={"10px"}>
                Kortin numero
              </Typography>
              <InputMask
                {...(() => {
                  const { maxLength, ...otherProps } = getCardNumberProps();
                  return otherProps;
                })()}
                InputProps={{ sx: { borderRadius: "10px" } }}
                mask="9999 9999 9999 9999"
                placeholder="#### #### #### ####"
                fullWidth
                required
                value={cardNumber}
                onChange={onCardNumberChange}
                alwaysShowMask={true}
              >
                {() => <TextField />}
              </InputMask>{" "}
              <Typography variant="smallFont" color="red">
                {!checkLuhn(cardNumber) ? erroredInputs.cardNumber : "\u00a0"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Grid container direction={"column"} textAlign={"start"}>
                <Typography variant="mediumFont" marginBottom={"10px"}>
                  Viimeinen voimassaolopäivä
                </Typography>

                <InputMask
                  {...getExpiryDateProps()}
                  InputProps={{ sx: { borderRadius: "10px" } }}
                  fullWidth
                  required
                  value={expiryDate}
                  mask="99/99"
                  placeholder="MM/YY"
                  onChange={(e) => setExpiryDate(e.target.value)}
                  alwaysShowMask={true}
                >
                  {() => <TextField />}
                </InputMask>
                <Typography variant="smallFont" color="red">
                  {erroredInputs.expiryDate
                    ? erroredInputs.expiryDate
                    : "\u00a0"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Grid container direction={"column"} textAlign={"start"}>
                <Typography variant="mediumFont" marginBottom={"10px"}>
                  CVC
                </Typography>
                <InputMask
                  {...getCVCProps()}
                  InputProps={{
                    sx: {
                      borderRadius: "10px",
                    },
                  }}
                  fullWidth
                  required
                  value={cvc}
                  mask="999"
                  placeholder="###"
                  onChange={(e) => setCvc(e.target.value)}
                  alwaysShowMask={true}
                >
                  {() => <TextField />}
                </InputMask>

                <Typography variant="smallFont" color="red">
                  {erroredInputs.cvc ? erroredInputs.cvc : "\u00a0"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} alignItems={"center"} marginTop={"50px"}>
            <Grid container>
              <Grid item xs={12} md={12} lg={5} xl={5} marginBottom={"20px"}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Maksa
                </Button>
              </Grid>
              <Grid item xs={0} md={0} lg={2} xl={2}></Grid>
              <Grid item xs={12} md={12} lg={5} xl={5}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                  fullWidth
                >
                  Peruuta
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

export default PaymentForm;
