import "./../Styles/LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
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
    IconButton
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

LoginForm.propTypes = {
  DarkMode: PropTypes.bool,
  handleItemClick: PropTypes.func,
  setSignedIn: PropTypes.func,
};

function LoginForm({ DarkMode, handleItemClick, setSignedIn }) {
    const [showPasswordUser, setShowPasswordUser] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState("initial");
    const [isPasswordValid, setIsPasswordValid] = useState("initial");
    const [isLoginValid, setIsLoginValid] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const navigate = useNavigate();

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

    const containerStyleDark = {
        backgroundColor: "#262626",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        margin: 'auto',
        marginTop: '20px',
    };

    const labelStyle = {
        ontWeight: 'bold',
    };

    const labelStyleDark = {
        fontWeight: 'bold',
        color: "#eeeeee",
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
        borderWidth: "1px",
    };

    const buttonStyleDark = {
        color: '#eeeeee',
        borderColor: "#eeeeee",
        border: "solid",
        borderWidth: "1px",
    };

    const buttonRegisterStyle = {
        color: '#262626',
        border: "solid",
        borderWidth: "1px",
        padding: "0px",
    };
    
    const buttonRegisterStyleDark = {
        color: '#eeeeee',
        border: "solid",
        borderWidth: "1px",
        padding: "0px",
    };

    const registerTextStyle = {
        marginTop: '20px',
        textAlign: 'center',
    };

    const iconDark = {
        color: '#b7b7b7',
    }

    const iconLight = {
        color: '#707070',
    }

    const checkPassword = (e) => {
        const acceptedSmallLetters = "abcdefghijklmnopqrstuvwxyzåäö";
        const acceptedCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        const acceptedNumbers = "1234567890";
        const acceptedSpecialChars = "!?-_#@£$";
        const isChars = {isSmallLetters: 0, isCapitalLetters: 0, isNumbers: 0, isSpecialChars: 0};
        const passwordInput = e.target.value;
    
        for (const char of passwordInput) {
          if (acceptedSmallLetters.includes(char)) {
            isChars.isSmallLetters = 1;
          }
          else if ( acceptedCapitalLetters.includes(char)) {
            isChars.isCapitalLetters = 1;
          }
          else if ( acceptedNumbers.includes(char)) {
            isChars.isNumbers = 1;
          }
          else if ( acceptedSpecialChars.includes(char)) {
            isChars.isSpecialChars = 1;
          }
        }
    
        if (passwordInput.length < 6 || passwordInput.length > 100) {
          setIsPasswordValid(false);
        }
        else  if (!Object.values(isChars).every(value => value === 1)){
          setIsPasswordValid(false);
        }
        else {
          setIsPasswordValid(true);
        }
      }

    const checkEmail = (e) => {
        if (e.target?.value && e.target.value.match(validEmail)) {
            setIsEmailValid(true);
        }
        else {
            setIsEmailValid(false);
        }
    }

    const handleUserPasswordVisibility = () => {
        setShowPasswordUser(!showPasswordUser);
    }

    const onEmailChange = (e) => {
        checkEmail(e);
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        checkPassword(e);
        setPassword(e.target.value);
    }

    const handlePasswordInput = (event) => {
        const sanitizedValue = event.target.value.replace(/[^A-Za-z0-9!?#@\-_£$äöåÄÖÅ]/g, '');
        event.target.value = sanitizedValue;
    }

    const handleEmailInput = (event) => {
        const sanitizedValue = event.target.value.replace(/[^A-Za-z0-9.@_]/g, '');
        event.target.value = sanitizedValue;
    }

    const handleRememberMeChecked = () => {
      setRememberMe(!rememberMe);
    }

    const handleSignInClicked = () => {
      // Kirjautumisvaihtoehdot:
      // useSessionCookies=true -- muistaa kirjautumisen kunnes selain suljetaan
      // useCookies=true -- muistaa vaikka sulkisi selaimen
      // Login valikkoon joku "muista minut" checkboxi
      // const cookieSetting = rememberMe ? "useCookies" : "useSessionCookies";
      // axios.post("account/login?" + cookieSetting + "=true", { email, password })
          
      if (isEmailValid === "initial" || isPasswordValid === "initial") {
        if (isEmailValid === "initial") {
          setIsEmailValid(false);
        }
        if (isPasswordValid === "initial") {
          setIsPasswordValid(false);
        }
      
        setIsLoginValid(false);
        return;
      }
      if (isEmailValid && isPasswordValid) {
          const cookieSetting = rememberMe ? "useCookies" : "useSessionCookies";
          axios.post("account/login?" + cookieSetting + "=true", { email, password })
          .then(response => {
            if (response.status === 200) {
              console.log("Logged in");
              handleItemClick();
              setSignedIn(true);
              navigate("/user");
              setIsLoginValid(true);
            }
            else {
              setIsLoginValid(false);
            }
            })
            .catch((error) => {
              console.log(error);
              setIsLoginValid(false);
              console.log("ERRONEOUS LOGIN!!!");
            });
      }
      else {
        setIsLoginValid(false);
      }
  
      setEmail("");
      setPassword("");
  
    }

    return (
      <>
        <MenuItem disableRipple  style={customCursorStyle}>
            <div style={DarkMode? containerStyleDark : containerStyle}>
              <FormControl style={inputFieldStyle} variant="outlined">
                <FormLabel style={DarkMode? labelStyleDark : labelStyle}>Sähköposti</FormLabel>
                <TextField 
                className={DarkMode? "LoginTextFieldDark" : "LoginTextField"}
                onInput={handleEmailInput}
                onChange={onEmailChange}
                onKeyDown = {(e) => { // Estää focuksen katoamisen s-näppäintä painaessa.
                  e.stopPropagation()}
                }
                error={!isEmailValid}
                helperText={!isEmailValid ? "Invalid email address" : ""} 
                value={email}
                type="email" 
                name="email" 
                variant="outlined" 
                fullWidth
                required />
              </FormControl>
              <FormControl style={inputFieldStyle} variant="outlined">
                <FormLabel style={DarkMode? labelStyleDark : labelStyle}>Salasana</FormLabel>
                <TextField 
                className={DarkMode? "LoginTextFieldDark" : "LoginTextField"}
                value={password}
                name="password"
                variant="outlined" 
                type={showPasswordUser ? 'text' : 'password'} 
                fullWidth 
                error={!isPasswordValid}
                helperText={!isPasswordValid ? "Invalid password" : ""}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleUserPasswordVisibility} style={DarkMode? iconDark : iconLight} edge="end">
                        {showPasswordUser ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onInput={handlePasswordInput}
                onChange={onPasswordChange}
                onKeyDown = {(e) => { // Estää focuksen katoamisen s-näppäintä painaessa.
                  e.stopPropagation()}
                }
                />
              </FormControl>
              <div style={buttonsContainerStyle}>
                <Button  onClick={handleSignInClicked} style={DarkMode? buttonStyleDark : buttonStyle}>
                  Kirjaudu
                </Button>
                <Button  onClick={ () => {
                  handleItemClick()
                  setEmail("");
                  setPassword("");
                }} style={DarkMode? buttonStyleDark : buttonStyle}>
                  Peruuta
                </Button>
              </div>
              <div>
                <FormControlLabel control={
                <Checkbox 
                onClick={handleRememberMeChecked} 
                checked={rememberMe}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: DarkMode ? '#eeeeee' : '#262626',
                  },
                }}
                />
                } label="Muista minut" />
              </div>
              <div>
                <Typography
                sx={{
                    fontSize: "90%",
                    display: "inline",
                    color: "#ff3c3c",
                }}
                style={isLoginValid ? {display: "none"} : 
                {display: "inline"}}
                > 
                  Kirjautuminen epäonnistui.
                </Typography>
              </div>
              <Typography variant="body1" style={registerTextStyle}>
                Uusi käyttäjä? Rekisteröidy tästä:
              </Typography>
              <Button onClick={handleItemClick} style={DarkMode? buttonRegisterStyleDark : buttonRegisterStyle}>
                <Link className="registerLink" to="/register">Rekisteröidy
                </Link>
              </Button>
            </div>
          </MenuItem>
      </>
    );
  }
  
  export default LoginForm;
  