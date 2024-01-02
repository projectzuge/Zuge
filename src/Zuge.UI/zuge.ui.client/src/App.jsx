import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";

function App() {
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
