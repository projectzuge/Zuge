import axios from "axios";
import { useEffect } from "react";

function Authorize({ setCookie, removeCookie, children }) {
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    await axios
      .get("account")
      .then((response) => {
        if (response.status === 200) {
          setCookie("userData", response.data);
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          removeCookie("userData");
          console.log("No login found");
        }
      });
  };
  return <>{children}</>;
}

export default Authorize;
