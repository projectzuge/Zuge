import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutLink({ children }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("account/logout", {})
      .then((data) => {
        console.log("data in log out: ", data);
        if (data.status === 200) {
          console.log("Logged out");
          navigate("/");
          sessionStorage.removeItem("userData");
        } else {
          console.log("idk");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <a href="" onClick={handleSubmit}>
        {children}
      </a>
    </>
  );
}

export default LogoutLink;
