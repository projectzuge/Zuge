import "../Styles/RouteSearchForm.css";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import FoundRoutesList from "./FoundRoutesList.jsx";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

// Note to devs: empty "formState" from sessionStorage when ticket is bought

const RouteSearchForm = (props) => {
  const cities = props.cities;
  const passengerTypes = ["Aikuinen", "Opiskelija", "Lapsi", "Eläkeläinen"];
  const [fromCity, setFromCity] = useState("Mistä");
  const [toCity, setToCity] = useState("Minne");
  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
  const [passengerType, setPassengerType] = useState(passengerTypes[0]);
  const [showFoundRoutesList, setShowFoundRoutesList] = useState(false);

  useEffect(() => {
    const savedFormState = JSON.parse(sessionStorage.getItem("formState"));

    if (savedFormState) {
      // Set states using the retrieved form state
      setFromCity(savedFormState.fromCity || cities[0]);
      setToCity(savedFormState.toCity || cities[1]);
      setSelectedDate(dayjs(savedFormState.selectedDate) || dayjs(Date.now()));
      setPassengerType(savedFormState.passengerType || passengerTypes[0]);
      setShowFoundRoutesList(savedFormState.showFoundRoutesList || false);
    }
  }, []);

  const handleFromCityChange = async (event) => {
    setShowFoundRoutesList(false);
    setFromCity(event.target.value);
  };

  const handleToCityChange = async (event) => {
    setShowFoundRoutesList(false);
    setToCity(event.target.value);
  };

  const handleSearchRoutesClick = async () => {
    if (fromCity !== toCity && fromCity !== "Mistä" && toCity !== "Minne") {
      setShowFoundRoutesList(true);

      const formState = {
        fromCity,
        toCity,
        selectedDate,
        passengerType,
        showFoundRoutesList: true,
      };

      sessionStorage.setItem("formState", JSON.stringify(formState));
    }
  };

  const handlePassengerTypeChange = async (event) => {
    setShowFoundRoutesList(false);
    setPassengerType(event.target.value);
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setShowFoundRoutesList(false);
  };

  return (
    <Box id={props.DarkMode? "search-form-container-dark" : "search-form-container"} marginTop="40px">
      <FormControl fullWidth className="route-search-form" variant="outlined">
        <div id="single-select-div">
          <Select
            sx={{
              "&:hover": {
                "&& fieldset": {
                  border: props.DarkMode? "1px solid rgba(238, 238, 238, 0.5)" : "1px solid rgba(38, 38, 38, 0.5)",
                },
              },
            }}
            id={props.DarkMode? "from-cities-dark" : "from-cities"}
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
            <MenuItem disabled value={"Mistä"}>
              {"Mistä"}
            </MenuItem>
            {cities.map((city) => (
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
                  border: props.DarkMode? "1px solid rgba(238, 238, 238, 0.5)" : "1px solid rgba(38, 38, 38, 0.5)",
                },
              },
            }}
            id={props.DarkMode? "to-cities-dark" : "to-cities"}
            required
            value={toCity}
            onChange={handleToCityChange}
            inputProps={{ IconComponent: () => null }}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                style: {
                  backgroundColor: props.DarkMode? "262626" : "#eeeeee",
                },
              },
            }}
          >
            <MenuItem disabled value={"Minne"}>
              {"Minne"}
            </MenuItem>

            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div id="date-picker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={props.DarkMode? "DatePickerDark" : "DatePicker"}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  outline: "0px transparent",
                  border: "0px transparent",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid rgba(38, 38, 38, 0.5)",
                  },
              }}
              format="DD.MM.YYYY"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="date-picker-elem"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "red",
                      },
                      "&:hover fieldset": {
                        borderColor: "green",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "purple",
                      },
                    },
                  }}
                />
              )}
              minDate={dayjs("2023-12-29")}
              // change minDate back to this when possible!!! :
              // minDate={dayjs(Date.now())} // current date
              maxDate={dayjs().add(1, "year")} // one year ahead
            />
          </LocalizationProvider>
        </div>
        <div id="single-select-div">
          <Select
            sx={{
              "&:hover": {
                "&& fieldset": {
                  border: props.DarkMode? "1px solid rgba(238, 238, 238, 0.5)" : "1px solid rgba(38, 38, 38, 0.5)",
                },
              },
            }}
            id={props.DarkMode? "passenger-type-dark" : "passenger-type"}
            required
            value={passengerType}
            onChange={handlePassengerTypeChange}
            inputProps={{ IconComponent: () => null }}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                style: {
                  backgroundColor: props.DarkMode? "#262626" : "#eeeeee",
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
      <Button
        color={"primary"}
        id="fetch-routes-button"
        variant="contained"
        onClick={handleSearchRoutesClick}
      >
        Hae matkoja
      </Button>

      {showFoundRoutesList &&
        ReactDOM.createPortal(
          <FoundRoutesList
            from={fromCity}
            to={toCity}
            date={selectedDate}
            passenger={passengerType}
            DarkMode={props.DarkMode}
          />,
          document.getElementById("route-list-grid")
        )}
    </Box>
  );
};

export default RouteSearchForm;
