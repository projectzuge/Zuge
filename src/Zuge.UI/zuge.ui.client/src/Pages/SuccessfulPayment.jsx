import PurchaseDone from "../Components/PurchaseDone";
import { toast } from "react-toastify";

const SuccessfulPayment = ({DarkMode}) => {
  toast.dismiss();
  return (
    <>
      <PurchaseDone DarkMode={DarkMode}/>
    </>
  );
};

export default SuccessfulPayment;
