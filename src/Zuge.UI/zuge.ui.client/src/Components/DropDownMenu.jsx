import './../Styles/DropDownMenu.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

DropDownMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.func,
  handleClickUser: PropTypes.func,
  handleItemClick: PropTypes.func,
  switchLightDark: PropTypes.func,
  DarkMode: PropTypes.bool,
};


function DropDownMenu({ anchorEl, open, handleClose, handleClickUser, handleItemClick, switchLightDark, DarkMode }) {

  return (
    <>
      <div className="DropDownBody">
        <Menu
          disableScrollLock={true}
          id={DarkMode? "dropDownMenuDark" : "dropDownMenu"}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleItemClick}>
              <p><Link className={DarkMode? "MenuItemLink dark" : "MenuItemLink"} to="/SingleNews">Uutiset</Link></p>
          </MenuItem>
          <MenuItem onClick={handleItemClick}>
              <p><Link className={DarkMode? "MenuItemLink dark" : "MenuItemLink"} to="/contact">Yhteystiedot ja palaute</Link></p>
          </MenuItem>
          <MenuItem onClick={(event) => {
            handleItemClick();
            handleClickUser(event);
          }}>
              <p><Link to="/user" className={DarkMode? "MenuItemLink dark" : "MenuItemLink"}>Käyttäjä</Link></p>
          </MenuItem>
          <MenuItem className="emptyItem" disableRipple style={{ backgroundColor: 'transparent' }}>
          </MenuItem>
          <MenuItem id="DarkThemeItem" disableRipple style={{ backgroundColor: 'transparent' }}>
            <div className="DarkThemeBody">
            <p className={DarkMode? "DarkThemeText dark" : "DarkThemeText"}>Tumma tila</p>
            <div className="toggleContainer">
              <input type="checkbox"
                    id="switch"
                    className="checkbox"
                    onClick={switchLightDark} />
              <label htmlFor="switch"
                    className="toggle">
              </label>
            </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default DropDownMenu;
