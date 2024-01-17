import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Grid } from "@mui/material";

const ProfileButtons = (props) => {
  const onButtonClick = props.onButtonClick;
  const selectedButton = props.selectedButton;

  return (
    <>
      <Grid item id="profile-button-group-container">
        <ButtonGroup
          style={{ height: "70px" }}
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => onButtonClick("Lippusi")}
            color={selectedButton === "Lippusi" ? "primary" : "notSelected"}
          >
            Lippusi
          </Button>
          <Button
            onClick={() => onButtonClick("Omat tiedot")}
            color={
              selectedButton === "Omat tiedot" ? "primary" : "notSelected"
            }
          >
            Omat tiedot
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default ProfileButtons;
