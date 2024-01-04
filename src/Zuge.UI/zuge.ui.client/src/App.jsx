import "./Styles/App.css";
import FrontPage from "./Pages/FrontPage.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import SingleNews from "./Pages/SingleNews.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <MenuBar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/SingleNews" element={<SingleNews />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;