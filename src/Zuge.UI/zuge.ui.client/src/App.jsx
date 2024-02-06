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
import Contact from "./Pages/Contact.jsx";
import Register from "./Pages/Register.jsx";
import NewsPage from "./Pages/NewsPage.jsx";
import Profile from "./Pages/Profile.jsx";
import RegisterSuccess from "./Pages/RegisterSuccess.jsx";
import ReviseAndPay from "./Pages/ReviseAndPay.jsx";
import { JourneyProvider } from "./Contexts/SelectedRouteContext.jsx";
import Payment from "./Pages/Payment.jsx";
import SuccessfulPayment from "./Pages/SuccessfulPayment.jsx";
import { useCookies } from 'react-cookie';
import Authorize from "./Components/Authorize.jsx";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["userID", "DarkMode", "email", "roles"]);
  const [DarkMode, setDarkMode] = useState(cookies.DarkMode);

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
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.log("Error details:", error.response);
      });
  }, []);

  return (
    <>
      <Authorize setCookie={setCookie}>
        <ThemeProvider theme={DarkMode ? darkTheme : theme}>
          <RouteContext.Provider value={journeys}>
            <JourneyProvider>
              <Router>
                <div id={DarkMode ? "body-dark" : "body-light"}>
                  <MenuBar
                    id="menu-bar"
                    DarkMode={DarkMode}
                    setDarkMode={setDarkMode}
                    cookies={cookies}
                    setCookie={setCookie}
                    removeCookie={removeCookie}
                    />
                  <div id="page-contents-container">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          loading ? (
                            <LoadingSpinner />
                            ) : (
                              <FrontPage DarkMode={DarkMode} />
                              )
                            }
                            />
                      <Route
                        path="/contact"
                        element={<Contact DarkMode={DarkMode} />}
                        />
                      <Route
                        path="/NewsPage"
                        element={<NewsPage DarkMode={DarkMode} />}
                        />
                      <Route
                        path="/SingleNews"
                        element={<SingleNews DarkMode={DarkMode} cookies={cookies} />}
                        />
                      <Route
                        path="/register"
                        element={<Register DarkMode={DarkMode} />}
                        />
                      <Route
                        path="/user"
                        element={<Profile DarkMode={DarkMode} />}
                        />
                      <Route
                        path="/route"
                        element={<RouteInfo DarkMode={DarkMode} />}
                        />
                      <Route
                        path="/revise"
                        element={<ReviseAndPay DarkMode={DarkMode} />}
                        />
                      <Route
                        path="/payment"
                        element={<Payment DarkMode={DarkMode} />}
                        />
                      <Route 
                      path="/successfulRegister" 
                      element={<RegisterSuccess DarkMode={DarkMode} />} />
                      <Route
                        path="/purchaseDone"
                        element={<SuccessfulPayment DarkMode={DarkMode} />}
                        />
                    </Routes>
                  </div>
                </div>
              </Router>
            </JourneyProvider>
          </RouteContext.Provider>
        </ThemeProvider>
      </Authorize>
    </>
  );
}

export default App;
