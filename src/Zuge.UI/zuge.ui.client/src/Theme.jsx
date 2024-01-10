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
  // default button:
  palette: {
    primary: { main: "#eeeeee", contrastText: "#262626" },
  },
  //button hover (can include others too):
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          "&:hover": {
            backgroundColor: "#eeeeee",
            outline: "1px solid rgba(38, 38, 38, 0.5)",
          },
        }),
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
  },
  // Other theme configurations can be added here
});

export default theme;
