import axios from "axios";
import { useEffect } from "react";

function Authorize({setCookie, children}) {
  useEffect(() => {
    axios.get("account/authorize")
      .then(response => {
        if (response.status === 200) {
          setCookie("roles", response.data.roles);
          setCookie("userID", response.data.userId);
        }
      })
      .catch(() => {
        console.log("No login found");
      });
  },[]);

  return (
    <>{children}</>
  );
}

export default Authorize;