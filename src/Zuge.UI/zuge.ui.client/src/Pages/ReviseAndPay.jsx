import ReviseJourneyInfo from "../Components/ReviseJourneyInfo";
import { toast } from "react-toastify";

const ReviseAndPay = ({ DarkMode, cookies }) => {
  toast.dismiss();
  sessionStorage.removeItem("emailsForTickets");

  return (
    <>
      <ReviseJourneyInfo DarkMode={DarkMode} cookies={cookies} />
    </>
  );
};

export default ReviseAndPay;
