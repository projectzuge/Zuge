import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Grid } from "@mui/material";

const ProfileButtons = () => {
  return (
    <>
      <Grid item id="profile-button-group-container">
        <ButtonGroup
          style={{ height: "70px" }}
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>Lippusi</Button>
          <Button>Omat tiedot</Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default ProfileButtons;
