import React from "react";
import { useUserContext } from "../../context/UserContext";

const SIIDashboard = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <div>
      <h1>ssiap 2 dashboard</h1>
    </div>
  );
};

export default SIIDashboard;
