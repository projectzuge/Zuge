import ReviseJourneyInfo from "../Components/ReviseJourneyInfo";

const ReviseAndPay = ({DarkMode, cookies}) => {
  return (
    <>
      <ReviseJourneyInfo DarkMode={DarkMode} cookies={cookies}/>
    </>
  );
};

export default ReviseAndPay;
