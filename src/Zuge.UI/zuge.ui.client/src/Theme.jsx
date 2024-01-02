import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // default font family:
  typography: {
    fontFamily: "Inria Sans, sans-serif",
    p: {
      fontFamily: "Inria Sans, sans-serif", // Apply Inria Sans to heading level 1
    },
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
        },
      },
    },
  },
  // Other theme configurations can be added here
});

export default theme;
