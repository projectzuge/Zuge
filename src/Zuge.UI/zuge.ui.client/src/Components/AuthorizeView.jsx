import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

/**
 * @param requiredRole
 * "admin" > "employee" --
 * Wrap a page with AuthorizeView to only show it to someone logged in with the specified or greater role
 */
function AuthorizeView({requiredRole = "", children}) {

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pingUrl = "account/pingauth/" + requiredRole;

  useEffect(() => {
    axios.get(pingUrl)
      .then(response => {
        if (response.status === 200) {
          setAuthorized(true);
        } else {
          return response;
        }
      })
      .catch(error => {
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
        {children}
      </>
    );
  } else {
    navigate("/");
  }
}

export default AuthorizeView;