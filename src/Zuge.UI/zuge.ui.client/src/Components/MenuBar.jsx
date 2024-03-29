import "./../Styles/MenuBar.css";
import trainLogo from "./../assets/trainLogo.jpg";
import trainLogoDark from "./../assets/trainLogoDark.jpg";
import dropDownMenuLogo from "./../assets/dropDownMenuLogo.jpg";
import dropDownMenuLogoDark from "./../assets/dropDownMenuLogoDark.jpg";
import exitDropDownMenuLogo from "./../assets/ExitDropDownMenuLogo.jpg";
import exitDropDownMenuLogoDark from "./../assets/ExitDropDownMenuLogoDark.jpg";
import DropDownMenu from "./DropDownMenu.jsx";
import UserMenu from "./UserMenu.jsx";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";

MenuBar.propTypes = {
  DarkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
  cookies: PropTypes.any,
  setCookie: PropTypes.func,
  removeCookie: PropTypes.func,
};

function MenuBar({ DarkMode, setDarkMode, cookies, setCookie, removeCookie }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const variant = isSmallScreen ? "smallBoldFont" : "mediumBoldFont";
  const [dropDownClicked, setDropDownClicked] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorEl);
  const openUser = Boolean(anchorElUser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDropDownClicked(true);
  };

  const handleClickUser = (event) => {
    if (event.currentTarget.id !== "UserLink") {
      setAnchorElUser(anchorEl);
    } else {
      setAnchorElUser(event.currentTarget);
    }
    setUserClicked(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDropDownClicked(false);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
    setUserClicked(false);
  };

  const handleItemClick = () => {
    setAnchorEl(null);
    setAnchorElUser(null);
    setDropDownClicked(false);
    setUserClicked(false);
  };

  const switchLightDark = () => {
    if (DarkMode) {
      setCookie("DarkMode", false, { maxAge: 3600 * 24 });
      setDarkMode(false);
    } else {
      setCookie("DarkMode", true, { maxAge: 3600 * 24 });
      setDarkMode(true);
    }
  };

  return (
    <>
      <div className={DarkMode ? "Bar dark" : "Bar light"}>
        <div className={DarkMode ? "HomePageButtonDark" : "HomePageButton"}>
          <Link to="/">
            <img
              className="LogoImage"
              src={DarkMode ? trainLogoDark : trainLogo}
              alt="Train logo"
            ></img>
          </Link>
        </div>
        <div className="MenuLink">
          <Link to="/SingleNews">
            <Typography variant={variant}>Uutiset</Typography>
          </Link>
        </div>
        <div className="MenuLink">
          <Link to="/contact">
            <Typography variant={variant}>Yhteystiedot</Typography>
          </Link>
        </div>
        <div className="MenuLink">
          <Link id="UserLink" onClick={handleClickUser}>
            <Typography variant={variant}>
              {cookies.userData ? cookies.userData.firstName : "Käyttäjä"}
            </Typography>
          </Link>
        </div>
        <div className="toggleContainerMenu">
          <div className="typographyDiv">
            <Typography variant={variant} className="DarkThemeTextMenu">
              Tumma tila
            </Typography>
          </div>
          <div className="switchContainer">
            <input
              type="checkbox"
              id="switchMenu"
              className="checkboxMenu"
              checked={DarkMode}
              onChange={switchLightDark}
            />
            <label htmlFor="switchMenu" className="toggleMenu"></label>
          </div>
        </div>
        <div
          className={
            DarkMode
              ? "DropDownMenuButtonBody dark"
              : "DropDownMenuButtonBody light"
          }
        >
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Link style={{ fontSize: 0 }}>
              <img
                className={
                  dropDownClicked
                    ? "DropDownMenuImageInvisible"
                    : "DropDownMenuImageVisible"
                }
                src={DarkMode ? dropDownMenuLogoDark : dropDownMenuLogo}
                alt="Dropdown menu logo"
              ></img>
              <img
                className={
                  dropDownClicked
                    ? "ExitDropDownMenuImageVisible"
                    : "ExitDropDownMenuImageInvisible"
                }
                src={DarkMode ? exitDropDownMenuLogoDark : exitDropDownMenuLogo}
                alt="Exit dropdown menu logo"
              ></img>
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="UserMenuBody">
          <UserMenu
            anchorEl={anchorElUser}
            open={openUser}
            handleClose={handleCloseUser}
            handleItemClick={handleItemClick}
            DarkMode={DarkMode}
            cookies={cookies}
            setCookie={setCookie}
            removeCookie={removeCookie}
          />
        </div>
      </div>
      <div>
        <div className="DropDownMenuBody">
          <DropDownMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            handleClickUser={handleClickUser}
            handleItemClick={handleItemClick}
            switchLightDark={switchLightDark}
            DarkMode={DarkMode}
            cookies={cookies}
          />
        </div>
      </div>
    </>
  );
}

export default MenuBar;
