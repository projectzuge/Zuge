import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import UserMenu from "./Components/UserMenu.jsx";
import SingleNews from "./Pages/SingleNews.jsx";
import Contact from "./Pages/Contact.jsx";
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
        <MenuBar id="menu-bar"/>
        <div id="page-contents-container">
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/SingleNews" element={<SingleNews />} />
                <Route path="/user" element={<UserMenu />} /> 
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;