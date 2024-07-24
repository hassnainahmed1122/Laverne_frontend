import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  const increaseQuantity = (value) => {
    setQuantity(prevQuantity => prevQuantity + value);
  };

  const decreaseQuantity = (value) => {
    setQuantity(prevQuantity => Math.max(prevQuantity - value, 0));
  };

  const increasePrice = (value) => {
    setPrice(prevPrice => prevPrice + value);
  };

  const decreasePrice = (value) => {
    setPrice(prevPrice => Math.max(prevPrice - value, 0));
  };

  const login = () => {
    localStorage.setItem("token", "fake-token");
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, quantity, price, increaseQuantity, decreaseQuantity, increasePrice, decreasePrice }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
