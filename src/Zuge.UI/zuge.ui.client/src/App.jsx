import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MenuBar />
        <FrontPage />
      </ThemeProvider>
    </>
  );
}

export default App;
