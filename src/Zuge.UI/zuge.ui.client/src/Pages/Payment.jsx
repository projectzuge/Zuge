import PaymentForm from "../Components/PaymentForm";
import { toast } from "react-toastify";

const Payment = ({DarkMode}) => {
  toast.dismiss();
  return (
    <>
      <PaymentForm DarkMode={DarkMode}/>
    </>
  );
};

export default Payment;
