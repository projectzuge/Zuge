import RouteInfoBlock from "../Components/RouteInfoBlock";
import { toast } from "react-toastify";
import { useEffect } from "react";

const RouteInfo = ({ DarkMode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    toast.dismiss();
  }, []);
  return (
    <>
      <RouteInfoBlock DarkMode={DarkMode}/>
    </>
  );
};

export default RouteInfo;
