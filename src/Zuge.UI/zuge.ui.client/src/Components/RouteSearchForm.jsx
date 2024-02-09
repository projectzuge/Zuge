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
import axios from "axios";
import moment from "moment";

// Note to devs: empty "formState" from sessionStorage when ticket is bought

const RouteSearchForm = (props) => {
  const cities = props.cities;
  const passengerTypes = ["Aikuinen", "Opiskelija", "Lapsi", "Eläkeläinen"];
  const [loading, setLoading] = useState(true);
  const [journeys, setJourneys] = useState([]);
  const [fromCity, setFromCity] = useState("Mistä");
  const [toCity, setToCity] = useState("Minne");
  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
  const [passengerType, setPassengerType] = useState(passengerTypes[0]);
  const [showFoundRoutesList, setShowFoundRoutesList] = useState(false);
  const [formattedDate, setFormattedDate] = useState(
    moment(dayjs(Date.now())).format("YYYY-MM-DD")
  );

  useEffect(() => {
    const savedFormState = JSON.parse(sessionStorage.getItem("formState"));
    if (savedFormState) {
      // Set states using the retrieved form state
      setFromCity(savedFormState.fromCity || cities[0]);
      setToCity(savedFormState.toCity || cities[1]);
      setSelectedDate(dayjs(savedFormState.selectedDate) || dayjs(Date.now()));
      setPassengerType(savedFormState.passengerType || passengerTypes[0]);
      setShowFoundRoutesList(savedFormState.showFoundRoutesList || false);
      setJourneys(savedFormState.journeys);
      setLoading(false);
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
      axios
        .post(
          "search",
          {
            date: formattedDate,
            from: fromCity,
            to: toCity,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            const cleanJourneys = cleanJourneysList(response.data.data);
            setJourneys(cleanJourneys);

            const formState = {
              fromCity,
              toCity,
              selectedDate,
              passengerType,
              showFoundRoutesList: true,
              journeys: cleanJourneys,
            };
            sessionStorage.setItem("formState", JSON.stringify(formState));
            setShowFoundRoutesList(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          console.log("Error details:", error.response);
        });
    }
  };

  const cleanJourneysList = (journeysList) => {
    if (journeysList.length > 0) {
      const startIndex = journeysList[0].stops.findIndex(
        (elem) => elem.departsFrom === fromCity
      );
      const endIndex = journeysList[0].stops.findIndex(
        (elem) => elem.departsFrom === toCity
      );

      // Handle cases where start or end index is not found
      if (startIndex === -1 || endIndex === -1) {
        console.error("Start or end index not found");
        return [];
      }

      const newArray = journeysList.map((route) => {
        const newStops = route.stops.slice(startIndex, endIndex + 1);

        // timestamps of the first and last stops
        const firstDeparture = moment(newStops[0].departsAt);
        const lastArrival = moment(newStops[newStops.length - 1].arrivesAt);

        // time difference in minutes
        const diffInMinutes = lastArrival.diff(firstDeparture, "minutes");

        let formattedDifference;

        if (diffInMinutes < 60) {
          formattedDifference = `${diffInMinutes} MIN`;
        } else {
          const hours = Math.floor(diffInMinutes / 60);
          const minutes = diffInMinutes % 60;
          formattedDifference = `${hours} H ${minutes} MIN`;
        }

        // Update the duration in the route object
        return {
          ...route,
          stops: newStops,
          duration: formattedDifference,
        };
      });
      return newArray;
    } else {
      return [];
    }
  };

  const handlePassengerTypeChange = async (event) => {
    setShowFoundRoutesList(false);
    setPassengerType(event.target.value);
  };

  const handleDateChange = async (date) => {
    setFormattedDate(moment(date.$d).format("YYYY-MM-DD"));
    setSelectedDate(date);
    setShowFoundRoutesList(false);
  };

  return (
    <Box
      id={
        props.DarkMode ? "search-form-container-dark" : "search-form-container"
      }
      marginTop="40px"
    >
      <FormControl fullWidth className="route-search-form" variant="outlined">
        <div id="single-select-div">
          <Select
            sx={{
              "&:hover": {
                "&& fieldset": {
                  border: props.DarkMode
                    ? "1px solid rgba(238, 238, 238, 0.5)"
                    : "1px solid rgba(38, 38, 38, 0.5)",
                },
              },
            }}
            id={props.DarkMode ? "from-cities-dark" : "from-cities"}
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
                  border: props.DarkMode
                    ? "1px solid rgba(238, 238, 238, 0.5)"
                    : "1px solid rgba(38, 38, 38, 0.5)",
                },
              },
            }}
            id={props.DarkMode ? "to-cities-dark" : "to-cities"}
            required
            value={toCity}
            onChange={handleToCityChange}
            inputProps={{ IconComponent: () => null }}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                style: {
                  backgroundColor: props.DarkMode ? "262626" : "#eeeeee",
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
              className={props.DarkMode ? "DatePickerDark" : "DatePicker"}
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
                  border: props.DarkMode
                    ? "1px solid rgba(238, 238, 238, 0.5)"
                    : "1px solid rgba(38, 38, 38, 0.5)",
                },
              },
            }}
            id={props.DarkMode ? "passenger-type-dark" : "passenger-type"}
            required
            value={passengerType}
            onChange={handlePassengerTypeChange}
            inputProps={{ IconComponent: () => null }}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                style: {
                  backgroundColor: props.DarkMode ? "#262626" : "#eeeeee",
                },
              },
            }}
          >
            {passengerTypes.map((pass) => (
              <MenuItem
                className={props.DarkMode ? "MenuItemDark" : "MenuItem"}
                key={pass}
                value={pass}
              >
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
        (loading
          ? null
          : ReactDOM.createPortal(
              <FoundRoutesList
                journeys={journeys}
                passengerType={passengerType}
                from={fromCity}
                to={toCity}
                date={selectedDate}
                DarkMode={props.DarkMode}
              />,
              document.getElementById("route-list-grid")
            ))}
    </Box>
  );
};

export default RouteSearchForm;
