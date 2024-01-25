import "./Styles/App.css";
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
import NewsPage from "./Pages/NewsPage.jsx";
import Profile from "./Pages/Profile.jsx";
import ReviseAndPay from "./Pages/ReviseAndPay.jsx";
import { JourneyProvider } from "./Contexts/SelectedRouteContext.jsx";
import Payment from "./Pages/Payment.jsx";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <RouteContext.Provider value={journeys}>
        <JourneyProvider>
          <Router>
            <MenuBar id="menu-bar" />
            <div id="page-contents-container">
              <Routes>
                <Route
                  path="/"
                  element={loading ? <LoadingSpinner /> : <FrontPage />}
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/NewsPage" element={<NewsPage />} />
                <Route path="/SingleNews" element={<SingleNews />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/route" element={<RouteInfo />} />
                <Route path="/revise" element={<ReviseAndPay />} />
                <Route path="/payment" element={<Payment />} />
              </Routes>
            </div>
          </Router>
        </JourneyProvider>
      </RouteContext.Provider>
    </>
  );
}

export default App;
