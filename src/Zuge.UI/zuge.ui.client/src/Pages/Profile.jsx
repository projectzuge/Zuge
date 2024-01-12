import ProfileButtons from "../Components/ProfileButtons";
import Box from "@mui/material/Box";
import "./../Styles/Profile.css";
import ProfileComponent from "../Components/ProfileComponent";
import ProfileBoughtTickets from "../Components/ProfileBoughtTickets";

const Profile = () => {
  return (
    <>
      <Box id="profile-box">
        <ProfileButtons />
        <ProfileComponent />
        <ProfileBoughtTickets />
      </Box>
    </>
  );
};

export default Profile;
