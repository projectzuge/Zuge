import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
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
      <MenuBar id="menu-bar" />
      <div id="page-contents-container">
        <FrontPage />
      </div>
    </>
  );
}

export default App;
