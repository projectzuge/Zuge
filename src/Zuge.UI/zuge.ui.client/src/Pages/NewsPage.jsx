import "../Styles/FrontPage.css";
import NewsAddForm from "../Components/NewsAddForm";"../Components/NewsAddForm";

import './../Styles/FrontPage.css';
import AuthorizeView, { AuthorizedUser } from "../Components/AuthorizeView";
import LogoutLink from "../Components/LogoutLink";

function NewsPage() {
  return (
    <>
      <AuthorizeView requiredRole={"admin"}>
        <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
        <NewsAddForm />
      </AuthorizeView>
    </>
  );
}

export default NewsPage;
