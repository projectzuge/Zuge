import './../Styles/UserMenu.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

UserMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.func
};

const menuStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
};

function UserMenu({ anchorEl, open, handleClose }) {

  return (
    <>
      <div className="UserMenuBody">
        <Menu
          id="userMenu"
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
          <MenuItem>
              <p><Link className="MenuItemLink" to="/SingleNews">Uutiset</Link></p>
          </MenuItem>
        </Menu>        
      </div>
    </>
  )
}

export default UserMenu;