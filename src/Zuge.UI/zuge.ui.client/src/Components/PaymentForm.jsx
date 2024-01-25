import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import "../Styles/Payment.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useCreditCardValidator } from "react-creditcard-validator";
import InputMask from "react-input-mask";
import { useJourney } from "../Contexts/SelectedRouteContext";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const selectedJourney = useJourney().selectedJourney;

  const {
    getCardNumberProps,
    getCVCProps,
    getExpiryDateProps,
    meta: { erroredInputs, error },
  } = useCreditCardValidator();

  useEffect(() => {
    console.log("errored inputs: ", erroredInputs);
    console.log("errors:", error);
  }, [erroredInputs]);

  const handlePayment = (e) => {
    e.preventDefault();
    if (
      erroredInputs.cardNumber ||
      erroredInputs.cvc ||
      erroredInputs.expiryDate ||
      cardNumber.length === 0 ||
      cvc.length === 0 ||
      expiryDate === 0
    ) {
      console.log("somethings missing");
    } else {
      console.log("handle payment with values:", cardNumber, expiryDate, cvc);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div id="payment-div">
        <Grid container id="payment-container">
          <Typography variant="largeBoldFont" marginBottom="40px">
            {selectedJourney.price}€
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
                onChange={(e) => setCardNumber(e.target.value)}
                alwaysShowMask={true}
              >
                {() => <TextField />}
              </InputMask>{" "}
              <Typography variant="smallFont">
                {error ? erroredInputs.cardNumber : "\u00a0"}
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
                <Typography variant="smallFont">
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

                <Typography variant="smallFont">
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
                <Button variant="contained" color="primary" fullWidth>
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
