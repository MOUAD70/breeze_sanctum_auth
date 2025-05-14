import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import UserContext from "./context/UserContext";

const App = () => {
  return (
    <UserContext >
      <RouterProvider router={routes} />
    </UserContext>
  );
};

export default App;
