import Box from "@mui/material/Box";
import "../Styles/ProfileComponent.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileComponent = ({ DarkMode, cookies, setCookie }) => {
  const userInfo = cookies.userData;
  let borderStyle = "none";
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || "");
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [phoneNumberNotValid, setPhoneNumberNotValid] = useState(false);
  const [isEmptyFirstName, setIsEmptyFirstName] = useState(false);
  const [isEmptyLastName, setIsEmptyLastName] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setPhoneNumber(userInfo.phoneNumber || "");
      setEmail(userInfo.email || "");
    }
  }, [userInfo]);

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
      e.target.value.length > 9 &&
      e.target.value.length < 21 &&
      /^[\d,+]+$/.test(e.target.value)
    ) {
      setPhoneNumber(e.target.value);
      setShowSaveButton(true);
      setPhoneNumberNotValid(false);
    } else {
      setPhoneNumberNotValid(true);
    }
  };

  const onSaveClicked = async (e) => {
    e.preventDefault();

    if (firstName !== "" && lastName !== "" && !phoneNumberNotValid) {
      await axios
        .put("account/manage/info", { firstName, lastName, phoneNumber })
        .then((response) => {
          if (response.status === 200) {
            setShowSaveButton(false);
            setCookie("userData", response.data);
            toast.success("Tallennettu!");
          } else {
            toast.error("Jotain meni pieleen. Yritä pian uudelleen");
            setShowSaveButton(true);
          }
        })
        .catch((error) => {
          console.error("Something went wrong:", error);
          setShowSaveButton(true);
          toast.error("Jotain meni pieleen. Yritä pian uudelleen");
        });
      // PUT REQUEST FOR BACKEND
      // sähköpostin vaihto (newEmail) ei toimi ennen kuin toteutetaan email confirmation,
      // mutta tekisi testaamisesta vaikeaa/ärsyttävää
      // salasanan vaihto kuitenkin onnistuu
      // axios.post("account/manage/info", {newEmail, newPassword, oldPassword})
      // axios.put("account/manage/info", {firstName, lastName, phoneNumber})
    } else {
      toast.error("Virheelliset tai puuttuvat tiedot.");
    }
  };
  return (
    <>
      <Box id={DarkMode ? "personal-info-box-dark" : "personal-info-box"}>
        <form onSubmit={onSaveClicked}>
          <Grid container id="textfield-grid" spacing="20px">
            <Grid item xs={12}>
              <Typography variant="largeBoldFont">Henkilötiedot</Typography>
            </Grid>
            <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              <TextField
                variant="outlined"
                InputProps={{ sx: { borderRadius: "10px" } }}
                id="profile-first-name-field"
                fullWidth
                defaultValue={firstName}
                onChange={onFirstNameChange}
                required
                error={isEmptyFirstName}
                helperText={
                  isEmptyFirstName ? "Etunimi ei voi olla tyhjä." : ""
                }
              >
                {firstName}
              </TextField>
            </Grid>
            <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              <TextField
                InputProps={{ sx: { borderRadius: "10px" } }}
                id="profile-last-name-field"
                fullWidth
                defaultValue={lastName}
                onChange={onLastNameChange}
                required
                error={isEmptyLastName}
                helperText={
                  isEmptyLastName ? "Sukunimi ei voi olla tyhjä." : ""
                }
              >
                {lastName}
              </TextField>
            </Grid>
            <Grid id="profile-item-grid" item xs={12} md={12} lg={6} xl={6}>
              <TextField
                InputProps={{ sx: { borderRadius: "10px" }, readOnly: true }}
                type="email"
                id="profile-email-field"
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
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                  },
                }}
                id="profile-phone-number-field"
                fullWidth
                defaultValue={phoneNumber}
                onChange={onPhoneNumberChange}
                required
                error={phoneNumberNotValid}
                helperText={
                  phoneNumberNotValid ? "Tarkista puhelinnumero." : ""
                }
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
