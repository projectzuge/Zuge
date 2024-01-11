import ProfileButtons from "../Components/ProfileButtons";
import Box from "@mui/material/Box";
import "./../Styles/Profile.css";
import ProfileComponent from "../Components/ProfileComponent";

const Profile = () => {
  return (
    <>
      <Box id="profile-box">
        <ProfileButtons />
        <ProfileComponent />
      </Box>
    </>
  );
};

export default Profile;
