import {
  profileButtonStyle,
  profileButtonStyleDark,
  logoutButtonStyle,
  logoutButtonStyleDark,
  formContainerStyle,
} from "./../Styles/LoggedInFormStyles.jsx";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import LogoutLink from "../Components/LogoutLink";
import { useNavigate } from "react-router-dom";

LoggedInForm.propTypes = {
  setSignedIn: PropTypes.func,
  DarkMode: PropTypes.bool,
  handleItemClick: PropTypes.func,
  setCookie: PropTypes.func,
  removeCookie: PropTypes.func,
};

function LoggedInForm({
  handleItemClick,
  setSignedIn,
  DarkMode,
  removeCookie,
}) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/user");
  };

  const handleLogOut = () => {
    setSignedIn(false);
    removeCookie("userData");
  };

  return (
    <>
      <Container style={formContainerStyle}>
        <Button
          onClick={() => {
            handleProfileClick();
            handleItemClick();
          }}
          style={DarkMode ? profileButtonStyleDark : profileButtonStyle}
          variant="contained"
        >
          Profiili
        </Button>
        <LogoutLink handleLogout={handleLogOut} removeCookie={removeCookie}>
          <Button
            onClick={() => {
              handleItemClick();
            }}
            style={DarkMode ? logoutButtonStyleDark : logoutButtonStyle}
            variant="contained"
          >
            <Typography sx={{ textDecoration: "none" }}>
              Kirjaudu ulos
            </Typography>
          </Button>
        </LogoutLink>
      </Container>
    </>
  );
}

export default LoggedInForm;
