import "./../Styles/RegisterSuccess.css";
import { Typography, Button } from "@mui/material";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

RegisterSuccess.propTypes = {
  DarkMode: PropTypes.bool,
};

function RegisterSuccess({DarkMode}) {
  toast.dismiss();
  const navigate = useNavigate();
  const targetElementRef = useRef(null);

  useEffect(() => {
    console.log(targetElementRef);
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [targetElementRef]);

  return (
    <>
      <div className={DarkMode? "RegisterSuccessBodyDark" : 
      "RegisterSuccessBodyLight"}>
        <Typography ref={targetElementRef}>
          Rekisteröityminen onnistui!!!
        </Typography>
        <Button 
        sx={{
          padding: "5px",
          margin: "20px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: DarkMode? "#eeeeee" : "#262626",
        }}
        onClick={() => {navigate("/")}}
        >
          Etusivulle</Button>
      </div>
    </>
  );
}

  export default RegisterSuccess;
