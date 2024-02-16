import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutLink({ handleLogout, removeCookie, children }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("account/logout", {})
      .then((data) => {
        if (data.status === 200) {
          console.log("Logged out");
          handleLogout();
          navigate("/");
        } else {
          console.log("Something went wrong with logout");
        }
      })
      .catch((error) => {
        console.error(error);
            removeCookie("userData");

      });
  };
  return (
    <>
      <a onClick={handleSubmit} style={{ textDecoration: "none" }}>
        {children}
      </a>
    </>
  );
}

export default LogoutLink;
