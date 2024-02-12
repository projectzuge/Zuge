import ProfileButtons from "../Components/ProfileButtons";
import Box from "@mui/material/Box";
import "./../Styles/Profile.css";
import ProfileComponent from "../Components/ProfileComponent";
import ProfileBoughtTickets from "../Components/ProfileBoughtTickets";
import { useState } from "react";
import AuthorizeView from "../Components/AuthorizeView";
import { toast } from "react-toastify";

const Profile = ({ DarkMode, cookies, setCookie }) => {
  const [selectedButton, setSelectedButton] = useState("Lippusi");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  toast.dismiss();
  return (
    <>
      <AuthorizeView>
        <Box id="profile-box">
          <ProfileButtons
            onButtonClick={handleButtonClick}
            selectedButton={selectedButton}
          />
          {selectedButton === "Omat tiedot" ? (
            <ProfileComponent DarkMode={DarkMode} cookies={cookies} setCookie={setCookie}/>
          ) : (
            <ProfileBoughtTickets DarkMode={DarkMode}/>
          )}
        </Box>
      </AuthorizeView>
    </>
  );
};

export default Profile;
