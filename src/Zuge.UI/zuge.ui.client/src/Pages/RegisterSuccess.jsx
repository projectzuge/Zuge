import "./../Styles/RegisterSuccess.css";
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

RegisterSuccess.propTypes = {
  DarkMode: PropTypes.bool,
};

function RegisterSuccess({DarkMode}) {
  window.scrollTo(0, 0);
  toast.dismiss();
    return (
      <>
        <div className={DarkMode? "RegisterSuccessBodyDark" :
        "RegisterSuccessBodyLight"}>
          <Typography>
            Registration successful!!!
          </Typography>
        </div>
      </>
    );
  }

  export default RegisterSuccess;
