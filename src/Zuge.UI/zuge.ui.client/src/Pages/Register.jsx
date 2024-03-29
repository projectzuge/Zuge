import RegisterForm from './../Components/RegisterForm.jsx';
import { buttonStyleLight,
buttonStyleDark } from './../Styles/RegisterStyles.jsx';
import { inValidInputButtonStyle } from './../Styles/RegisterStyles.jsx';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    useEffect(() => {
        if (inputs.password === inputs.rePassword) {
            setInputValidities({...inputValidities, isPasswordsEqual: true});
        }
        else {
            setInputValidities({...inputValidities, isPasswordsEqual: false});
        }
    }, [inputs.password, inputs.rePassword, inputValidities,
        inputValidities.isPasswordsEqual]);

    const checkPassword = (e, passwordValidity) => {
        const acceptedSmallLetters = "abcdefghijklmnopqrstuvwxyzåäö";
        const acceptedCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        const acceptedNumbers = "1234567890";
        const acceptedSpecialChars = "!?-_#@£$";
        const isChars = {isSmallLetters: 0, isCapitalLetters: 0, isNumbers: 0,
            isSpecialChars: 0};
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
        const acceptedLetters =
        "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
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
        const sanitizedValue =
        event.target.value.replace(/[^A-Za-z0-9!?#@\-_%£$äöåÄÖÅ]/g, '');
        event.target.value = sanitizedValue;
        };

    const handleEmailInput = (event) => {
        const sanitizedValue =
        event.target.value.replace(/[^A-Za-z0-9.@_]/g, '');
        event.target.value = sanitizedValue;
    };

    const passwordErrorAlert = () => {
        if (!inputValidities.isPasswordValid || 
            !inputValidities.isPasswordsEqual) {
            return true;
        }
        
        return false;
    }

    const getHelperText = () => {
        if (!inputValidities.isPasswordValid) {
            return "Virheellinen salasana. Salasanan täytyy olla " +
            "6 - 100 merkkiä pitkä ja sen täytyy sisältää " +
            " vähintään yksi pieni kirjain, yksi iso kirjain," +
            " yksi numero ja yksi näistä erikoismerkeistä: " +
            "'!', '?', '@', '#', '£', '$', '-' tai '_'."
        }
        else if (!inputValidities.isPasswordsEqual) {
            return "Salasanat eivät täsmää.";
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

        if (inputValidities.isEmailValid && inputValidities.isPasswordValid
            && inputValidities.isRePasswordValid
            && inputValidities.isFirstNameValid &&
            inputValidities.isLastNameValid && inputValidities.isPhoneNumValid
            && inputValidities.isPasswordsEqual) {
            // axios.post("Account", {FirstName: inputs.firstName
            // , LastName: inputs.lastName, Email: inputs.email,
            // Password: inputs.password, PhoneNumber: inputs.phoneNum})
            axios.post("account/register", { Email: inputs.email, Password:
                inputs.password })
            .then(response => {
                if (response.status === 200) {
                     // add missing info since Identity only registers with
                     // email/password
                    axios.post("account/manage/register?email=" + inputs.email,
                    { FirstName: inputs.firstName, LastName: inputs.lastName,
                        PhoneNumber: inputs.phoneNum })
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
        <RegisterForm
        DarkMode={DarkMode}
        inputs={inputs}
        inputValidities={inputValidities}
        showPassword={showPassword}
        showRePassword={showRePassword}
        handlePasswordVisibility={handlePasswordVisibility}
        handleRePasswordVisibility={handleRePasswordVisibility}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onRePasswordChange={onRePasswordChange}
        onFirstNameChange={onFirstNameChange}
        onLastNameChange={onLastNameChange}
        onPhoneNumChange={onPhoneNumChange}
        handlePasswordInput={handlePasswordInput}
        handleEmailInput={handleEmailInput}
        passwordErrorAlert={passwordErrorAlert}
        getHelperText={getHelperText}
        RegisterButtonClick={RegisterButtonClick}
        handleRegisterClicked={handleRegisterClicked}
        isValidRegistration={isValidRegistration}
        />
    </>
  )
}

export default Register;