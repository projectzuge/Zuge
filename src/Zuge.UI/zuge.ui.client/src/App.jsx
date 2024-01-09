import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import SingleNews from "./Pages/SingleNews.jsx";
import Contact from "./Pages/Contact.jsx";
import NewsPage from "./Pages/NewsPage.jsx";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
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
                <Route path="/user" element={<FrontPage />} /> 
                <Route path="/SingleNews" element={<SingleNews />} />
                <Route path="/NewsPage" element={<NewsPage />} /> 

            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;