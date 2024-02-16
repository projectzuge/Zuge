import ReviseJourneyInfo from "../Components/ReviseJourneyInfo";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ReviseAndPay = ({ DarkMode, cookies }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    toast.dismiss();
  }, []);
  sessionStorage.removeItem("emailsForTickets");

  return (
    <>
      <ReviseJourneyInfo DarkMode={DarkMode} cookies={cookies} />
    </>
  );
};

export default ReviseAndPay;
