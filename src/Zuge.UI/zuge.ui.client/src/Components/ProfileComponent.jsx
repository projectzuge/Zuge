import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import "../Styles/ProfileComponent.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const ProfileComponent = () => {
  // these will be users own information when such info is available!!!
  const placeholderFirstName = "Etunimi";
  const placeholderLastName = "Sukunimi";
  const placeholderEmail = "Sähköpostiosoite";
  const placeholderPhone = "Puhelinnumero";

  return (
    <>
      <Box>
        <FormGroup>
          <FormControl>
            <Grid container id="textfield-grid">
              <Grid item xs="12">
                <Typography variant="largeBoldFont">Henkilötiedot</Typography>
              </Grid>
              <Grid item xs="12" md="12" lg="6" xl="6">
                <TextField
                  InputProps={{ sx: { borderRadius: "10px" } }}
                  id="profile-text-field"
                  fullWidth
                  defaultValue={placeholderFirstName}
                >
                  {placeholderFirstName}
                </TextField>
              </Grid>
              <Grid item xs="12" md="12" lg="6" xl="6">
                <TextField
                  InputProps={{ sx: { borderRadius: "10px" } }}
                  id="profile-text-field"
                  fullWidth
                  defaultValue={placeholderLastName}
                >
                  {placeholderLastName}
                </TextField>
              </Grid>
              <Grid item xs="12" md="12" lg="6" xl="6">
                <TextField
                  InputProps={{ sx: { borderRadius: "10px" } }}
                  id="profile-text-field"
                  fullWidth
                  defaultValue={placeholderEmail}
                >
                  {placeholderEmail}
                </TextField>
              </Grid>
              <Grid item xs="12" md="12" lg="6" xl="6">
                <TextField
                  InputProps={{ sx: { borderRadius: "10px" } }}
                  id="profile-text-field"
                  fullWidth
                  defaultValue={placeholderPhone}
                >
                  {placeholderPhone}
                </TextField>
              </Grid>
              <Grid item xs="12" md="12" lg="6" xl="6">
                <Button fullWidth color={"secondary"} variant="contained">
                  Vaihda salasana
                </Button>
              </Grid>
              <Grid item xs="12" md="12" lg="6" xl="6">
                <Button fullWidth color={"secondary"} variant="contained">
                  Tallenna
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </FormGroup>
      </Box>
    </>
  );
};

export default ProfileComponent;
