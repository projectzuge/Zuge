import "../Styles/FrontPage.css";
import NewsAddForm from "../Components/NewsAddForm";"../Components/NewsAddForm";

import './../Styles/FrontPage.css';

function NewsPage({ DarkMode }) {
  return (
    <>
      <NewsAddForm DarkMode={DarkMode} />
    </>
  );
}

export default NewsPage;
