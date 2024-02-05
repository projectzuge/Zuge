import './../Styles/UserMenu.css';
import Menu from '@mui/material/Menu';
import LoginForm from "./LoginForm.jsx";
import LoggedInForm from "./LoggedInForm.jsx";
import { useState } from "react";
import PropTypes from 'prop-types';

UserMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.func,
  DarkMode: PropTypes.bool
};

function UserMenu({ anchorEl, open, handleClose, handleItemClick, DarkMode }) {
  const [signedIn, setSignedIn] = useState(false);

  const menuStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: "400px",
    backgroundColor: "#eeeeee",
    overflow: "auto",
  };

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
            />
          ) : (
            <LoginForm
              handleItemClick={handleItemClick}
              setSignedIn={setSignedIn}
              DarkMode={DarkMode}
              signedIn={signedIn}
            />
          )}
        </Menu>
      </div>
    </>
  );
}

export default UserMenu;