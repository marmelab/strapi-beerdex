import React, { useContext, useCallback } from "react";

import * as authApi from "./api";
import { useLocalStorage } from "../utils/useLocalStorage";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useLocalStorage("beerdex-auth", null);

  const login = useCallback(async (identifier, password) => {
    try {
      setToken(await authApi.login(identifier, password));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const logout = useCallback(() => setToken(null), []);

  return <AuthContext.Provider value={{ login, logout, token }} {...props} />;
};

export const useAuth = () => useContext(AuthContext);
