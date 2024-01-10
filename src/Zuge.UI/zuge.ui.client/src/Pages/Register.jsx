import './../Styles/Register.css';
import { useState } from "react";
import { Container, TextField, Button, Grid, InputAdornment, IconButton, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

// Register.propTypes = {
// };

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const labelStyle = {
        display: "grid",
        justifyContent: "start",
    };

    const buttonStyle = {
        color: '#262626',
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
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
                        style={labelStyle}>Salasana</InputLabel>
                        <TextField 
                        className="registerTextField"
                        variant="outlined" 
                        type={showPassword ? 'text' : 'password'} 
                        fullWidth 
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
                        variant="outlined" 
                        type={showRePassword ? 'text' : 'password'}  
                        fullWidth 
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