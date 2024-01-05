import "../Styles/RouteSearchForm.css";
import { useState } from "react";
import FoundRoutesList from "./FoundRoutesList.jsx";
import { createRoot } from "react-dom/client";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme.jsx";
import moment from "moment";

const RouteSearchForm = () => {
  // these arrays are placeholders until data can be fetched from backend
  const arrayOfCities = [
    "Helsinki",
    "Pasila",
    "Tikkurila",
    "Riihimäki",
    "Hämeenlinna",
    "Toijala",
    "Lempäälä",
    "Tampere",
  ];

  const passengerTypes = ["Aikuinen", "Opiskelija", "Lapsi", "Eläkeläinen"];

  const [fromCity, setFromCity] = useState(arrayOfCities[0]);
  const [toCity, setToCity] = useState(arrayOfCities[1]);
  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
  const [passengerType, setPassengerType] = useState(passengerTypes[0]);

  const handleFromCityChange = async (event) => {
    setFromCity(event.target.value);
  };

  const handleToCityChange = async (event) => {
    setToCity(event.target.value);
  };

  const handleSearchRoutesClick = async () => {
    console.log("From City:", fromCity);
    console.log("To City:", toCity);
    console.log("Selected Date:", selectedDate);
    console.log("Who travels:", passengerType);
    let formattedDate = moment(selectedDate).format("DD.MM.YYYY");

    if (fromCity !== toCity) {
      const listGrid = document.getElementById("route-list-grid");
      if (listGrid) {
        const root = createRoot(listGrid);

        // Render the component using createRoot
        root.render(
          <FoundRoutesList
            from={fromCity}
            to={toCity}
            date={formattedDate}
            passenger={passengerType}
          />
        );
      }
    }
  };

  const handlePassengerTypeChange = async (event) => {
    setPassengerType(event.target.value);
  };

  const handleDateChange = async (date) => {
    let formattedDate = moment(date).format("DD.MM.YYYY");
    setSelectedDate(formattedDate);
  };

  return (
    <Box id="search-form-container">
      <FormGroup>
        <FormControl fullWidth className="route-search-form">
          <div id="single-select-div">
            <Select
              sx={{
                "&:hover": {
                  "&& fieldset": {
                    border: "1px solid rgba(38, 38, 38, 0.5)",
                  },
                },
              }}
              id="from-cities"
              required
              value={fromCity}
              onChange={handleFromCityChange}
              inputProps={{ IconComponent: () => null }}
              MenuProps={{
                disableScrollLock: true,
                PaperProps: {
                  style: {
                    backgroundColor: "#eeeeee",
                  },
                },
              }}
            >
              {arrayOfCities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div id="single-select-div">
            <Select
              sx={{
                "&:hover": {
                  "&& fieldset": {
                    border: "1px solid rgba(38, 38, 38, 0.5)",
                  },
                },
              }}
              id="to-cities"
              required
              value={toCity}
              onChange={handleToCityChange}
              inputProps={{ IconComponent: () => null }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#eeeeee",
                  },
                },
              }}
            >
              {arrayOfCities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div id="date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD.MM.YYYY"
                label="Lähtö"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                minDate={dayjs(Date.now())} // current date
                maxDate={dayjs().add(1, "year")} // one year ahead
              />
            </LocalizationProvider>
          </div>
          <div id="single-select-div">
            <Select
              sx={{
                "&:hover": {
                  "&& fieldset": {
                    border: "1px solid rgba(38, 38, 38, 0.5)",
                  },
                },
              }}
              id="passenger-type"
              required
              value={passengerType}
              onChange={handlePassengerTypeChange}
              inputProps={{ IconComponent: () => null }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#eeeeee",
                  },
                },
              }}
            >
              {passengerTypes.map((pass) => (
                <MenuItem key={pass} value={pass}>
                  {pass}
                </MenuItem>
              ))}
            </Select>
          </div>
        </FormControl>
        <ThemeProvider theme={theme}>
          <Button
            color={"primary"}
            id="fetch-routes-button"
            variant="contained"
            onClick={handleSearchRoutesClick}
          >
            Hae matkoja
          </Button>
        </ThemeProvider>
      </FormGroup>
    </Box>
  );
};

export default RouteSearchForm;
