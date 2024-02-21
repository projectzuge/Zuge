import './../Styles/Register.css';
import {
    labelLightStyle,
    labelDarkStyle,
    buttonStyleLight,
    buttonStyleDark,
    iconDark,
    iconLight,
} from './../Styles/RegisterStyles.jsx';
import { 
    Container, 
    TextField, 
    Button, 
    Grid, 
    InputAdornment, 
    IconButton, 
    InputLabel, 
    Typography 
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

Register.propTypes = {
    DarkMode: PropTypes.bool,
    inputs: PropTypes.objectOf(
    PropTypes.string),
    inputValidities: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string])),
    showPassword: PropTypes.bool,
    showRePassword: PropTypes.bool,
    handlePasswordVisibility: PropTypes.func,
    handleRePasswordVisibility: PropTypes.func,
    onEmailChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onRePasswordChange: PropTypes.func,
    onFirstNameChange: PropTypes.func,
    onLastNameChange: PropTypes.func,
    onPhoneNumChange: PropTypes.func,
    handlePasswordInput: PropTypes.func,
    handleEmailInput: PropTypes.func,
    passwordErrorAlert: PropTypes.func,
    getHelperText: PropTypes.func,
    RegisterButtonClick: PropTypes.func,
    handleRegisterClicked: PropTypes.func,
    isValidRegistration: PropTypes.bool,
};

