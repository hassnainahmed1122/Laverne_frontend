import { Navigator } from "../Components/Navigator/Navigator"
import { RefundForm } from "../Components/RefundForm/RefundForm"
import { ButtonNavigator } from "../Components/ButtonNavigator/ButtonNavigator"
import CustomerInfoWithLogout from "../Components/Customer/Customer"
import { useAuth } from "../Context/AuthContext"
import { ToastContainer, toast } from "react-toastify"
import React, {useEffect, useCallback } from "react"
import { Footer } from "../Components/Footer/Footer"
export const BankInfoPage = (props) => {
    const {  setOrderData, setOrderItems, logout } = useAuth();
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
                    setTimeout(() => {
                        logout();
                    }, 1000);
                    return;
                }
            }

            const data = await response.json();

            setOrderData(data.order);
        } catch ({ response }) {
            toast.error(response.data.message + "logout")
            console.error('Failed to fetch order data:', response.data.message);
        } finally {
        }
    }, [setOrderData, setOrderItems]);

    useEffect(() => {
        fetchOrderData();
    }, [fetchOrderData]);
    return (
        <>
            <ToastContainer />
            <CustomerInfoWithLogout />
            <Navigator />
            <RefundForm />
            <ButtonNavigator backLocation={'/product-list/details'}/>
            <Footer/>
        </>
    )
}