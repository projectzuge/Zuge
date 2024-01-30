import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // default font family:
  typography: {
    fontFamily: "Inria Sans, sans-serif",
    smallFont: {
      fontSize: 14,
    },
    // Variant 2: Medium font sizes
    mediumFont: {
      fontSize: 18,
    },
    // Variant 3: Large font sizes
    largeFont: {
      fontSize: 22,
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
    primary: { main: "#eeeeee", contrastText: "#262626" },
    secondary: {
      main: "#52eb34",
      contrastText: "#262626",
      borderRadius: "10px",
      height: "60px",
    },
    notSelected: {
      main: "rgba(238, 238, 238, 0.9)",
      contrastText: "#262626",
    },
    addEmailButton: {
      main: "rgba(0, 0, 0, 0)",
    },
  },
  //style overrides:
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "10px",
          color: "#262626",
          "&:hover": {
            backgroundColor: "#eeeeee",
            outline: "1px solid rgba(38, 38, 38, 0.5)",
          },
        }),
        containedSecondary: {
          height: "56px",
          "&:hover": {
            backgroundColor: "#88ed74",
            outline: "1px solid rgba(38, 38, 38, 0.5)",
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
          color: "#262626",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#eeeeee",
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
        },
      },
    },
  },
  // Other theme configurations can be added here
});

export default theme;
