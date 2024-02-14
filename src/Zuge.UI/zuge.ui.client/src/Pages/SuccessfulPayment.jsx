import PurchaseDone from "../Components/PurchaseDone";
import { toast } from "react-toastify";
import "../Styles/PurchaseDone.css";

const SuccessfulPayment = ({ DarkMode }) => {
  window.scrollTo(0, 0);
  toast.dismiss();
  return (
    <>
      <div id="purchase-done-div">
        <PurchaseDone DarkMode={DarkMode} />
      </div>
    </>
  );
};

export default SuccessfulPayment;
