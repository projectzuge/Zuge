import Box from "@mui/material/Box";
import "../Styles/ProfileBoughtTickets.css";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import SingleBoughtTicket from "./SingleBoughtTicket";

const ProfileBoughtTickets = ({ DarkMode }) => {
  // in context ?
  const placeholderJourneys = [
    {
      from: "Tampere",
      to: "Keuruu",
      date: "21.12.2023",
      departure: "20.12",
      arrival: "22.12",
    },
    {
      from: "Keuruu",
      to: "Tampere",
      date: "30.12.2023",
      departure: "20.12",
      arrival: "22.12",
    },
    {
      from: "Tampere",
      to: "Keuruu",
      date: "21.12.2024",
      departure: "20.12",
      arrival: "22.12",
    },
    {
      from: "Keuruu",
      to: "Tampere",
      date: "30.12.2024",
      departure: "20.12",
      arrival: "22.12",
    },
  ];

  const isJourneyBeforeNow = (journey) => {
    const currentDateTime = new Date();

    // THIS IS WITH PROPER DATA:
    // const journeyDateTime = new Date(`${journey.date}T${journey.departure}:00`);

    // This only with placeholder data
    const [day, month, year] = journey.date.split(".");
    const [hours, minutes] = journey.departure.split(".");

    const journeyDateTime = new Date(
      `${year}-${month}-${day}T${hours}:${minutes}:00`
    );

    return journeyDateTime < currentDateTime;
  };

  return (
    <>
      <Box id="journeys-info-box">
        <Grid container id="profile-journeys-grid" spacing="20px">
          <Grid item id={DarkMode? "journeys-box-dark" : "journeys-box"} xs={12}>
            <Typography variant="largeBoldFont">Tulevat matkat</Typography>
            {placeholderJourneys.map((journey, index) =>
              isJourneyBeforeNow(journey) ? null : (
                <SingleBoughtTicket
                  key={index}
                  from={journey.from}
                  to={journey.to}
                  departure={journey.departure}
                  arrival={journey.arrival}
                  date={journey.date}
                  DarkMode={DarkMode}
                />
              )
            )}
          </Grid>
          <Grid item id={DarkMode? "journeys-box-dark" : "journeys-box"} xs={12}>
            <Typography variant="largeBoldFont">Menneet matkat</Typography>
            {placeholderJourneys.map((journey, index) =>
              isJourneyBeforeNow(journey) ? (
                <SingleBoughtTicket
                  key={index}
                  from={journey.from}
                  to={journey.to}
                  departure={journey.departure}
                  arrival={journey.arrival}
                  date={journey.date}
                  DarkMode={DarkMode}
                />
              ) : null
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfileBoughtTickets;
