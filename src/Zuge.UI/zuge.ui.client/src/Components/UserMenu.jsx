import './../Styles/UserMenu.css';
import Menu from '@mui/material/Menu';
import Login from "./Login.jsx";
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

function UserMenu({
  anchorEl,
  open,
  handleClose,
  handleItemClick,
  DarkMode,
  cookies,
  setCookie,
  removeCookie,
}) {
  const [signedIn, setSignedIn] = useState(
    cookies.userData !== null && cookies.userData !== undefined
  );

  const menuStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    width: "400px",
    backgroundColor: "#eeeeee",
    overflow: "auto",
  };
  useEffect(() => {
    setSignedIn(cookies.userData !== null && cookies.userData !== undefined);
  },[cookies.userData]);
  
  return (
    <>
      <div className="UserMenuBody">
        <Menu
          id={DarkMode ? "userMenuDark" : "userMenu"}
          disableScrollLock={true}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            style: menuStyle,
          }}
        >
          {signedIn ? (
            <LoggedInForm
              handleItemClick={handleItemClick}
              setSignedIn={setSignedIn}
              DarkMode={DarkMode}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          ) : (
            <Login
              handleItemClick={handleItemClick}
              setSignedIn={setSignedIn}
              DarkMode={DarkMode}
              cookies={cookies}
              setCookie={setCookie}
            />
          )}
        </Menu>
      </div>
    </>
  );
}

export default UserMenu;