import ProfileButtons from "../Components/ProfileButtons";
import Box from "@mui/material/Box";
import "./../Styles/Profile.css";
import ProfileComponent from "../Components/ProfileComponent";
import ProfileBoughtTickets from "../Components/ProfileBoughtTickets";
import { useState } from "react";
import AuthorizeView, { AuthorizedUser } from "../Components/AuthorizeView";
import LogoutLink from "../Components/LogoutLink";

const Profile = () => {
  const [selectedButton, setSelectedButton] = useState("Lippusi");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  return (
    <>
      <AuthorizeView>
        <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
        <Box id="profile-box">
          <ProfileButtons
            onButtonClick={handleButtonClick}
            selectedButton={selectedButton}
          />
          {selectedButton === "Omat tiedot" ? (
            <ProfileComponent />
          ) : (
            <ProfileBoughtTickets />
          )}
        </Box>
      </AuthorizeView>
    </>
  );
};

export default Profile;
