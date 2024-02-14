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
  useEffect(() => {
    window.scrollTo(0, 0);
    toast.dismiss();
  }, []);
  const navigate = useNavigate();
  const targetElementRef = useRef(null);

  useEffect(() => {
    console.log(targetElementRef);
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [targetElementRef]);

  return (
    <>
      <div ref={targetElementRef} className={DarkMode? "RegisterSuccessBodyDark" :
      "RegisterSuccessBodyLight"}>
        <Typography>
          Rekisteröityminen onnistui!
        </Typography>
        <Button
        sx={{
          padding: "10px",
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
