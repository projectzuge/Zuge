import './../Styles/Register.css';
import { useState, useRef } from "react";
import { Container, TextField, Button, Grid, InputAdornment, IconButton, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
// import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
// import PropTypes from 'prop-types';

// Register.propTypes = {
// };

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isRePasswordValid, setIsRePasswordValid] = useState(true);
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isPhoneNumValid, setIsPhoneNumValid] = useState(true);
    const emailData = useRef(null);
    const passwordData = useRef(null);
    const rePasswordData = useRef(null);
    const firstNameData = useRef(null);
    const lastNameData = useRef(null);
    const phoneNumData = useRef(null);
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const labelStyle = {
        display: "grid",
        justifyContent: "start",
        color: "#262626",
    };

    const buttonStyle = {
        color: '#262626',
    };

    const arePasswordsEqual = () => {
        if (password === rePassword) {
            setIsPasswordsEqual(true);
        }
        else {
            setIsPasswordsEqual(false);
        }
    }

    const checkPassword = (e) => {
        const acceptedSmallLetters = "abcdefghijklmnopqrstuvwxyzåäö";
        const acceptedCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        const acceptedNumbers = "1234567890";
        const acceptedSpecialChars = "!?-_#@{}()[]";
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

    const checkRePassword = (e) => {
        const acceptedSmallLetters = "abcdefghijklmnopqrstuvwxyzåäö";
        const acceptedCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        const acceptedNumbers = "1234567890";
        const acceptedSpecialChars = "!?-_#@{}()[]";
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
          setIsRePasswordValid(false);
        }
        else  if (!Object.values(isChars).every(value => value === 1)){
          setIsRePasswordValid(false);
        }
        else {
          setIsRePasswordValid(true);
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

    const checkFirstName = (e) => {
        const acceptedLetters = "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        const firstNameInput = e.target.value;

        let validCharCount = 0;
        for (const char of firstNameInput) {
            if (acceptedLetters.includes(char)) {
                validCharCount += 1;
            }
        }

        if (firstNameInput.length < 1 || firstNameInput.length > 100) {
            setIsFirstNameValid(false);
        }
        else if (validCharCount !== firstNameInput.length) {
            setIsFirstNameValid(false);
        }
        else {
            setIsFirstNameValid(true);
        }
    }

    const checkLastName = (e) => {
        const acceptedLetters = "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        const lastNameInput = e.target.value;

        let validCharCount = 0;
        for (const char of lastNameInput) {
            if (acceptedLetters.includes(char)) {
                validCharCount += 1;
            }
        }

        if (lastNameInput.length < 1 || lastNameInput.length > 100) {
            setIsLastNameValid(false);
        }
        else if (validCharCount !== lastNameInput.length) {
            setIsLastNameValid(false);
        }
        else {
            setIsLastNameValid(true);
        }
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    const onEmailChange = (e) => {
        checkEmail(e);
        setEmail(emailData.current.value);
      }
    
    const onPasswordChange = (e) => {
        checkPassword(e);
        setPassword(passwordData.current.value);
    }

    const onRePasswordChange = (e) => {
        checkRePassword(e);
        setRePassword(rePasswordData.current.value);
    }

    const onFirstNameChange = (e) => {
        checkFirstName(e);
        setFirstName(firstNameData.current.value);
    }

    const onLastNameChange = (e) => {
        checkLastName(e);
        setLastName(lastNameData.current.value);
    }

    const onPhoneNumChange = (e) => {
        const acceptedNums = "0123456789";
        const phoneNumInput = e.target.value;

        let validChars = 0;
        for (const char of phoneNumInput) {
            if (acceptedNums.includes(char)) {
                validChars += 1;
            }
        }

        if (phoneNumInput.length < 10 || phoneNumInput.length > 15) {
            setIsPhoneNumValid(false);
        }
        else if (validChars !== phoneNumInput.length) {
            setIsPhoneNumValid(false);
        }
        else {
            setIsPhoneNumValid(true);
        }
        setPhoneNum(phoneNumData.current.value);
    };

    const handleRegisterClicked = (e) => {
        e.preventDefault();
        arePasswordsEqual();

        if (isEmailValid && isPasswordValid && isRePasswordValid 
            && isFirstNameValid && isLastNameValid && isPhoneNumValid 
            && isPasswordsEqual) {
            axios.post("Account", {FirstName: firstName
            , LastName: lastName, Email: email, Password: password, PhoneNumber: phoneNum})
            .then(function (res) {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else {
            // POPUP: These values are invalid, give them in this format please!!
        }

    }

    const handlePasswordInput = (event) => {
    const sanitizedValue = event.target.value.replace(/[^A-Za-z0-9!?#@\-_{(\[\])}äöåÄÖÅ]/g, '');
    event.target.value = sanitizedValue;
    };

    const handleEmailInput = (event) => {
    const sanitizedValue = event.target.value.replace(/[^A-Za-z0-9.@_]/g, '');
    event.target.value = sanitizedValue;
    };

  return (
    <>
        <div className="RegisterBackground">
        <h3 className="RegisterTitle">REKISTERÖIDY</h3>
            <Container className="RegisterBody" maxWidth="sm">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                            },
                          }} 
                        style={labelStyle}>Sähköposti</InputLabel>
                        <TextField 
                        className="registerTextField"
                        variant="outlined" 
                        onInput={handleEmailInput}
                        onChange={onEmailChange}
                        error={!isEmailValid}
                        helperText={!isEmailValid ? "Invalid email address" : ""}
                        inputRef={emailData} 
                        type="email" 
                        fullWidth
                        required />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                            },
                          }} 
                        style={labelStyle}>Salasana</InputLabel>
                        <TextField 
                        className="registerTextField"
                        inputRef={passwordData}
                        name="password"
                        variant="outlined" 
                        type={showPassword ? 'text' : 'password'} 
                        fullWidth 
                        error={!isPasswordValid}
                        helperText={!isPasswordValid ? "Invalid password" : ""}
                        required
                        onInput={handlePasswordInput}
                        onChange={onPasswordChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handlePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOff 
                                className="registerVisibilityIcon" /> : <Visibility  
                                className="registerVisibilityIcon"/>}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                            },
                          }} 
                        style={labelStyle}>Vahvista salasana</InputLabel>
                        <TextField  
                        className="registerTextField"
                        inputRef={rePasswordData}
                        name="password"
                        variant="outlined" 
                        type={showRePassword ? 'text' : 'password'}  
                        fullWidth 
                        error={!isRePasswordValid}
                        helperText={!isRePasswordValid ? "Invalid password" : ""}
                        required
                        onInput={handlePasswordInput}
                        onChange={onRePasswordChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleRePasswordVisibility} edge="end">
                                {showRePassword ? <VisibilityOff  
                                className="registerVisibilityIcon"/> : <Visibility  
                                className="registerVisibilityIcon"/>}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                            },
                          }} 
                        style={labelStyle}>Etunimi</InputLabel>
                        <TextField 
                        inputRef={firstNameData}
                        className="registerTextField"
                        onChange={onFirstNameChange}
                        error={!isFirstNameValid}
                        helperText={!isFirstNameValid ? "Invalid name" : ""}
                        required
                        variant="outlined" 
                        fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                            },
                        }} 
                        style={labelStyle}>Sukunimi</InputLabel>
                        <TextField
                        inputRef={lastNameData}
                        className="registerTextField"
                        onChange={onLastNameChange}
                        error={!isLastNameValid}
                        helperText={!isLastNameValid ? "Invalid name" : ""}
                        required
                        variant="outlined" 
                        fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                            },
                        }}  
                        style={labelStyle}>Puhelinnumero</InputLabel>
                        <TextField 
                        inputRef={phoneNumData}
                        className="registerTextField"
                        onChange={onPhoneNumChange}
                        error={!isPhoneNumValid}
                        helperText={!isPhoneNumValid ? "Invalid phone number" : ""}
                        required
                        variant="outlined" 
                        fullWidth />
                        {/* <MuiTelInput
                        id="profile-text-field"
                        fullWidth
                        className="registerTextField"
                        // inputRef={phoneNumData}
                        value={phoneNum}
                        onChange={onPhoneNumChange}
                        required
                        error={!isPhoneNumValid}
                        helperText={!isPhoneNumValid ? "Invalid phone number" : ""}
                        >
                        </MuiTelInput> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                        onClick={handleRegisterClicked}
                        style={buttonStyle} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                                height: "80%",
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                                height: "70%",
                            },
                          }} >
                            Rekisteröidy
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                        style={buttonStyle} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                                height: "80%",
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                                height: "70%",
                            },
                          }} >
                            <p className="backLink"><Link className="MenuItemLink" to="/">Takaisin</Link></p>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </>
  )
}

export default Register;