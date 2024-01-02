import './../Styles/MenuBar.css';
import trainLogo from "./../assets/trainLogo.jpg";
import dropDownMenuLogo from "./../assets/dropDownMenuLogo.jpg";
import exitDropDownMenuLogo from "./../assets/ExitDropDownMenuLogo.jpg";
import DropDownMenu from "./DropDownMenu.jsx";
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link } from "react-router-dom";


function MenuBar() {
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
          <Link className="HomePageButton" to="/">
            <img className="LogoImage" src={trainLogo} alt="Train logo"></img>
          </Link>
          <Link className="MenuLink"><p>Uutiset</p>
          </Link>
          <Link className="MenuLink" to="/contact"><p>Yhteystiedot ja palaute</p>
          </Link>
          <Link className="MenuLink" to="/user"><p>Käyttäjä</p>
          </Link>
          <div className="toggleContainerMenu">
            <p className="DarkThemeText">Tumma tila</p>
            <input type="checkbox"
                  id="switchMenu"
                  className="checkboxMenu" />     
            <label htmlFor="switchMenu"
                  className="toggleMenu">
            </label>
          </div>  
          <div className="DropDownMenuButtonBody">
            <Button
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              >
                <Link>
                  <img className=
                  {dropDownClicked?"DropDownMenuImageInvisible":"DropDownMenuImageVisible"} 
                  src={dropDownMenuLogo} 
                  alt="Dropdown menu logo">
                  </img>
                  <img className=
                  {dropDownClicked?"ExitDropDownMenuImageVisible":"ExitDropDownMenuImageInvisible"} 
                  src={exitDropDownMenuLogo} 
                  alt="Exit dropdown menu logo">
                  </img>
                </Link>
            </Button>
          </div>
        </div>
        <div>
          <div className="DropDownMenuBody">
            <DropDownMenu 
              anchorEl={anchorEl} 
              open={open} 
              handleClose={handleClose}/>
          </div>
        </div>
    </>
  )
}

export default MenuBar;