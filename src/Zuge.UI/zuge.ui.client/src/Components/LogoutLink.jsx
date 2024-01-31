import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutLink({children}) {

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("account/logout", {})
    .then((data) => {
      if (data.status === 200) {
        console.log("Logged out");
        navigate("/");
      }
      else {
        console.log("idk");
      }
      
    })
    .catch((error) => {
      console.error(error);
    })
  };
  return (
    <>
      <a href="" onClick={handleSubmit}>{children}</a>
    </>
  );
}

export default LogoutLink;