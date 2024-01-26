import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

AuthorizeView.propTypes = {
  requiredRole: PropTypes.string = "admin" | "employee",
}

const UserContext = createContext({});
/**
 * @param requiredRole
 * "admin" > "employee" --
 * Wrap a page with AuthorizeView to only show it to someone logged in with the specified or greater role
 */
function AuthorizeView({requiredRole = "", children}) {

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); // add a loading state
  let emptyUser = { email: "" };
  const [user, setUser] = useState(emptyUser);
  const navigate = useNavigate();
  const pingUrl = "/account/pingauth/" + requiredRole;

  useEffect(() => {
    // Get the cookie value
    let retryCount = 0; // initialize the retry count
    let maxRetries = 10; // set the maximum number of retries
    let delay = 1000; // set the delay in milliseconds
    // define a delay function that returns a promise
    function wait(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }
    // define a fetch function that retries until status 200 or 401
    async function fetchWithRetry(url, options) {
      try {
        // make the fetch request
        // axios.get(url)
        //   .then(response => {
        //     if (response.status === 200) {
        //       let j = response.json();
        //       setUser({ email: j.email });
        //       setAuthorized(true);
        //     } else {
        //       return response;
        //     }
        //   });
        let response = await fetch(url, options);
        // check the status code
        if (response.status === 200) {
          console.log("Authorized");
          let j = await response.json();
          console.log(j);
          setUser({ email: j.email });
          setAuthorized(true);
          return response; // return the response
        } else if (response.status === 401 || response.status === 403) {
          console.log("Unauthorized");
          return response; // return the response
        } else {
          // throw an error to trigger the catch block
          throw new Error("" + response.status);
        }
      } catch (error) {
        // increment the retry count
        retryCount++;
        // check if the retry limit is reached
        if (retryCount > maxRetries) {
          // stop retrying and rethrow the error
          throw error;
        } else {
          // wait for some time and retry
          await wait(delay);
          return fetchWithRetry(url, options);
        }
      }
    }
    // call the fetch function with retry logic
    fetchWithRetry(pingUrl, {
      method: "GET",
    })
      .catch((error) => {
        // handle the final error
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);  // set loading to false when the fetch is done
      });
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
  // Display the username in a h1 tag
  if (props.value === "email")
    return <>{user.email}</>;
  else
    return <></>
}

export default AuthorizeView;