import Box from "@mui/material/Box";
import "../Styles/ProfileComponent.css";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const ProfileBoughtTickets = () => {
  return (
    <>
      <Box>
        <Grid container id="profile-journeys-grid" spacing="20px">
          <Grid item id="personal-info-box">
            <Typography variant="largeBoldFont">Tulevat matkat</Typography>
          </Grid>
          <Grid item id="personal-info-box">
            <Typography variant="largeBoldFont">Menneet matkat</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfileBoughtTickets;
