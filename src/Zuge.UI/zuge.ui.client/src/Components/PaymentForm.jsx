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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentForm = ({ DarkMode }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [price, setPrice] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEmptyFirstName, setIsEmptyFirstName] = useState(false);
  const [isEmptyLastName, setIsEmptyLastName] = useState(false);
  const [isValidCvc, setIsValidCvc] = useState(null);
  const [isValidCardNum, setIsValidCardNum] = useState(null);

  const navigate = useNavigate();
  const [selectedJourney, setSelectedJourney] = useState(
    useJourney().selectedJourney
  );
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emails = JSON.parse(sessionStorage.getItem("emailsForTickets"));

  const savedRouteState = JSON.parse(sessionStorage.getItem("routeDataState"));
  useEffect(() => {
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

    if (checkLuhn(cardNumberNoSpaces)) {
      setIsValidCardNum(true);
    } else {
      setIsValidCardNum(false);
    }
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

  const checkAreEmailsValid = (emails) => {
    console.log("emails:", emails);
    if (emails === null) {
      return false;
    } else {
      emails.forEach((email) => {
        if (!email.match(isValidEmail)) {
          return false;
        }
      });
    }
    return true;
  };

  const convertDate = (date) => {
    const [month, year] = date.split("/");
    const newYearString = `20${year}-${month}-01`;
    return newYearString;
  };

  const onFirstNameChange = (e) => {
    if (e.target.value && e.target.value.length > 0) {
      setFirstName(e.target.value);
      setIsEmptyFirstName(false);
    } else {
      setIsEmptyFirstName(true);
    }
  };

  const onLastNameChange = (e) => {
    if (e.target.value && e.target.value.length > 0) {
      setLastName(e.target.value);
      setIsEmptyLastName(false);
    } else {
      setIsEmptyLastName(true);
    }
  };

  const onCvcChange = (e) => {
    const cvcNoSpaces = e.target.value.replace(/[\s_]/g, "");
    setCvc(cvcNoSpaces);
    if (cvcNoSpaces && cvcNoSpaces.length > 2) {
      setIsValidCvc(true);
    } else {
      setIsValidCvc(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const formattedExpiryDate = convertDate(expiryDate);
    if (
      !checkLuhn(cardNumber) ||
      erroredInputs.cvc ||
      erroredInputs.expiryDate ||
      cardNumber.length === 0 ||
      cvc.length === 0 ||
      expiryDate === 0 ||
      firstName.length === 0 ||
      lastName.length === 0
    ) {
      toast.error("Tarkista kortin tiedot.", {
        position: "top-center",
        closeOnClick: false,
        closeButton: true,
        autoClose: 15000,
      });
    } else if (!checkAreEmailsValid(emails)) {
      window.alert("Tarkista sähköpostiosoite");
      navigate(-1);
    } else {
      await axios
        .post("purchase", {
          cardCvc: cvc,
          cardDate: formattedExpiryDate,
          cardHolder: firstName + " " + lastName,
          cardNumber: cardNumber,
          emailAddress: emails[0],
          journeyId: savedRouteState.id,
        })
        .then((response) => {
          if (response.data.success) {
            navigate("/purchaseDone");
          } else {
            console.error("Something went wrong with purchase.");
            toast.error(
              "Maksu epäonnistui. Tarkista tiedot ja yritä uudelleen. Muussa tapauksessa ota yhteyttä asiakaspalveluun.",
              {
                position: "top-center",
                closeOnClick: false,
                closeButton: true,
                autoClose: 15000,
              }
            );
          }
        })
        .catch((error) => {
          console.error("Something went wrong with purchase:", error);
          toast.info(
            "Maksu epäonnistui. Tarkista tiedot ja yritä uudelleen. Muussa tapauksessa ota yhteyttä asiakaspalveluun.",
            {
              position: "top-center",
              closeOnClick: false,
              closeButton: true,
              autoClose: 15000,
            }
          );
        });
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
                mask="9999 9999 9999 9999"
                placeholder="#### #### #### ####"
                fullWidth
                required
                value={cardNumber}
                onChange={onCardNumberChange}
                alwaysShowMask={true}
              >
                {() => (
                  <TextField
                    borderRadius={"10px"}
                    error={!isValidCardNum && isValidCardNum !== null}
                    helperText={
                      !isValidCardNum && isValidCardNum !== null
                        ? "Tarkista kortin numero."
                        : ""
                    }
                    InputProps={{
                      sx: {
                        border:
                          !isValidCardNum && isValidCardNum !== null
                            ? "1px solid red"
                            : "none",
                      },
                    }}
                  />
                )}
              </InputMask>{" "}
              {/* <Typography variant="smallFont" sx={{ color: "red !important" }}>
                {!checkLuhn(cardNumber) ? erroredInputs.cardNumber : "\u00a0"}
              </Typography> */}
            </Grid>
          </Grid>
          <Grid container spacing={3} marginBottom={"20px"}>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Grid container direction={"column"} textAlign={"start"}>
                <Typography variant="mediumFont" marginBottom={"10px"}>
                  Etunimi
                </Typography>

                <TextField
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: "5px",
                      border: isEmptyFirstName ? "1px solid red" : "none",
                    },
                  }}
                  id="profile-first-name-field"
                  fullWidth
                  defaultValue={firstName}
                  onChange={onFirstNameChange}
                  required
                  error={isEmptyFirstName}
                  helperText={isEmptyFirstName ? "Lisää etunimi" : ""}
                >
                  {firstName}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Grid container direction={"column"} textAlign={"start"}>
                <Typography variant="mediumFont" marginBottom={"10px"}>
                  Sukunimi
                </Typography>
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: "5px",
                      border: isEmptyLastName ? "1px solid red" : "none",
                    },
                  }}
                  id="profile-last-name-field"
                  fullWidth
                  defaultValue={lastName}
                  onChange={onLastNameChange}
                  required
                  error={isEmptyLastName}
                  helperText={isEmptyLastName ? "Lisää sukunimi" : ""}
                >
                  {lastName}
                </TextField>

                <Typography variant="smallFont" color="red"></Typography>
              </Grid>
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
                  {() => (
                    <TextField
                      InputProps={{
                        sx: {
                          borderRadius: "5px",
                          border: erroredInputs.expiryDate
                            ? "1px solid red"
                            : "none",
                        },
                      }}
                      error={erroredInputs.expiryDate}
                      helperText={
                        erroredInputs.expiryDate ? erroredInputs.expiryDate : ""
                      }
                    />
                  )}
                </InputMask>
                {/* <Typography variant="smallFont" color="red">
                  {erroredInputs.expiryDate
                    ? erroredInputs.expiryDate
                    : "\u00a0"}
                </Typography> */}
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
                  onChange={onCvcChange}
                  alwaysShowMask={true}
                >
                  {() => (
                    <TextField
                      InputProps={{
                        sx: {
                          borderRadius: "5px",
                          border:
                            !isValidCvc && isValidCvc !== null
                              ? "1px solid red"
                              : "none",
                        },
                      }}
                      error={!isValidCvc && isValidCvc !== null}
                      helperText={
                        !isValidCvc && isValidCvc !== null
                          ? "Tarkista CVC-luku"
                          : ""
                      }
                    />
                  )}
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
