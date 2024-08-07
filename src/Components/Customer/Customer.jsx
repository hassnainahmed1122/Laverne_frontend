import React, { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';

const CustomerInfoWithLogout = () => {
    const { orderData, logout } = useAuth();
    const Customer = orderData?.Customer;
    const {t} = useTranslation();

    return (
        <div className="flex justify-between items-center p-4">
            <div>
                <h1 className="text-xl font-bold">
                    {Customer ? `${Customer.first_name} ${Customer.last_name}` : t('noCustomerData')}
                </h1>
                <button onClick={logout} className="text-red-500 mt-2">
                    {t(`logout`)}
                </button>
            </div>
        </div>
    );
};

export default CustomerInfoWithLogout;
