import './../Styles/Register.css';
import { useState, useEffect } from "react";
import { Container, TextField, Button, Grid, InputAdornment, IconButton, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

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
    const [isEmailValid, setIsEmailValid] = useState("initial");
    const [isPasswordValid, setIsPasswordValid] = useState("initial");
    const [isRePasswordValid, setIsRePasswordValid] = useState("initial");
    const [isFirstNameValid, setIsFirstNameValid] = useState("initial");
    const [isLastNameValid, setIsLastNameValid] = useState("initial");
    const [isPhoneNumValid, setIsPhoneNumValid] = useState("initial");
    const [isValidRegistration, setIsValidRegistration] = useState(true);
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const labelStyle = {
        display: "grid",
        justifyContent: "start",
        color: "#262626",
    };

    const buttonStyle = {
        color: '#262626',
    };

    const inValidInputButtonStyle = {
        color: '#c70000',
    };

    useEffect(() => {
        if (password === rePassword) {
            setIsPasswordsEqual(true);
        }
        else {
            setIsPasswordsEqual(false);
        }
    }, [password, rePassword, isPasswordsEqual]);

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
        setEmail(e.target.value);
      }
    
    const onPasswordChange = (e) => {
        checkPassword(e);
        setPassword(e.target.value);
    }

    const onRePasswordChange = (e) => {
        checkRePassword(e);
        setRePassword(e.target.value);
    }

    const onFirstNameChange = (e) => {
        checkFirstName(e);
        setFirstName(e.target.value);
    }

    const onLastNameChange = (e) => {
        checkLastName(e);
        setLastName(e.target.value);
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
        setPhoneNum(e.target.value);
    };

    const handleRegisterClicked = () => {

        const validityStateArray = [
            isEmailValid, 
            isPasswordValid, 
            isRePasswordValid, 
            isFirstNameValid, 
            isLastNameValid, 
            isPhoneNumValid, 
        ];

        if (validityStateArray.includes("initial")) {

            if (isEmailValid === "initial") {
                setIsEmailValid(false);
            }
            if (isPasswordValid === "initial") {
                setIsPasswordValid(false);
            }
            if (isRePasswordValid === "initial") {
                setIsRePasswordValid(false);
            }
            if (isFirstNameValid === "initial") {
                setIsFirstNameValid(false);
            }
            if (isLastNameValid === "initial") {
                setIsLastNameValid(false);
            }
            if (isPhoneNumValid === "initial") {
                setIsPhoneNumValid(false);
            }

            setIsValidRegistration(false);
            return;
        }
        
        if (isEmailValid && isPasswordValid && isRePasswordValid 
            && isFirstNameValid && isLastNameValid && isPhoneNumValid 
            && isPasswordsEqual) {
            axios.post("Account", {FirstName: firstName
            , LastName: lastName, Email: email, Password: password, PhoneNumber: phoneNum})
            .then(function (res) {
                console.log("VALID RESPONSE: " + res);
                setIsValidRegistration(true);
            })
            .catch(function (error) {
                console.log("Hello!")
                console.log("ERROR MESSAGE: " + error);
                setIsValidRegistration(false);
            });
        }
        else {
            setIsValidRegistration(false);
        }

        console.log(isValidRegistration);

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
                        value={email} 
                        className="registerTextField"
                        variant="outlined" 
                        onInput={handleEmailInput}
                        onChange={onEmailChange}
                        error={!isEmailValid}
                        helperText={!isEmailValid ? "Invalid email address." : ""}
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
                        value={password} 
                        className="registerTextField"
                        name="password"
                        variant="outlined" 
                        type={showPassword ? 'text' : 'password'} 
                        fullWidth 
                        error={!isPasswordValid}
                        helperText={!isPasswordValid ? 
                            "Invalid password. Password needs to be 6 to 100 characters long and have at least one small letter, one capital letter, one number and atleast one of these characters: '!', '?', '@', '#', '{', '}', '[', ']', '(', ')', '-' or '_'." : ""}
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
                        value={rePassword}   
                        className="registerTextField"
                        name="password"
                        variant="outlined" 
                        type={showRePassword ? 'text' : 'password'}  
                        fullWidth 
                        error={!isRePasswordValid}
                        helperText={!isRePasswordValid ? "Invalid password. Password needs to be 6 to 100 characters long and have at least one small letter, one capital letter, one number and atleast one of these characters: '!', '?', '@', '#', '{', '}', '[', ']', '(', ')', '-' or '_'." : ""}
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
                        value={firstName} 
                        className="registerTextField"
                        onChange={onFirstNameChange}
                        error={!isFirstNameValid}
                        helperText={!isFirstNameValid ? 
                            "Invalid name. Name must be 1 to 100 letters long and can only have letters from a to z and A to Z and å, ä, ö, Å, Ä and Ö. Space is not allowed." : ""}
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
                        value={lastName} 
                        className="registerTextField"
                        onChange={onLastNameChange}
                        error={!isLastNameValid}
                        helperText={!isLastNameValid ? 
                            "Invalid name. Name must be 1 to 100 letters long and can only have letters from a to z and A to Z and å, ä, ö, Å, Ä and Ö. Space is not allowed." : ""}
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
                        value={phoneNum} 
                        className="registerTextField"
                        onChange={onPhoneNumChange}
                        error={!isPhoneNumValid}
                        helperText={!isPhoneNumValid ? "Invalid phone number. Phone number needs to be 10 to 15 characters long and can only have numbers. Don't use the country code." : ""}
                        required
                        variant="outlined" 
                        fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                        style={isValidRegistration? buttonStyle : inValidInputButtonStyle}
                        onClick={handleRegisterClicked}
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