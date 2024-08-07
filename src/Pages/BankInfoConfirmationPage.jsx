import { Navigator } from "../Components/Navigator/Navigator";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BankInfoConfirmation } from "../Components/BankInfoConfirmation/BankInfoConfirmation";
import { useNavigate, useParams } from "react-router-dom";
import CustomerInfoWithLogout from "../Components/Customer/Customer";
import { useAuth } from "../Context/AuthContext";
import React, { useCallback, useEffect } from "react";
import { toast ,ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Footer } from "../Components/Footer/Footer";


export const BankInfoConfirmationPage = () => {
   const navigte = useNavigate();
   const { id } = useParams();
   const {t} = useTranslation();
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
            const updatedOrderItems = data.order.OrderItems.map(item => ({
                ...item,
                refund_quantity: 0
            }));

            setOrderData(data.order);
            setOrderItems(updatedOrderItems);
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
        <BankInfoConfirmation id={id}/>
        <div className="flex justify-center mt-10">
            <button className="w-1/5 flex items-center justify-center bg-black text-white px-2 py-4 rounded-full space-x-2"
                onClick={() => navigte('/product-list')}
            >
                <span className="text-center">{t('backToSite')}</span>
                <MdOutlineKeyboardArrowRight className="text-white" />
            </button>
        </div>
        {/* <Footer /> */}
    </>
   ) 
}