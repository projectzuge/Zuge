import Box from "@mui/material/Box";
import "../Styles/ProfileComponent.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

const ProfileComponent = () => {
  // these will be users own information when such info is available!!!
  const [firstName, setFirstName] = useState("Enni");
  const [lastName, setLastName] = useState("Esimerkki");
  const [email, setEmail] = useState("enni.esimerkki@emaili.com");
  const [phoneNumber, setPhoneNumber] = useState("+358411231231");
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [phoneNumberNotValid, setPhoneNumberNotValid] = useState(false);
  const [isEmptyFirstName, setIsEmptyFirstName] = useState(false);
  const [isEmptyLastName, setIsEmptyLastName] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const onFirstNameChange = (e) => {
    if (e.target.value && e.target.value.length > 0) {
      setFirstName(e.target.value);
      setIsEmptyFirstName(false);
      setShowSaveButton(true);
    } else {
      setIsEmptyFirstName(true);
    }
  };

  const onLastNameChange = (e) => {
    if (e.target.value && e.target.value.length > 0) {
      setLastName(e.target.value);
      setIsEmptyLastName(false);
      setShowSaveButton(true);
    } else {
      setIsEmptyLastName(true);
    }
  };

  const onEmailChange = (e) => {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setEmailNotValid(false);
      setEmail(e.target.value);
      setShowSaveButton(true);
    } else {
      setEmailNotValid(true);
    }
  };

  const onPhoneNumberChange = (e) => {
    e.preventDefault();
    if (
      e.target.value &&
      e.target.value.length > 6 &&
      e.target.value.length < 14 &&
      /^[\d,+]+$/.test(e.target.value)
    ) {
      setPhoneNumber(e.target.value);
      setShowSaveButton(true);
      setPhoneNumberNotValid(false);
    } else {
      setPhoneNumberNotValid(true);
    }
  };

  const onSaveClicked = (e) => {
    e.preventDefault();

    if (
      firstName !== "" &&
      lastName !== "" &&
      !emailNotValid &&
      !phoneNumberNotValid
    ) {
      // PUT REQUEST FOR BACKEND
      // axios.post("/account/manage/info", {newEmail, newPassword, oldPassword})
      window.alert("Saved");
      setShowSaveButton(false);
    } else {
      window.alert("Invalid or missing inputs");
    }
  };
  return (
    <>
      <Box id="personal-info-box">
        <form onSubmit={onSaveClicked}>
          <Grid container id="textfield-grid" spacing="20px">
            <Grid item xs={12}>
              <Typography variant="largeBoldFont">Henkilötiedot</Typography>
            </Grid>
            <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              <TextField
                variant="outlined"
                InputProps={{ sx: { borderRadius: "10px" } }}
                id="profile-text-field"
                fullWidth
                defaultValue={firstName}
                onChange={onFirstNameChange}
                required
                error={isEmptyFirstName}
              >
                {firstName}
              </TextField>
            </Grid>
            <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              <TextField
                InputProps={{ sx: { borderRadius: "10px" } }}
                id="profile-text-field"
                fullWidth
                defaultValue={lastName}
                onChange={onLastNameChange}
                required
                error={isEmptyLastName}
              >
                {lastName}
              </TextField>
            </Grid>
            <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              <TextField
                InputProps={{ sx: { borderRadius: "10px" } }}
                type="email"
                id="profile-text-field"
                fullWidth
                defaultValue={email}
                onChange={onEmailChange}
                required
                error={emailNotValid}
              >
                {email}
              </TextField>
            </Grid>
            <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              <TextField
                InputProps={{ sx: { borderRadius: "10px" } }}
                id="profile-text-field"
                fullWidth
                defaultValue={phoneNumber}
                onChange={onPhoneNumberChange}
                required
                error={phoneNumberNotValid}
              >
                {phoneNumber}
              </TextField>
            </Grid>
            {/* Don't delete this button yet! :  */}
            {/* <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              <Button fullWidth color={"secondary"} variant="contained">
                Vaihda salasana
              </Button>
            </Grid> */}
            <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              {" "}
              {showSaveButton ? (
                <Button
                  fullWidth
                  color={"secondary"}
                  variant="contained"
                  type="submit"
                >
                  Tallenna
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default ProfileComponent;