function Register({ DarkMode, inputs, inputValidities, showPassword, 
    showRePassword, handlePasswordVisibility, handleRePasswordVisibility,
    onEmailChange, onPasswordChange, onRePasswordChange, onFirstNameChange,
    onLastNameChange, onPhoneNumChange, handlePasswordInput, handleEmailInput,
    passwordErrorAlert, getHelperText, RegisterButtonClick, handleRegisterClicked, 
    isValidRegistration }) {
    const navigate = useNavigate();

  return (
    <>
        <div className={DarkMode? "RegisterBackground darkBackground" : 
        "RegisterBackground"}>
        <h3 className="RegisterTitle">REKISTERÖIDY</h3>
            <Container className={DarkMode? "RegisterBodyDark" : 
            "RegisterBodyLight"} maxWidth="sm">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
                            },
                        }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}
                        >Sähköposti</InputLabel>
                        <TextField
                        InputProps={{
                            sx: {
                              border: !inputValidities.isEmailValid ? 
                              "1px solid red" : "none",
                            },
                        }}
                        value={inputs.email} 
                        className={DarkMode? "darkRegisterTextField" : 
                        "registerTextField"}
                        variant="outlined" 
                        onInput={handleEmailInput}
                        onChange={onEmailChange}
                        error={!inputValidities.isEmailValid}
                        helperText={!inputValidities.isEmailValid ? 
                            "Virheellinen sähköposti." : ""}
                        type="email" 
                        fullWidth
                        required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel  
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
                            },
                        }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>
                            Salasana</InputLabel>
                        <TextField 
                        value={inputs.password} 
                        className={DarkMode? "darkRegisterTextField" : 
                        "registerTextField"}
                        name="password"
                        variant="outlined" 
                        type={showPassword ? 'text' : 'password'} 
                        fullWidth 
                        error={passwordErrorAlert()}
                        helperText={getHelperText()}
                        required
                        onInput={handlePasswordInput}
                        onChange={onPasswordChange}
                        InputProps={{
                            sx: {
                                border: !inputValidities.isPasswordValid ? 
                                "1px solid red" : "none",
                            },
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handlePasswordVisibility}
                                 style={DarkMode? iconDark : iconLight} 
                                 edge="end">
                                {showPassword ? <VisibilityOff 
                                className="registerVisibilityIcon" /> : 
                                <Visibility  
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
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
                            },
                        }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>
                            Vahvista salasana</InputLabel>
                        <TextField
                        value={inputs.rePassword}   
                        className={DarkMode? "darkRegisterTextField" : 
                        "registerTextField"}
                        name="password"
                        variant="outlined" 
                        type={showRePassword ? 'text' : 'password'}  
                        fullWidth 
                        error={!inputValidities.isRePasswordValid}
                        helperText={!inputValidities.isRePasswordValid ? 
                            "Virheellinen salasana. Salasanan täytyy olla " +
                            "6 - 100 merkkiä pitkä ja sen täytyy sisältää " +
                            " vähintään yksi pieni kirjain, yksi iso kirjain," +
                            " yksi numero ja yksi näistä erikoismerkeistä: " +
                            "'!', '?', '@', '#', '£', '$', '-' tai '_'." : ""}
                        required
                        onInput={handlePasswordInput}
                        onChange={onRePasswordChange}
                        InputProps={{
                            sx: {
                                border: !inputValidities.isRePasswordValid ? 
                                "1px solid red" : "none",
                            },
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleRePasswordVisibility} 
                                style={DarkMode? iconDark : iconLight} 
                                edge="end">
                                {showRePassword ? <VisibilityOff  
                                className="registerVisibilityIcon"/> : 
                                <Visibility  
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
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
                            },
                        }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>
                            Etunimi</InputLabel>
                        <TextField
                        InputProps={{
                            sx: {
                              border: !inputValidities.isFirstNameValid ? 
                              "1px solid red" : "none",
                            },
                        }}
                        value={inputs.firstName} 
                        className={DarkMode? "darkRegisterTextField" : 
                        "registerTextField"}
                        onChange={onFirstNameChange}
                        error={!inputValidities.isFirstNameValid}
                        helperText={!inputValidities.isFirstNameValid ? 
                            "Virheellinen nimi. Nimessä täytyy olla 1 - 100 " +
                            "kirjainta ja voi sisältää ainoastaan kirjaimia " +
                            "a:sta ö:hön ja A:sta Ö:hön. Välilyönti ei ole " + 
                            "sallittu." : ""}
                        required
                        variant="outlined" 
                        fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
                            },
                        }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>
                            Sukunimi</InputLabel>
                        <TextField
                        InputProps={{
                            sx: {
                              border: !inputValidities.isLastNameValid ? 
                              "1px solid red" : "none",
                            },
                        }}
                        value={inputs.lastName} 
                        className={DarkMode? "darkRegisterTextField" : 
                        "registerTextField"}
                        onChange={onLastNameChange}
                        error={!inputValidities.isLastNameValid}
                        helperText={!inputValidities.isLastNameValid ? 
                            "Virheellinen nimi. Nimessä täytyy olla 1 - 100 " +
                            "kirjainta ja voi sisältää ainoastaan kirjaimia " +
                            "a:sta ö:hön ja A:sta Ö:hön. Välilyönti ei ole " + 
                            "sallittu." : ""}
                        required
                        variant="outlined" 
                        fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel 
                        sx={{
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
                            },
                        }}
                        style={DarkMode? labelDarkStyle : labelLightStyle}>
                            Puhelinnumero</InputLabel>
                        <TextField 
                        InputProps={{
                            sx: {
                              border: !inputValidities.isPhoneNumValid ? 
                              "1px solid red" : "none",
                            },
                        }}
                        value={inputs.phoneNum} 
                        className={DarkMode? "darkRegisterTextField" : 
                        "registerTextField"}
                        onChange={onPhoneNumChange}
                        error={!inputValidities.isPhoneNumValid}
                        helperText={!inputValidities.isPhoneNumValid ? 
                            "Virheellinen puhelinnumero. Puhelinnumeron on " +
                            "oltava 10:stä 15:een merkkiä pitkä ja voi " + 
                            "ainoastaan sisältää numeroita. Älä käytä " + 
                            "maakoodia." : ""}
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
                            marginTop: "10px",
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                                height: "95%",
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
                                height: "90%",
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
                        onClick={() => {navigate("/")}}
                        sx={{
                            marginTop: "10px",
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                                height: "95%",
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
                                height: "90%",
                            },
                          }} >
                            <p className="backLink">Etusivulle</p>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                        sx={{
                            display: "inline",
                            color: "#d32f2f !important",
                            "@media screen and (max-width: 570px)": {
                                fontSize: '95%',
                            },
                            "@media screen and (max-width: 480px)": {
                                fontSize: '90%',
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