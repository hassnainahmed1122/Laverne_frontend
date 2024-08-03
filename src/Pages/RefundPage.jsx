import React, { useEffect, useState, useCallback } from 'react';
import { Navigator } from '../Components/Navigator/Navigator';
import { RequestCard } from '../Components/RequestCard/RequestCard';
import Loader from '../Components/Loader/Loader';
import { useAuth } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import CustomerInfoWithLogout from '../Components/Customer/Customer';

export const RefundPage = () => {
    const [loading, setLoading] = useState(true);
    const { orderData, setOrderData, setOrderItems, logout } = useAuth();
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
                    return;
                }
            }

            const data = await response.json();
            const updatedOrderItems = data.order.OrderItems.map(item => ({
                ...item,
                refund_quantity: item.quantity
            }));

            setOrderData(data.order);
            setOrderItems(updatedOrderItems);
        } catch ({ response }) {
            toast.error(response.data.message + "logout")
            if (response.message.includes('Unauthorized') || response.message.includes('session expired')) {
                setTimeout(() => {
                    logout();
                }, 1000);
            }
        } finally {
            setLoading(false);
        }
    }, [setOrderData, setOrderItems]);

    useEffect(() => {
        fetchOrderData();
    }, [fetchOrderData]);

    if (loading) return <Loader />;

    const { Customer } = orderData || {};

    return (
        <>
            <ToastContainer /> 
            <CustomerInfoWithLogout />
            <Navigator />
            {orderData ? (
                <RequestCard key={orderData.id} orderData={orderData} />
            ) : (
                <p className='w-100 flex justify-center'>No order data available.</p>
            )}
        </>
    );
};
