// src/context/AuthProvider.jsx
import React, { useState } from "react";
import AuthContext from "./AuthContext";
import API from "../services/api";
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const login = async (password) => {
    try {
      const res = await API.login({ senha: password });
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
