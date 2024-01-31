import "./../Styles/RegisterSuccess.css";
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';

RegisterSuccess.propTypes = {
  DarkMode: PropTypes.bool,
};

function RegisterSuccess({DarkMode}) {
    return (
      <>
        <div className={DarkMode? "RegisterSuccessBodyDark" : "RegisterSuccessBodyLight"}>
          <Typography>
            Registration successful!!!
          </Typography>
        </div>
      </>
    );
  }
  
  export default RegisterSuccess;
  