import LoginForm from "./LoginForm.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

Login.propTypes = {
  DarkMode: PropTypes.bool,
  handleItemClick: PropTypes.func,
  setSignedIn: PropTypes.func,
  setCookie: PropTypes.func,
};

function Login({ DarkMode, handleItemClick, setSignedIn, setCookie }) {
  const [showPasswordUser, setShowPasswordUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("initial");
  const [isPasswordValid, setIsPasswordValid] = useState("initial");
  const [isLoginValid, setIsLoginValid] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const navigate = useNavigate();

  const checkPassword = (e) => {
    const acceptedSmallLetters = "abcdefghijklmnopqrstuvwxyzåäö";
    const acceptedCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
    const acceptedNumbers = "1234567890";
    const acceptedSpecialChars = "!?-_#@£$";
    const isChars = {
      isSmallLetters: 0,
      isCapitalLetters: 0,
      isNumbers: 0,
      isSpecialChars: 0,
    };
    const passwordInput = e.target.value;

    for (const char of passwordInput) {
      if (acceptedSmallLetters.includes(char)) {
        isChars.isSmallLetters = 1;
      } else if (acceptedCapitalLetters.includes(char)) {
        isChars.isCapitalLetters = 1;
      } else if (acceptedNumbers.includes(char)) {
        isChars.isNumbers = 1;
      } else if (acceptedSpecialChars.includes(char)) {
        isChars.isSpecialChars = 1;
      }
    }

    if (passwordInput.length < 6 || passwordInput.length > 100) {
      setIsPasswordValid(false);
    } else if (!Object.values(isChars).every((value) => value === 1)) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  const checkEmail = (e) => {
    if (e.target?.value && e.target.value.match(validEmail)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleUserPasswordVisibility = () => {
    setShowPasswordUser(!showPasswordUser);
  };

  const onEmailChange = (e) => {
    checkEmail(e);
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    checkPassword(e);
    setPassword(e.target.value);
  };

  const handlePasswordInput = (event) => {
    const sanitizedValue = event.target.value.replace(
      /[^A-Za-z0-9!?#@\-_£$äöåÄÖÅ]/g,
      ""
    );
    event.target.value = sanitizedValue;
  };

  const handleEmailInput = (event) => {
    const sanitizedValue = event.target.value.replace(/[^A-Za-z0-9.@_]/g, "");
    event.target.value = sanitizedValue;
  };

  const handleRememberMeChecked = () => {
    setRememberMe(!rememberMe);
  };

  const handleSignInClicked = async () => {
    if (isEmailValid === "initial" || isPasswordValid === "initial") {
      if (isEmailValid === "initial") {
        setIsEmailValid(false);
      }
      if (isPasswordValid === "initial") {
        setIsPasswordValid(false);
      }

      setIsLoginValid(false);
      return;
    }
    if (isEmailValid && isPasswordValid) {
      const cookieSetting = rememberMe ? "useCookies" : "useSessionCookies";
      await axios
        .post("account/login?" + cookieSetting + "=true", { email, password })
        .then((response) => {
          if (response.status === 200) {
            handleItemClick();
            setSignedIn(true);
            setIsLoginValid(true);
            getUserInfo();
          } else {
            setIsLoginValid(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoginValid(false);
        });
    } else {
      setIsLoginValid(false);
    }

    setEmail("");
    setPassword("");
  };

  const getUserInfo = async () => {
    await axios
      .get("account")
      .then((response) => {
        setCookie("userData", response.data);
      })
      .catch((error) => {
        console.log("Something went wrong with getting user data: ", error);
        navigate("/");
      });
  };

  return (
    <>
      <LoginForm
        DarkMode={DarkMode}
        isLoginValid={isLoginValid}
        isEmailValid={isEmailValid}
        email={email}
        isPasswordValid={isPasswordValid}
        password={password}
        showPasswordUser={showPasswordUser}
        handleItemClick={handleItemClick}
        setEmail={setEmail}
        setPassword={setPassword}
        rememberMe={rememberMe}
        handleUserPasswordVisibility={handleUserPasswordVisibility}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        handlePasswordInput={handlePasswordInput}
        handleEmailInput={handleEmailInput}
        handleRememberMeChecked={handleRememberMeChecked}
        handleSignInClicked={handleSignInClicked}
      />
    </>
  );
}

export default Login;
