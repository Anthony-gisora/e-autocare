import { useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";

const MechanicContext = createContext();

export const useMechanic = () => useContext(MechanicContext);

export const MechanicProvider = ({ children }) => {
  const { user } = useUser();

  const [mechanic, setMechanic] = useState(null);

  useEffect(() => {
    console.log("context provider Loaded... ");
    console.log(mechanic);
  }, [mechanic, user]);

  return (
    <MechanicContext.Provider value={{ mechanic, setMechanic }}>
      {children}
    </MechanicContext.Provider>
  );
};
