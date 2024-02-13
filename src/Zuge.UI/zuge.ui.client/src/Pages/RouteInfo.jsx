import RouteInfoBlock from "../Components/RouteInfoBlock";
import { toast } from "react-toastify";

const RouteInfo = ({ DarkMode }) => {
  toast.dismiss();
  return (
    <>
      <RouteInfoBlock DarkMode={DarkMode}/>
    </>
  );
};

export default RouteInfo;
