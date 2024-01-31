import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import "../Styles/PurchaseDone.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PurchaseDone = ({ DarkMode }) => {
  const navigate = useNavigate();
  const emails = JSON.parse(sessionStorage.getItem("emailsForTickets"));

  const onBackToFrontPageClick = async () => {
    sessionStorage.removeItem("emailsForTicket");
    sessionStorage.removeItem("routeDataState");
    sessionStorage.removeItem("formState");
    navigate("/");
  };

  return (
    <>
      <Grid
        container
        id={DarkMode ? "purchase-ok-grid-dark" : "purchase-ok-grid"}
      >
        <Typography variant="largeFont" marginBottom={"40px"}>
          Maksu onnistui!
        </Typography>
        {emails.length !== 0 ? (
          emails.length === 1 ? (
            <>
              <Typography variant="mediumFont" marginBottom={"30px"}>
                Matkalippu on lähetetty sähköpostiosoitteeseen
              </Typography>
              <Typography variant="mediumBoldFont">{emails}</Typography>
            </>
          ) : (
            <>
              <Typography variant="mediumFont" marginBottom={"30px"}>
                Matkalippu on lähetetty seuraaviin sähköpostiosoitteesiin:
              </Typography>
              {emails.map((email, index) => (
                <Typography
                  variant="mediumBoldFont"
                  marginBottom={"20px"}
                  key={index}
                >
                  {email}
                </Typography>
              ))}
            </>
          )
        ) : (
          <Typography>
            Liput on lähetetty sähköpostiin. Tarkista myös roskakori.
          </Typography>
        )}
        <Button
          id="back-to-front-page-button"
          color={"primary"}
          variant="contained"
          onClick={onBackToFrontPageClick}
        >
          Etusivulle
        </Button>
      </Grid>
    </>
  );
};

export default PurchaseDone;
