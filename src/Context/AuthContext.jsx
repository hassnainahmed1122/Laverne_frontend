import React, { createContext, useState, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();


  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  };
  // Memoize the navigation function
  const navigateTo = useCallback((path) => {
    navigate(path);
  }, []);

  // Memoize the function to set token and mark authenticated
  const setTokenAndAuthenticatedToTrue = useCallback((token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  }, []);

  // Memoize the login function
  const login = useCallback((order_number, phone_number) => {
    localStorage.setItem("order_number", order_number);
    localStorage.setItem("phone_number", phone_number);
  }, []);

  // Memoize the function to go to login page
  const goToLogin = useCallback(() => {
    localStorage.removeItem("order_number");
    localStorage.removeItem("phone_number");
    setTimeout(() => {
      navigateTo("/login");
    }, 1000);
  }, []);

  // Memoize the context value
  const value = useMemo(() => ({
    isAuthenticated,
    orderData,
    setOrderData,
    login,
    goToLogin,
    setTokenAndAuthenticatedToTrue,
    totalQuantity,
    totalPrice,
    setTotalPrice,
    setTotalQuantity,
    setOrderItems,
    orderItems,
    setIsAuthenticated,
    navigateTo,
    logout
  }), [
    isAuthenticated,
    orderData,
    totalQuantity,
    totalPrice,
    orderItems,
    login,
    logout,
    goToLogin,
    setTokenAndAuthenticatedToTrue,
    setTotalPrice,
    setTotalQuantity,
    setOrderItems,
    setOrderData,
    setIsAuthenticated,
    navigateTo
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
