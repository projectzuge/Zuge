import './../Styles/UserMenu.css';
import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
  InputAdornment, 
  IconButton
} from '@mui/material';
import { Link } from "react-router-dom";

UserMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.func
};

function UserMenu({ anchorEl, open, handleClose, handleItemClick }) {

  const [showPasswordUser, setShowPasswordUser] = useState(false);

  const handleUserPasswordVisibility = () => {
    setShowPasswordUser(!showPasswordUser);
  };

  const menuStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: "400px",
    backgroundColor: "#eeeeee",
    overflow: "auto",
  };

  const customCursorStyle = {
    cursor: 'default',
    backgroundColor: 'transparent',
  };
  
  const containerStyle = {
    backgroundColor: "#eeeeee",
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

  const buttonRegisterStyle = {
    color: '#262626',
    border: "solid",
    padding: "0px",
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
                <TextField 
                variant="outlined" 
                type={showPasswordUser ? 'text' : 'password'} 
                fullWidth 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleUserPasswordVisibility} edge="end">
                        {showPasswordUser ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                />
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
              <Button onClick={handleItemClick} style={buttonRegisterStyle}>
                <Link className="registerLink" to="/register">Rekisteröidy
                </Link>
              </Button>
            </div>
          </MenuItem>
        </Menu>        
      </div>
    </>
  )
}

export default UserMenu;