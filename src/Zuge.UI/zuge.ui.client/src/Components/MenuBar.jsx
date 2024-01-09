import "./../Styles/MenuBar.css";
import trainLogo from "./../assets/trainLogo.jpg";
import dropDownMenuLogo from "./../assets/dropDownMenuLogo.jpg";
import exitDropDownMenuLogo from "./../assets/ExitDropDownMenuLogo.jpg";
import DropDownMenu from "./DropDownMenu.jsx";
import Button from "@mui/material/Button";
import { useState } from "react";
//import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function MenuBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const variant = isSmallScreen ? "smallBoldFont" : "mediumBoldFont";

  const [dropDownClicked, setDropDownClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDropDownClicked(!dropDownClicked);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDropDownClicked(!dropDownClicked);
  };

  return (
    <>
      <div className="Bar">
        <div className="HomePageButton">
          <Link to="/">
            <img className="LogoImage" src={trainLogo} alt="Train logo"></img>
          </Link>
        </div>
        <div className="MenuLink">
          <Link to="/SingleNews">
            <Typography variant={variant}>Uutiset</Typography>
          </Link>
        </div>
        <div className="MenuLink">
          <Link to="/contact">
            <Typography variant={variant}>Yhteystiedot ja palaute</Typography>
          </Link>
        </div>
        <div className="MenuLink">
          <Link to="/user">
            <Typography variant={variant}>Käyttäjä</Typography>
          </Link>
        </div>
        <div className="toggleContainerMenu">
          <Typography variant={variant} className="DarkThemeTextMenu">
            Tumma tila
          </Typography>
          <div className="switchContainer">
            <input type="checkbox" id="switchMenu" className="checkboxMenu" />
            <label htmlFor="switchMenu" className="toggleMenu"></label>
          </div>
        </div>
        <div className="DropDownMenuButtonBody">
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Link>
              <img
                className={
                  dropDownClicked
                    ? "DropDownMenuImageInvisible"
                    : "DropDownMenuImageVisible"
                }
                src={dropDownMenuLogo}
                alt="Dropdown menu logo"
              ></img>
              <img
                className={
                  dropDownClicked
                    ? "ExitDropDownMenuImageVisible"
                    : "ExitDropDownMenuImageInvisible"
                }
                src={exitDropDownMenuLogo}
                alt="Exit dropdown menu logo"
              ></img>
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="DropDownMenuBody">
          <DropDownMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
          />
        </div>
      </div>
    </>
  );
}

export default MenuBar;
