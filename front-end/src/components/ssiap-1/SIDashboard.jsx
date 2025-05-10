import React from "react";
import { useUserContext } from "../../context/UserContext";

const SIDashboard = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <div>
      You're Logged In!
      <h1>SSIAP 1 Dashboard</h1>
    </div>
  );
};

export default SIDashboard;
