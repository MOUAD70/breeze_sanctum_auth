import { createContext, useContext, useState } from "react";
import SsiApi from "../services/api/SsiApi";

export const SSIStateContext = createContext({
  user: null,
  setUser: () => {},
  authenticated: false,
  setAuthenticated: () => {},
  ssiapLevel: null,
  setSsiapLevel: () => {},
  login: async () => {},
  logout: () => {},
  setToken: () => {},
});

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("USER");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [ssiapLevel, setSsiapLevel] = useState(() => {
    const level = localStorage.getItem("SSIAP_LEVEL");
    return level ? parseInt(level) : null;
  });
  const [authenticated, _setAuthenticated] = useState(() => {
    return localStorage.getItem("AUTHENTICATED") === "true";
  });

  const login = async (email, password) => {
    const response = await SsiApi.login(email, password);
    setUser(response.data.user);
    localStorage.setItem("USER", JSON.stringify(response.data.user));
    return response;
  };

  const logout = async () => {
    try {
      await Promise.race([
        SsiApi.logout(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Logout timeout")), 3000)
        ),
      ]);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setSsiapLevel(null);
      _setAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.clear();
      localStorage.removeItem("USER");
    }
  };

  const setAuthenticated = (isAuthenticated, level = null) => {
    _setAuthenticated(isAuthenticated);
    localStorage.setItem("AUTHENTICATED", isAuthenticated);
    if (level) {
      setSsiapLevel(level);
      localStorage.setItem("SSIAP_LEVEL", level);
    }
  };

  const setToken = (token) => {
    window.localStorage.setItem("token", token);
  };

  return (
    <div>
      <SSIStateContext.Provider
        value={{
          user,
          setUser,
          authenticated,
          setAuthenticated,
          ssiapLevel,
          setSsiapLevel,
          login,
          logout,
          setToken,
        }}
      >
        {children}
      </SSIStateContext.Provider>
    </div>
  );
};

export default UserContext;
export const useUserContext = () => useContext(SSIStateContext);
