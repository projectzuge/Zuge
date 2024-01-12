import './../Styles/Register.css';
import { useState, useRef } from "react";
import { Container, TextField, Button, Grid, InputAdornment, IconButton, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

// Register.propTypes = {
// };

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isRePasswordValid, setIsRePasswordValid] = useState(true);
    const emailData = useRef(null);
    const passwordData = useRef(null);
    const rePasswordData = useRef(null);
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
            console.log("Passwords are the same!!!!");
        }
        else {
            console.log("Passwords are not the same!!!");
        }
    }

    const checkPassword = (passw) => {
        const acceptedSmallLetters = "abcdefghijklmnopqrstuvwxyzåäö";
        const acceptedCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        const acceptedNumbers = "1234567890";
        const acceptedSpecialChars = "!?-_#@{}()[]";
        const isChars = {isSmallLetters: 0, isCapitalLetters: 0, isNumbers: 0, isSpecialChars: 0};
    
        for (const char of passw) {
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
    
        if (passw.length < 6 || passw.length > 100) {
            if (password === rePassword) {
                setIsPasswordValid(false);
                setIsRePasswordValid(false);
            }
            else if (passw === password && passw !== rePassword) {
                setIsPasswordValid(false);
            }
            else {
                setIsRePasswordValid(false);
            }
        }
        else  if (!Object.values(isChars).every(value => value === 1)){
            if (password === rePassword) {
                setIsPasswordValid(false);
                setIsRePasswordValid(false);
            }
            else if (passw === password && passw !== rePassword) {
                setIsPasswordValid(false);
            }
            else {
                setIsRePasswordValid(false);
            }
        }
        else {
            if (password === rePassword) {
                setIsPasswordValid(true);
                setIsRePasswordValid(true);
            }
            else if (passw === password && passw !== rePassword) {
                setIsPasswordValid(true);
            }
            else {
                setIsRePasswordValid(true);
            }
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

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    const onEmailChange = (e) => {
        setEmail(emailData.current.value);
        checkEmail(e);
      }
    
    const onPasswordChange = (e) => {
        e.preventDefault();
        setPassword(passwordData.current.value);
        checkPassword(password);
    }

    const onRePasswordChange = (e) => {
        e.preventDefault();
        setRePassword(rePasswordData.current.value);
        checkPassword(rePassword);
    }

    const handleRegisterClicked = (e) => {
        e.preventDefault();
        arePasswordsEqual();
        // else {
        //     fetch("http://localhost:3000/edit", { method: "PUT", body: data }) // "Content-Type": "application/json"
        //     .then(res => {
        //         if (!res.ok) {
        //             throw new Error("Server responded " + res.status);
        //         }
        //         return res.json();
        //     })
        //     .then((data) => {
        //         const newData = unitsData.map(unit => {
        //             if (unit.unitName === data.unit.unitName) {
        //                 return data.unit;
        //             }
        //             else {
        //                 return unit;
        //             }
        //         });
        //         setUnitsData(newData);
        //         setSuccessPopUp(true);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        // }
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
                        className="registerTextField"
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
                        className="registerTextField"
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
                        className="registerTextField"
                        variant="outlined" 
                        fullWidth />
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