import "../Styles/FrontPage.css";
import NewsAddForm from "../Components/NewsAddForm";"../Components/NewsAddForm";
import { toast } from "react-toastify";
import './../Styles/FrontPage.css';
import AuthorizeView from "../Components/AuthorizeView";
import { useEffect } from "react";

function NewsPage({ DarkMode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    toast.dismiss();
  }, []);
  return (
    <>
      <AuthorizeView requiredRole={"employee"}>
        <NewsAddForm DarkMode={DarkMode}/>
      </AuthorizeView>
    </>
  );
}

export default NewsPage;
