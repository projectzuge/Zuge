import PurchaseDone from "../Components/PurchaseDone";
import { toast } from "react-toastify";

const SuccessfulPayment = ({DarkMode}) => {
  window.scrollTo(0, 0);
  toast.dismiss();
  return (
    <>
      <PurchaseDone DarkMode={DarkMode}/>
    </>
  );
};

export default SuccessfulPayment;
