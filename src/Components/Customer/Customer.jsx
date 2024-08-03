import React, { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';

const CustomerInfoWithLogout = () => {
    const { orderData, logout } = useAuth();
    const Customer = orderData?.Customer;


    return (
        <div className="flex justify-between items-center p-4">
            <div>
                <h1 className="text-xl font-bold">
                    {Customer ? `${Customer.first_name} ${Customer.last_name}` : 'No Customer Data'}
                </h1>
                <button onClick={logout} className="text-red-500 mt-2">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default CustomerInfoWithLogout;
