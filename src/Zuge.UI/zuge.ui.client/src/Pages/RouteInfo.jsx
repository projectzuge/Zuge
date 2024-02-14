import RouteInfoBlock from "../Components/RouteInfoBlock";
import { toast } from "react-toastify";

const RouteInfo = ({ DarkMode }) => {
  window.scrollTo(0, 0);
  toast.dismiss();
  return (
    <>
      <RouteInfoBlock DarkMode={DarkMode}/>
    </>
  );
};

export default RouteInfo;
