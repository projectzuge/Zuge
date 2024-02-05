import "../Styles/FrontPage.css";
import NewsAddForm from "../Components/NewsAddForm";"../Components/NewsAddForm";

import './../Styles/FrontPage.css';
import AuthorizeView from "../Components/AuthorizeView";

function NewsPage({ DarkMode }) {
  return (
    <>
      <AuthorizeView requiredRole={"admin"}>
        <NewsAddForm DarkMode={DarkMode}/>
      </AuthorizeView>
    </>
  );
}

export default NewsPage;
