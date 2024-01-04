import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import SingleNews from "./Pages/SingleNews.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {

  useEffect(() =>
    {
      fetch("Journey?departure=2023-12-29&from=Tampere&to=Keuruu")
            .then(response => response.json())
            .then(console.log)
    }, []);

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <MenuBar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/SingleNews" element={<SingleNews />} />
          </Routes>
        </ThemeProvider>
      </Router>
      <MenuBar id="menu-bar" />
      <div id="page-contents-container">
        <FrontPage />
      </div>
    </>
  );
}

export default App;