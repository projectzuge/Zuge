import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MenuBar id="menu-bar"/>
        <div id="page-contents-container">
          <FrontPage />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
