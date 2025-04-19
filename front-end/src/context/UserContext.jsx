import { React, createContext, useContext, useState } from "react";
import SsiApi from "../services/api/ssiap-1/SsiApi";

// User state context default values.
export const SSIStateContext = createContext({
  user: {},
  setUser: () => {},
  authenticated: false,
  setAuthenticated: () => {},
  login: (email, password) => {},
  logout: () => {},
});

// User context component.
const UserContext = ({ children }) => {
  const [user, setUser] = useState();
  const [authenticated, _setAuthenticated] = useState(
    window.localStorage.getItem("AUTHENTICATED")
  );

  const login = async (email, password) => {
    await SsiApi.getCsrfToken();
    return SsiApi.login(email, password);
  };

  const logout = () => {
    setUser({});
    _setAuthenticated(false);
  };

  const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated);
    window.localStorage.setItem("AUTHENTICATED", isAuthenticated);
  };
  return (
    <div>
      <SSIStateContext.Provider
        value={{
          user,
          setUser,
          authenticated,
          setAuthenticated,
          login,
          logout,
        }}
      >
        {children}
      </SSIStateContext.Provider>
    </div>
  );
};

export default UserContext;
export const useUserContext = () => useContext(SSIStateContext);
