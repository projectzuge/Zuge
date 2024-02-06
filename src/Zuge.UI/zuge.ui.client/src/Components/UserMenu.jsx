import './../Styles/UserMenu.css';
import Menu from '@mui/material/Menu';
import LoginForm from "./LoginForm.jsx";
import LoggedInForm from "./LoggedInForm.jsx";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

UserMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.func,
  DarkMode: PropTypes.bool,
  cookies: PropTypes.any,
  setCookie: PropTypes.func,
  removeCookie: PropTypes.func
};

function UserMenu({ anchorEl, open, handleClose, handleItemClick, DarkMode, cookies, setCookie, removeCookie }) {
  const [signedIn, setSignedIn] = useState(false);

  const menuStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: "400px",
    backgroundColor: "#eeeeee",
    overflow: "auto",
  };
  useEffect(() => {
    setSignedIn(cookies.userID !== null && cookies.userID !== undefined);
  },[cookies.userID]);
  
  return (
    <>
      <div className="UserMenuBody">
        <Menu
          id={DarkMode? "userMenuDark" : "userMenu"}
          disableScrollLock={true}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            style: menuStyle,
          }}
        >
          {signedIn ? <LoggedInForm 
          handleItemClick={handleItemClick} 
          setSignedIn={setSignedIn} 
          DarkMode={DarkMode}
          setCookie={setCookie}
          removeCookie={removeCookie}
           /> : 
          <LoginForm 
          handleItemClick={handleItemClick} 
          setSignedIn={setSignedIn} 
          DarkMode={DarkMode} 
          setCookie={setCookie}
          />}
        </Menu>        
      </div>
    </>
  )
}

export default UserMenu;