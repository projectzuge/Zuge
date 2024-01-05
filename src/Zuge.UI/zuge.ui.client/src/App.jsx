import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import { useState, useEffect } from "react";
import RouteInfo from "./Pages/RouteInfo.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./Components/LoadingSpinner.jsx";
import { RouteContext } from "./Contexts/RouteContext.js";

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
      <MenuBar id="menu-bar" />
      <div id="page-contents-container">
        <RouteContext.Provider value={journeys}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  loading ? (
                    <LoadingSpinner />
                  ) : (
                    <FrontPage />
                  )
                }
              />
              <Route path="/route" element={<RouteInfo />} />
            </Routes>
          </Router>
        </RouteContext.Provider>
      </div>
    </>
  );
}

export default App;
