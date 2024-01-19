import { createContext, useState, useContext } from "react";

export const SelectedRouteContext = createContext();

export const JourneyProvider = ({ children }) => {
  const [selectedJourney, setSelectedJourney] = useState(null);

  const setJourney = (journey) => {
    setSelectedJourney(journey);
  };

  return (
    <SelectedRouteContext.Provider value={{ selectedJourney, setJourney }}>
      {children}
    </SelectedRouteContext.Provider>
  );
};

export const useJourney = () => {
  const context = useContext(SelectedRouteContext);
  if (!context) {
    throw new Error("useJourney must be used within a JourneyProvider");
  }
  return context;
};