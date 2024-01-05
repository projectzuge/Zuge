import './../Styles/UserMenu.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
} from '@mui/material';

UserMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.func
};

function UserMenu({ anchorEl, open, handleClose, handleItemClick }) {

  const menuStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: "400px",
  };

  const customCursorStyle = {
    cursor: 'default',
    backgroundColor: 'transparent',
  };
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    margin: 'auto',
    marginTop: '20px',
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  const inputFieldStyle = {
    width: '100%',
    marginBottom: '16px',
  };

  const buttonsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };

  const buttonStyle = {
    color: '#262626',
    border: "solid",
  };

  const registerTextStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };

  return (
    <>
      <div className="UserMenuBody">
        <Menu
          id="userMenu"
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
          <MenuItem disableRipple  style={customCursorStyle}>
            <div style={containerStyle}>
              <FormControl style={inputFieldStyle} variant="outlined">
                <FormLabel style={labelStyle}>Sähköposti</FormLabel>
                <TextField variant="outlined" fullWidth />
              </FormControl>
              <FormControl style={inputFieldStyle} variant="outlined">
                <FormLabel style={labelStyle}>Salasana</FormLabel>
                <TextField variant="outlined" type="password" fullWidth />
              </FormControl>
              <div style={buttonsContainerStyle}>
                <Button  onClick={handleItemClick} style={buttonStyle}>
                  Kirjaudu
                </Button>
                <Button  onClick={handleItemClick} style={buttonStyle}>
                  Peruuta
                </Button>
              </div>
              <Typography variant="body1" style={registerTextStyle}>
                Uusi käyttäjä? Rekisteröidy tästä:
              </Typography>
              <Button  onClick={handleItemClick} style={buttonStyle}>
                Rekisteröidy
              </Button>
            </div>
          </MenuItem>
        </Menu>        
      </div>
    </>
  )
}

export default UserMenu;