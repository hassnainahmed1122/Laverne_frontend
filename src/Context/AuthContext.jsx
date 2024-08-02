import React, { createContext, useState, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const fetchOrderData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/customer/order-details', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message.includes('Unauthorized') || errorData.message.includes('session expired')) {
          setTimeout(() => {
            logout();
          }, 1000);
          return;
        }
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setOrderData(data.order);
    } catch (err) {
      console.error('Failed to fetch order data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("order_number");
    localStorage.removeItem("phone_number");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }, []);

  const setTokenAndAuthenticatedToTrue = useCallback((token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  }, []);

  const login = useCallback((order_number, phone_number) => {
    localStorage.setItem("order_number", order_number);
    localStorage.setItem("phone_number", phone_number);
  }, []);

  const goToLogin = useCallback(() => { 
    localStorage.removeItem("order_number");
    localStorage.removeItem("phone_number");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, []);

  const increaseQuantity = useCallback((value) => {
    setQuantity(prevQuantity => prevQuantity + value);
  }, []);

  const decreaseQuantity = useCallback((value) => {
    setQuantity(prevQuantity => Math.max(prevQuantity - value, 0));
  }, []);

  const increasePrice = useCallback((value) => {
    setPrice(prevPrice => prevPrice + value);
  }, []);

  const decreasePrice = useCallback((value) => {
    setPrice(prevPrice => Math.max(prevPrice - value, 0));
  }, []);

  const value = useMemo(() => ({
    isAuthenticated, 
    orderData, 
    loading, 
    error, 
    logout,
    login,
    goToLogin,
    fetchOrderData,
    setTokenAndAuthenticatedToTrue,
    increasePrice,
    increaseQuantity,
    decreasePrice,
    decreaseQuantity, 
    quantity,
    price
  }), [isAuthenticated, orderData, loading, error, quantity, price, logout, login, goToLogin, fetchOrderData, setTokenAndAuthenticatedToTrue, increasePrice, increaseQuantity, decreasePrice, decreaseQuantity]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
