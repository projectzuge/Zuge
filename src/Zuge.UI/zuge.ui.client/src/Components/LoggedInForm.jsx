import "./../Styles/LoggedInForm.css";
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

function LoggedInForm({ handleItemClick, setSignedIn, DarkMode, 
  removeCookie }) {
  const navigate = useNavigate();

  const profileButtonStyle = {
    backgroundColor: "#eeeeee",
    color: "#262626",
    border: "1px solid #262626",
    marginBottom: "20px",
    width: "200px",
    "&:hover": {
      borderWidth: "1px",
    },
  };

  const profileButtonStyleDark = {
    backgroundColor: "#262626",
    color: "#eeeeee",
    border: "1px solid #eeeeee",
    marginBottom: "20px",
    width: "200px",
    "&:hover": {
      borderWidth: "1px",
    },
  };

  const logoutButtonStyle = {
    backgroundColor: "#eeeeee",
    color: "#262626",
    border: "1px solid #262626",
    marginTop: "20px",
    marginBottom: "20px",
    width: "200px",
    "&:hover": {
      borderWidth: "1px",
    },
  };

  const logoutButtonStyleDark = {
    backgroundColor: "#262626",
    color: "#eeeeee",
    border: "1px solid #eeeeee",
    marginTop: "20px",
    marginBottom: "20px",
    width: "200px",
    "&:hover": {
      borderWidth: "1px",
    },
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  };

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
        <LogoutLink handleLogout={handleLogOut}>
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
