import './../Styles/Register.css';
import { useState, useEffect } from "react";
import { Container, TextField, Button, Grid, InputAdornment, IconButton, InputLabel, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

Register.propTypes = {
    DarkMode: PropTypes.bool,
};

function Register({ DarkMode }) {
    toast.dismiss();
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        rePassword: "",
        firstName: "",
        lastName: "",
        phoneNum: ""});
    const [inputValidities, setInputValidities] = useState({
        isPasswordsEqual: true,
        isEmailValid: "initial",
        isPasswordValid: "initial",
        isRePasswordValid: "initial",
        isFirstNameValid: "initial",
        isLastNameValid: "initial",
        isPhoneNumValid: "initial"});
    const [isValidRegistration, setIsValidRegistration] = useState(true);
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const navigate = useNavigate();

    const labelLightStyle = {
        display: "grid",
        justifyContent: "start",
        color: "#262626",
    };

    const labelDarkStyle = {
        display: "grid",
        justifyContent: "start",
        color: "#eeeeee",
    };

    const buttonStyleLight = {
        color: '#262626',
    };

    const buttonStyleDark = {
        color: '#eeeeee',
    };

    const iconDark = {
        color: '#b7b7b7',
    }

    const iconLight = {
        color: '#707070',
    }

    const inValidInputButtonStyle = {
        color: '#c70000',
    };

    const inputResponsiveness = {
        "@media screen and (max-width: 570px)": {
            fontSize: '80%',
        },
        "@media screen and (max-width: 480px)": {
            fontSize: '70%',
        },

    }

    useEffect(() => {
        if (inputs.password === inputs.rePassword) {
            setInputValidities({...inputValidities, isPasswordsEqual: true});
        }
        else {
            setInputValidities({...inputValidities, isPasswordsEqual: false});
        }
    }, [inputs.password, inputs.rePassword, inputValidities, inputValidities.isPasswordsEqual]);

    const checkPassword = (e, passwordValidity) => {
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

        let obj = {...inputValidities};

        if (passwordInput.length < 6 || passwordInput.length > 100) {
            obj[passwordValidity] = false;
        }
        else  if (!Object.values(isChars).every(value => value === 1)){
            obj[passwordValidity] = false;
        }
        else {
            obj[passwordValidity] = true;
        }
        setInputValidities(obj);
    }

    const checkEmail = (e) => {
        if (e.target?.value && e.target.value.match(validEmail)) {
            setInputValidities({...inputValidities, isEmailValid: true});
        }
        else {
            setInputValidities({...inputValidities, isEmailValid: false});
        }
    }

    const checkName = (e, nameValidity) => {
        const acceptedLetters = "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        const nameInput = e.target.value;

        let validCharCount = 0;
        for (const char of nameInput) {
            if (acceptedLetters.includes(char)) {
                validCharCount += 1;
            }
        }

        let obj = {...inputValidities};

        if (nameInput.length < 1 || nameInput.length > 100) {
            obj[nameValidity] = false;

        }
        else if (validCharCount !== nameInput.length) {
            obj[nameValidity] = false;

        }
        else {
            obj[nameValidity] = true;

        }
        setInputValidities(obj);
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    const onEmailChange = (e) => {
        checkEmail(e);
        setInputs({...inputs, email: e.target.value});
      }

    const onPasswordChange = (e) => {
        checkPassword(e, "isPasswordValid");
        setInputs({...inputs, password: e.target.value});
    }

    const onRePasswordChange = (e) => {
        checkPassword(e, "isRePasswordValid");
        setInputs({...inputs, rePassword: e.target.value});
    }

    const onFirstNameChange = (e) => {
        checkName(e, "isFirstNameValid");
        setInputs({...inputs, firstName: e.target.value});
    }

    const onLastNameChange = (e) => {
        checkName(e, "isLastNameValid");
        setInputs({...inputs, lastName: e.target.value});
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
            setInputValidities({...inputValidities, isPhoneNumValid: false});
        }
        else if (validChars !== phoneNumInput.length) {
            setInputValidities({...inputValidities, isPhoneNumValid: false});
        }
        else {
            setInputValidities({...inputValidities, isPhoneNumValid: true});
        }
        setInputs({...inputs, phoneNum: e.target.value});
    };

    const handlePasswordInput = (event) => {
        const sanitizedValue = event.target.value.replace(/[^A-Za-z0-9!?#@\-_%£$äöåÄÖÅ]/g, '');
        event.target.value = sanitizedValue;
        };

        const handleEmailInput = (event) => {
        const sanitizedValue = event.target.value.replace(/[^A-Za-z0-9.@_]/g, '');
        event.target.value = sanitizedValue;
    };

    const getHelperText = () => {
        if (!inputValidities.isPasswordValid) {
            return "Invalid password. Password needs to be 6 to 100 characters long and have at least one small letter, one capital letter, one number and atleast one of these characters: '!', '?', '@', '#', '£', '$', '-' or '_'.";
        }
        else if (!inputValidities.isPasswordsEqual) {
            return "The passwords doesn't match.";
        }
        else {
            "";
        }
    };

    const RegisterButtonClick = () => {
        if (!isValidRegistration) {
            return inValidInputButtonStyle;
        }
        else if (DarkMode) {
            return buttonStyleDark;
        }
        else {
            return buttonStyleLight;
        }
    }


    const handleRegisterClicked = () => {

        if (Object.values(inputValidities).includes("initial")) {

            if (inputValidities.isEmailValid === "initial") {
                setInputValidities((prev) => {
                    return {...prev, isEmailValid: false}
                });
            }
            if (inputValidities.isPasswordValid === "initial") {
                setInputValidities((prev) => {
                    return {...prev, isPasswordValid: false}});
            }
            if (inputValidities.isRePasswordValid === "initial") {
                setInputValidities((prev) => {
                    return {...prev, isRePasswordValid: false}});
            }
            if (inputValidities.isFirstNameValid === "initial") {
                setInputValidities((prev) => {
                    return {...prev, isFirstNameValid: false}});
            }
            if (inputValidities.isLastNameValid === "initial") {
                setInputValidities((prev) => {
                    return {...prev, isLastNameValid: false}});
            }
            if (inputValidities.isPhoneNumValid === "initial") {
                setInputValidities((prev) => {
                    return {...prev, isPhoneNumValid: false}});
            }

            setIsValidRegistration(false);
            return;
        }

        if (inputValidities.isEmailValid && inputValidities.isPasswordValid && inputValidities.isRePasswordValid
            && inputValidities.isFirstNameValid && inputValidities.isLastNameValid && inputValidities.isPhoneNumValid
            && inputValidities.isPasswordsEqual) {
            // axios.post("Account", {FirstName: inputs.firstName
            // , LastName: inputs.lastName, Email: inputs.email, Password: inputs.password, PhoneNumber: inputs.phoneNum})
            axios.post("account/register", { Email: inputs.email, Password: inputs.password })
            .then(response => {
                if (response.status === 200) {
                     // add missing info since Identity only registers with email/password
                    axios.post("account/manage/register?email=" + inputs.email, { FirstName: inputs.firstName, LastName: inputs.lastName, PhoneNumber: inputs.phoneNum })
                        .then(response => console.log(response));
                }
            })
            .then(() => {
                setIsValidRegistration(true);
                setInputs({
                email: "",
                password: "",
                rePassword: "",
                firstName: "",
                lastName: "",
                phoneNum: ""});
                navigate('/successfulRegister');
            })
            .catch((error) => {
                console.log("ERROR MESSAGE: " + error);
                setIsValidRegistration(false);
            });
        }
        else {
            setIsValidRegistration(false);
        }
    }

  return (
    <>
        <div className={DarkMode? "RegisterBackground darkBackground" : "RegisterBackground"}>
        <h3 className="RegisterTitle">REKISTERÖIDY</h3>
            <Container className={DarkMode? "RegisterBody dark" : "RegisterBody light"} maxWidth="sm">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <InputLabel
                        sx={{
                            inputResponsiveness
                          }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}
                        >Sähköposti</InputLabel>
                        <TextField
                        value={inputs.email}
                        className={DarkMode? "darkRegisterTextField" : "registerTextField"}
                        variant="outlined"
                        onInput={handleEmailInput}
                        onChange={onEmailChange}
                        error={!inputValidities.isEmailValid}
                        helperText={!inputValidities.isEmailValid ? "Invalid email address." : ""}
                        type="email"
                        fullWidth
                        required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel
                        sx={{
                            inputResponsiveness
                          }}
                          style={DarkMode? labelDarkStyle : labelLightStyle}>Salasana</InputLabel>
                        <TextField
                        value={inputs.password}
                        className={DarkMode? "darkRegisterTextField" : "registerTextField"}
                        name="password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        error={() => {
                            if (!inputValidities.isPasswordValid || !inputValidities.isPasswordsEqual) {
                                return true;
                            }
                            return false;
                        }
                            }
                        helperText={getHelperText()}
                        required
                        onInput={handlePasswordInput}
                        onChange={onPasswordChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handlePasswordVisibility} style={DarkMode? iconDark : iconLight} edge="end">
                                {showPassword ? <VisibilityOff
                                className="registerVisibilityIcon" /> : <Visibility
                                className="registerVisibilityIcon"/>}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel
                        sx={{
                            inputResponsiveness
                          }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>Vahvista salasana</InputLabel>
                        <TextField
                        value={inputs.rePassword}
                        className={DarkMode? "darkRegisterTextField" : "registerTextField"}
                        name="password"
                        variant="outlined"
                        type={showRePassword ? 'text' : 'password'}
                        fullWidth
                        error={!inputValidities.isRePasswordValid}
                        helperText={!inputValidities.isRePasswordValid ? "Invalid password. Password needs to be 6 to 100 characters long and have at least one small letter, one capital letter, one number and atleast one of these characters: '!', '?', '@', '#', '£', '$', '-' or '_'." : ""}
                        required
                        onInput={handlePasswordInput}
                        onChange={onRePasswordChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleRePasswordVisibility} style={DarkMode? iconDark : iconLight} edge="end">
                                {showRePassword ? <VisibilityOff
                                className="registerVisibilityIcon"/> : <Visibility
                                className="registerVisibilityIcon"/>}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel
                        sx={{
                            inputResponsiveness
                          }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>Etunimi</InputLabel>
                        <TextField
                        value={inputs.firstName}
                        className={DarkMode? "darkRegisterTextField" : "registerTextField"}
                        onChange={onFirstNameChange}
                        error={!inputValidities.isFirstNameValid}
                        helperText={!inputValidities.isFirstNameValid ?
                            "Invalid name. Name must be 1 to 100 letters long and can only have letters from a to z and A to Z and å, ä, ö, Å, Ä and Ö. Space is not allowed." : ""}
                        required
                        variant="outlined"
                        fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel
                        sx={{
                            inputResponsiveness
                        }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>Sukunimi</InputLabel>
                        <TextField
                        value={inputs.lastName}
                        className={DarkMode? "darkRegisterTextField" : "registerTextField"}
                        onChange={onLastNameChange}
                        error={!inputValidities.isLastNameValid}
                        helperText={!inputValidities.isLastNameValid ?
                            "Invalid name. Name must be 1 to 100 letters long and can only have letters from a to z and A to Z and å, ä, ö, Å, Ä and Ö. Space is not allowed." : ""}
                        required
                        variant="outlined"
                        fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel
                        sx={{
                            inputResponsiveness
                        }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>Puhelinnumero</InputLabel>
                        <TextField
                        value={inputs.phoneNum}
                        className={DarkMode? "darkRegisterTextField" : "registerTextField"}
                        onChange={onPhoneNumChange}
                        error={!inputValidities.isPhoneNumValid}
                        helperText={!inputValidities.isPhoneNumValid ? "Invalid phone number. Phone number needs to be 10 to 15 characters long and can only have numbers. Don't use the country code." : ""}
                        required
                        variant="outlined"
                        fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                        style={RegisterButtonClick()}
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
                        style={DarkMode? buttonStyleDark : buttonStyleLight}
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
                    <Grid item xs={6}>
                        <Typography
                        sx={{
                            fontSize: "90%",
                            display: "inline",
                            color: "#ff3c3c",
                            "@media screen and (max-width: 570px)": {
                                fontSize: '80%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '70%',
                            },
                        }}
                        style={isValidRegistration ? {display: "none"} :
                        {display: "inline"}}
                        >
                          Rekisteröinti epäonnistui.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </>
  )
}

export default Register;