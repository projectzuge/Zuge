import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';


const UserContext = createContext({});
/**
 * @param requiredRole
 * "admin" > "employee" --
 * Wrap a page with AuthorizeView to only show it to someone logged in with the specified or greater role
 */
function AuthorizeView({requiredRole = "", children}) {

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  let emptyUser = { email: "" };
  const [user, setUser] = useState(emptyUser);
  const navigate = useNavigate();
  const pingUrl = "account/pingauth/" + requiredRole;

  useEffect(() => {
    axios.get(pingUrl)
      .then(response => {
        if (response.status === 200) {
          setUser({ email: response.data.email });
          setAuthorized(true);
        } else {
          console.log(response);
          return response;
        }
      })
      .catch(error => {
        // handle errors later
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  } else if (authorized && !loading) {
    return (
      <>
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      </>
    );
  } else {
    navigate(-1);
  }
}

export function AuthorizedUser(props) {
  // Consume the username from the UserContext
  const user = React.useContext(UserContext);
  if (props.value === "email")
    return <>{user.email}</>;
  else
    return <></>
}

export default AuthorizeView;