import PaymentForm from "../Components/PaymentForm";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Payment = ({DarkMode}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    toast.dismiss();
  }, []);
  return (
    <>
      <PaymentForm DarkMode={DarkMode}/>
    </>
  );
};

export default Payment;
