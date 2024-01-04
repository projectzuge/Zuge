import './../Styles/DropDownMenu.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
function DropDownMenu({ anchorEl, open, handleClose }) {

  return (
    <>
      <div className="DropDownBody">
        <Menu
          id="dropDownMenu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <button className="NewsButton">
              <ul>
                <li className="drop-down-menu">
                  <Link to="/SingleNews" className="menu-link active">
                    Single News Page
                  </Link>
                </li>
              </ul>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="NewsButton">
              <p>Yhteystiedot ja palaute</p>
            </button>
          </MenuItem>
          <MenuItem>
            <div className="DarkThemeBody">
            <p className="DarkThemeText">Tumma tila</p>
            <input type="checkbox"
                  id="switch"
                  className="checkbox" />     
            <label htmlFor="switch"
                  className="toggle">
            </label>
            </div>
          </MenuItem>
        </Menu>        
      </div>
    </>
  )
}

export default DropDownMenu;