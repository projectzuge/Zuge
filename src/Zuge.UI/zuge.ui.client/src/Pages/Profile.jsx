import ProfileButtons from "../Components/ProfileButtons";
import Box from "@mui/material/Box";
import "./../Styles/Profile.css";
import ProfileComponent from "../Components/ProfileComponent";
import ProfileBoughtTickets from "../Components/ProfileBoughtTickets";
import { useState } from "react";
import AuthorizeView from "../Components/AuthorizeView";

const Profile = ({ DarkMode, cookies, setCookie }) => {
  window.scrollTo(0, 0);
  const [selectedButton, setSelectedButton] = useState("Omat tiedot");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  return (
    <>
      <AuthorizeView>
        <div id="profile-div">
          <Box id="profile-box">
            <ProfileButtons
              onButtonClick={handleButtonClick}
              selectedButton={selectedButton}
            />
            {selectedButton === "Omat tiedot" ? (
              <ProfileComponent
                DarkMode={DarkMode}
                cookies={cookies}
                setCookie={setCookie}
              />
            ) : (
              <ProfileBoughtTickets DarkMode={DarkMode} />
            )}
          </Box>
        </div>
      </AuthorizeView>
    </>
  );
};

export default Profile;
