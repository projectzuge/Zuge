import "./../Styles/LoginForm.css";
import {
  customCursorStyle,
  containerStyle,
  containerStyleDark,
  labelStyle,
  labelStyleDark,
  inputFieldStyle,
  buttonsContainerStyle,
  buttonStyle,
  buttonStyleDark,
  buttonRegisterStyle,
  buttonRegisterStyleDark,
  registerTextStyle,
  iconDark,
  iconLight
} from "./../Styles/LoginFormStyles.jsx";
import MenuItem from "@mui/material/MenuItem";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";

LoginForm.propTypes = {
  DarkMode: PropTypes.bool,
  isLoginValid: PropTypes.bool,
  isEmailValid: PropTypes.any,
  email: PropTypes.string,
  isPasswordValid: PropTypes.any,
  password:  PropTypes.string,
  showPasswordUser: PropTypes.bool,
  handleItemClick: PropTypes.func,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  rememberMe: PropTypes.bool,
  handleUserPasswordVisibility: PropTypes.func,
  onEmailChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  handlePasswordInput: PropTypes.func,
  handleEmailInput: PropTypes.func,
  handleRememberMeChecked: PropTypes.func,
  handleSignInClicked: PropTypes.func,
};

function LoginForm({ 
  DarkMode, isLoginValid, isEmailValid, email, isPasswordValid, password, 
  showPasswordUser, handleItemClick, setEmail, setPassword, rememberMe, 
  handleUserPasswordVisibility, onEmailChange, onPasswordChange, 
  handlePasswordInput, handleEmailInput, handleRememberMeChecked, 
  handleSignInClicked }) {

  return (
    <>
      <MenuItem disableRipple style={customCursorStyle}>
        <div style={DarkMode ? containerStyleDark : containerStyle}>
          <FormControl style={inputFieldStyle} variant="outlined">
            <FormLabel style={DarkMode ? labelStyleDark : labelStyle}>
              Sähköposti
            </FormLabel>
            <TextField
            sx={{
              outlineStyle: "none",
              borderStyle: "none",
            }}
              className={DarkMode? "darkLoginTextField" : "LoginTextField"}
              onInput={handleEmailInput}
              onChange={onEmailChange}
              onKeyDown={(e) => {
                // Estää focuksen katoamisen s-näppäintä painaessa.
                e.stopPropagation();
              }}
              error={!isEmailValid}
              helperText={!isEmailValid ? "Virheellinen sähköposti" : ""}
              value={email}
              type="email"
              name="email"
              variant="outlined"
              fullWidth
              required
            />
          </FormControl>
          <FormControl style={inputFieldStyle} variant="outlined">
            <FormLabel style={DarkMode ? labelStyleDark : labelStyle}>
              Salasana
            </FormLabel>
            <TextField
              className={DarkMode ? "darkLoginTextField" : "LoginTextField"}
              value={password}
              name="password"
              variant="outlined"
              type={showPasswordUser ? "text" : "password"}
              fullWidth
              error={!isPasswordValid}
              helperText={!isPasswordValid ? "Virheellinen salasana" : ""}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleUserPasswordVisibility}
                      style={DarkMode ? iconDark : iconLight}
                      edge="end"
                    >
                      {showPasswordUser ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onInput={handlePasswordInput}
              onChange={onPasswordChange}
              onKeyDown={(e) => {
                // Estää focuksen katoamisen s-näppäintä painaessa.
                e.stopPropagation();
              }}
            />
          </FormControl>
          <div style={buttonsContainerStyle}>
            <Button
              onClick={handleSignInClicked}
              style={DarkMode ? buttonStyleDark : buttonStyle}
            >
              Kirjaudu
            </Button>
            <Button
              onClick={() => {
                handleItemClick();
                setEmail("");
                setPassword("");
              }}
              style={DarkMode ? buttonStyleDark : buttonStyle}
            >
              Peruuta
            </Button>
          </div>
          <div className="rememberMeCheck">
            <FormControlLabel
              control={
                <Checkbox
                  onClick={handleRememberMeChecked}
                  checked={rememberMe}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: DarkMode ? "#eeeeee" : "#262626",
                    },
                  }}
                />
              }
              label="Muista minut"
            />
          </div>
          <div>
            <Typography
              sx={{
                fontSize: "90%",
                display: "inline",
                color: "#d32f2f !important",
              }}
              style={isLoginValid ? { display: "none" } : { display: "inline" }}
            >
              Kirjautuminen epäonnistui.
            </Typography>
          </div>
          <Typography variant="body1" style={registerTextStyle}>
            Uusi käyttäjä? Rekisteröidy tästä:
          </Typography>
          <Button
            onClick={handleItemClick}
            style={DarkMode ? buttonRegisterStyleDark : buttonRegisterStyle}
          >
            <Link className="registerLink" to="/register">
              Rekisteröidy
            </Link>
          </Button>
        </div>
      </MenuItem>
    </>
  );
}

export default LoginForm;
