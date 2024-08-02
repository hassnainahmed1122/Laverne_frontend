import React, { useEffect } from 'react';
import { Navigator } from '../Components/Navigator/Navigator';
import { RequestCard } from '../Components/RequestCard/RequestCard';
import Loader from '../Components/Loader/Loader';
import { useAuth } from '../Context/AuthContext';

export const RefundPage = (props) => {
    const { orderData, logout, loading, fetchOrderData } = useAuth();
    useEffect(() => {
        fetchOrderData()
    }, [])

    if (loading) {
        return <Loader />;
    }

    if (!orderData) {
        return <div>No order data available.</div>;
    }

    const { Customer } = orderData;

    return (
        <>
            <div className="flex justify-between items-center p-4">
                <div>
                    <h1 className="text-xl font-bold">{`${Customer?.first_name} ${Customer?.last_name}`}</h1>
                    <button onClick={logout} className="text-red-500 mt-2">Logout</button>
                </div>
            </div>
            <Navigator />
            {orderData && (
                <RequestCard key={orderData.id} orderData={orderData} />
            )}
        </>
    );
};
