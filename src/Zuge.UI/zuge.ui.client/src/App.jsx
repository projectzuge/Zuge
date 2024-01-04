import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteInfo from "./Pages/RouteInfo.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [journeys, setJourneys] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.log("Error details:", error.response);
      });
  }, []);

  return (
    <>
      <MenuBar id="menu-bar" />
      <div id="page-contents-container">
        <Router>
          <Routes>
            <Route path="/" element={<FrontPage journeys={journeys}/>} />
            <Route path="/route" element={<RouteInfo />}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
