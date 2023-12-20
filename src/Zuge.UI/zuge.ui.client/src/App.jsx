import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme.jsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <MenuBar />
          <FrontPage />
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
