import { createTheme } from "@mui/material/styles";

const DarkTheme = createTheme({
  // default font family:
  typography: {
    fontFamily: "Inria Sans, sans-serif",
    xsFont: {
      fontSize: 11,
    },
    // Variant 2: Small font sizes
    smallFont: {
      fontSize: 14,
    },
    // Variant 3: Medium font sizes
    mediumFont: {
      fontSize: 18,
    },
    // Variant 4: Large font sizes
    largeFont: {
      fontSize: 22,
    },
    xsBoldFont: {
      fontSize: 11,
      fontWeight: "bolder",
    },
    smallBoldFont: {
      fontSize: 14,
      fontWeight: "bolder",
    },
    // Variant 2: Medium font sizes
    mediumBoldFont: {
      fontSize: 18,
      fontWeight: "bolder",
    },
    // Variant 3: Large font sizes
    largeBoldFont: {
      fontSize: 22,
      fontWeight: "bolder",
    },

    color: "#eeeeee",
  },

  // buttons:
  palette: {
    primary: { main: "#262626", contrastText: "#eeeeee" },
    secondary: {
      main: "#205c14",
      contrastText: "#eeeeee",
      borderRadius: "10px",
      height: "60px",
    },
    notSelected: {
      main: "rgba(38, 38, 38, 0.9)",
      contrastText: "#eeeeee",
    },
  },
  //style overrides:
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: "#eeeeee",
          backgroundColor: "#262626",
        }),
      },
    },
    MuiList: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: "#262626",
        }),
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: "#909090",
        }),
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: ({ ownerState }) => ({
          color: "#eeeeee",
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: "rgba(255, 255, 255, 0.54)",
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          padding: "15px",
          borderRadius: "10px",
          color: "#eeeeee",
          "&:hover": {
            backgroundColor: "#262626",
            outline: "1px solid rgba(238, 238, 238, 0.5)",
          },
        }),
        containedSecondary: {
          height: "56px",
          "&:hover": {
            backgroundColor: "#58994b", // Set the desired hover color
            // for secondary buttons
            outline: "1px solid rgba(238, 238, 238, 0.5)",
          },
        },
        containedAddEmailButton: {
          "&:hover": {
            border: "none",
            outline: "none",
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Inria Sans, sans-serif",
          color: "#eeeeee !important",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#262626",
            color: "#eeeeee",
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:not(:hover)": {
            "& fieldset": {
              border: "none",
            },
          },
          "&:hover": {
            outline: "1px solid rgba(238, 238, 238, 0.5)",
          },
        },
      },
    },
  },
  // Other theme configurations can be added here
});

export default DarkTheme;
