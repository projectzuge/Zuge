import "../Styles/RouteSearchForm.css";
import { useState } from "react";
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

const RouteSearchForm = () => {
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

  const [fromCity, setFromCity] = useState(arrayOfCities[0]);
  const [toCity, setToCity] = useState(arrayOfCities[1]);
  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));

  const handleFromCityChange = (event) => {
    setFromCity(event.target.value);
  };

  const handleToCityChange = (event) => {
    setToCity(event.target.value);
  };

  const handleSearchRoutesClick = () => {
    console.log("From City:", fromCity);
    console.log("To City:", toCity);
    console.log("Selected Date:", selectedDate.format("YYYY-MM-DD"));
    // Handle form submission here with fromCity, toCity, and selectedDate
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
                onChange={(newDate) => setSelectedDate(newDate)}
                renderInput={(params) => <TextField {...params} />}
                minDate={dayjs(Date.now())} // current date
                maxDate={dayjs().add(1, "year")} // one year ahead
              />
            </LocalizationProvider>
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
