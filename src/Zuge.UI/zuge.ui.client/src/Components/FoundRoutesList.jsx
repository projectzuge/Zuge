import SingleFoundRoute from "./SingleFoundRoute";
import Box from "@mui/material/Box";

const FoundRoutesList = (props) => {
    const fromCity = props.from;
    const toCity = props.to;
    const passengerType = props.passenger;
    const travelDate = props.date;
    console.log(travelDate, typeof travelDate);

  return (
    <Box id="found-routes-list-box">
        <p>{fromCity} {toCity} {passengerType} {travelDate}</p>
      <SingleFoundRoute />
    </Box>
  );
};

export default FoundRoutesList;
