import './../Styles/MenuBar.css';
import trainLogo from "./../assets/trainLogo.jpg";
import dropDownMenuLogo from "./../assets/dropDownMenuLogo.jpg";
import exitDropDownMenuLogo from "./../assets/ExitDropDownMenuLogo.jpg";
import DropDownMenu from "./DropDownMenu.jsx";
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
  Routes, Route, Link
} from "react-router-dom";


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
          <Link className="HomePageButton" to="/home">
            <img className="LogoImage" src={trainLogo} alt="Train logo"></img>
          </Link>
          <div className="UserButtonBody">
            <button className="UserButton">
              <p className="UserText">Käyttäjä</p>
            </button>
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

        {/* <Routes>
          <Route></Route>
          <Route></Route>
        </Routes> */}
    </>
  )
}

export default MenuBar;