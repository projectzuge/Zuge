import './../Styles/MenuBar.css';
import trainLogo from "./../assets/trainLogo.jpg";
import dropDownMenuLogo from "./../assets/dropDownMenuLogo.jpg";
import exitDropDownMenuLogo from "./../assets/ExitDropDownMenuLogo.jpg";
import DropDownMenu from "./DropDownMenu.jsx";
import Button from '@mui/material/Button';
import { useState } from 'react';

function MenuBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="Bar">
        <button className="HomePageButton">
          <img className="LogoImage" src={trainLogo} alt="Train logo"></img>
        </button>
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
            onClick={handleClick}>
              <img className="DropDownMenuImage" src={dropDownMenuLogo} alt="Dropdown menu logo"></img>
              <img className="ExitDropDownMenuImage" src={exitDropDownMenuLogo} alt="Exit dropdown menu logo"></img>
          </Button>
        </div>
      </div>
      <div>
        <div className="DropDownMenuBody">
          <DropDownMenu anchorEl={anchorEl} open={open} handleClose={handleClose}/>
        </div>
      </div>
    </>
  )
}

export default MenuBar;