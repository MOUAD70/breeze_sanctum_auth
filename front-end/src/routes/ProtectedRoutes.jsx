import React from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = React.memo(({ children, requiredLevel }) => {
  const { authenticated, ssiapLevel } = useUserContext();

  if (!authenticated) return <Navigate to="/login" replace />;
  if (requiredLevel && ssiapLevel !== requiredLevel)
    return <Navigate to="/unauthorized" replace />;

  return children;
});

export default ProtectedRoute;
