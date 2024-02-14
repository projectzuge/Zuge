import PaymentForm from "../Components/PaymentForm";
import { toast } from "react-toastify";

const Payment = ({DarkMode}) => {
  window.scrollTo(0, 0);
  toast.dismiss();
  return (
    <>
      <PaymentForm DarkMode={DarkMode}/>
    </>
  );
};

export default Payment;
