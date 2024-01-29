import ProfileButtons from "../Components/ProfileButtons";
import Box from "@mui/material/Box";
import "./../Styles/Profile.css";
import ProfileComponent from "../Components/ProfileComponent";
import ProfileBoughtTickets from "../Components/ProfileBoughtTickets";
import { useState } from "react";

const Profile = ({ DarkMode }) => {
  const [selectedButton, setSelectedButton] = useState("Lippusi");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  return (
    <>
      <Box id="profile-box">
        <ProfileButtons
          onButtonClick={handleButtonClick}
          selectedButton={selectedButton}
        />
        {selectedButton === "Omat tiedot" ? (
          <ProfileComponent DarkMode={DarkMode} />
        ) : (
          <ProfileBoughtTickets DarkMode={DarkMode} />
        )}
      </Box>
    </>
  );
};

export default Profile;
