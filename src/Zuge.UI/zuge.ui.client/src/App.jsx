import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import { useEffect } from "react";
import RouteInfo from "./Pages/RouteInfo.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  useEffect(() =>
    {
      fetch("Journey?departure=2023-12-29&from=Tampere&to=Keuruu")
            .then(response => response.json())
            .then(console.log)
    }, []);

  return (
    <>
      <MenuBar id="menu-bar" />
      <div id="page-contents-container">
        <Router>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/route" element={<RouteInfo />}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
