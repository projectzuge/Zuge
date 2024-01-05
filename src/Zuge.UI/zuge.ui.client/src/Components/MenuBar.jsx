import './../Styles/MenuBar.css';
import trainLogo from "./../assets/trainLogo.jpg";
import dropDownMenuLogo from "./../assets/dropDownMenuLogo.jpg";
import exitDropDownMenuLogo from "./../assets/ExitDropDownMenuLogo.jpg";
import DropDownMenu from "./DropDownMenu.jsx";
import UserMenu from "./UserMenu.jsx";
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link } from "react-router-dom";


function MenuBar() {
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
      setAnchorElUser(document.getElementById('UserLink'));
    }
    else {
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

  return (
    <>
        <div className="Bar">
          <div className="HomePageButton">
            <Link to="/">
              <img className="LogoImage" src={trainLogo} alt="Train logo"></img>
            </Link>
          </div>
          <div className="MenuLink">
            <Link to="/SingleNews">Uutiset
            </Link>
          </div>
          <div className="MenuLink">
            <Link to="/contact">Yhteystiedot ja palaute
            </Link>
          </div>
          <div className="MenuLink">
            <Link id="UserLink" to="/user"
              onClick={handleClickUser}
              >Käyttäjä
            </Link>
          </div>
          <div className="toggleContainerMenu">
            <p className="DarkThemeTextMenu">Tumma tila</p>
            <div className="switchContainer">
              <input type="checkbox"
                    id="switchMenu"
                    className="checkboxMenu" />     
              <label htmlFor="switchMenu"
                    className="toggleMenu">
              </label>
            </div>
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
          <div className="UserMenuBody">
            <UserMenu 
              anchorEl={anchorElUser} 
              open={openUser} 
              handleClose={handleCloseUser}
              handleItemClick={handleItemClick}/>
          </div>
        </div>
        <div>
          <div className="DropDownMenuBody">
            <DropDownMenu 
              anchorEl={anchorEl} 
              open={open} 
              handleClose={handleClose}
              handleClickUser={handleClickUser}
              handleItemClick={handleItemClick}/>
          </div>
        </div>
    </>
  )
}

export default MenuBar;