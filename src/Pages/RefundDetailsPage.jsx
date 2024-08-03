import React, { useCallback, useEffect, useState } from 'react';
import { Navigator } from '../Components/Navigator/Navigator';
import { ProductCard } from '../Components/ProductCard/ProductCard';
import { ButtonNavigator } from '../Components/ButtonNavigator/ButtonNavigator';
import { useAuth } from '../Context/AuthContext';
import Loader from '../Components/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import CustomerInfoWithLogout from '../Components/Customer/Customer';

export const RefundDetailsPage = () => {
  const { orderItems, setOrderItems, setOrderData, setTotalPrice, setTotalQuantity, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  // Fetch order data
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
          toast.error(errorData.message)
          if (response.message.includes('Unauthorized') || response.message.includes('session expired')) {
            setTimeout(() => {
                logout();
            }, 1000);
        }
        return;
        }
        throw new Error(errorData.message || 'Error fetching order data');
      }

      const data = await response.json();
      const updatedOrderItems = data.order.OrderItems.map(item => ({
        ...item,
        refund_quantity: item.quantity
      }));

      const totalProducts = updatedOrderItems.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = parseFloat(data.order.sub_total).toFixed(2);

      setOrderData(data.order);
      setOrderItems(updatedOrderItems);
      setTotalPrice(totalPrice);
      setTotalQuantity(totalProducts);
    } catch (err) {
      console.error('Failed to fetch order data:', err);
    } finally {
      setLoading(false);
    }
  }, [setOrderData, setOrderItems, setTotalPrice, setTotalQuantity]);

  // Update totals based on item quantity change
  const updateTotals = (item, increase) => {
    const price = parseFloat(item.Product.price) || 0;
    const change = price * (increase ? 1 : -1);
    
    setTotalQuantity(prevQuantity => {
      const newQuantity = increase ? prevQuantity + 1 : prevQuantity - 1;
      setTotalPrice(prevPrice => {
        const newPrice = (parseFloat(prevPrice) + change).toFixed(2);
        return newPrice > 0 ? newPrice : '0';
      });
      return newQuantity;
    });
  };

  // Handle increase/decrease of refund quantity
  const handleQuantityChange = (id, increase) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id
          ? { ...item, refund_quantity: Math.min(Math.max(item.refund_quantity + (increase ? 1 : -1), 0), item.quantity) }
          : item
      );
      const updatedItem = updatedItems.find(item => item.id === id);
      if (updatedItem) {
        updateTotals(updatedItem, increase);
      }
      return updatedItems;
    });
  };

  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

  if (loading) return <Loader />;

  return (
    <>
      <CustomerInfoWithLogout />
      <ToastContainer />
      <Navigator />
      {orderItems.length === 0 ? (
        <p className='w-100 flex justify-center'>No Product Found.</p>
      ) : (
        orderItems.map(item => (
          <ProductCard
            key={item.id}
            item={item}
            onIncrease={() => handleQuantityChange(item.id, true)}
            onDecrease={() => handleQuantityChange(item.id, false)}
          />
        ))
      )}
      <ButtonNavigator backLocation='/product-list' />
    </>
  );
};
