import "./Styles/App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme.jsx";
import darkTheme from "./DarkTheme.jsx";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import { useState, useEffect } from "react";
import RouteInfo from "./Pages/RouteInfo.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./Components/LoadingSpinner.jsx";
import { RouteContext } from "./Contexts/RouteContext.js";
import SingleNews from "./Pages/SingleNews.jsx";
import UserMenu from "./Components/UserMenu.jsx";
import Contact from "./Pages/Contact.jsx";
import Register from "./Pages/Register.jsx";
import NewsPage from "./Pages/NewsPage.jsx";
import Profile from "./Pages/Profile.jsx";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [DarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get("Journey", {
        params: {
          departure: "2023-12-29",
          from: "Tampere",
          to: "Keuruu",
        },
      })
      .then((response) => {
        setJourneys(response.data);
        setLoading(false);
      })
      .then(console.log)
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.log("Error details:", error.response);
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={DarkMode ? darkTheme : theme}>
        <RouteContext.Provider value={journeys}>
          <Router>
            <MenuBar id="menu-bar" DarkMode={DarkMode} setDarkMode={setDarkMode} />
            <div id="page-contents-container">
              <Routes>
                  <Route path="/" element={
                    loading ? (
                      <LoadingSpinner />
                    ) : (
                      <FrontPage />
                    )
                  } />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/NewsPage" element={<NewsPage />} />
                  <Route path="/SingleNews" element={<SingleNews />} />
                  <Route path="/userMenu" element={<UserMenu />} />
                  <Route path="/register" element={<Register DarkMode={DarkMode} />} />
                  <Route path="/user" element={<Profile />} />
                  <Route path="/route" element={<RouteInfo />} />
              </Routes>
            </div>
          </Router>
        </RouteContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
