import "./../Styles/RegisterSuccess.css";
import { Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

RegisterSuccess.propTypes = {
  DarkMode: PropTypes.bool,
};

function RegisterSuccess({ DarkMode }) {
  toast.dismiss();

  const navigate = useNavigate();
  const targetElementRef = useRef(null);

  useEffect(() => {
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({ behavior: 'smooth', 
      block: 'center' });
    }
  }, [targetElementRef]);

  return (
    <>
      <div ref={targetElementRef} className={DarkMode? 
      "RegisterSuccessBodyDark" : "RegisterSuccessBodyLight"}>
        <Typography>
          Rekisteröityminen onnistui!
        </Typography>
        <Button 
        sx={{
          padding: "10px",
          margin: "20px",
          borderStyle: "none",
          borderColor: DarkMode? "#eeeeee" : "#262626",
          backgroundColor: DarkMode? "#262626" : "#eeeeee",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={() => {navigate("/")}}
        >
          Etusivulle
        </Button>
      </div>
    </>
  );
}

export default RegisterSuccess;
