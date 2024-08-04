import React from 'react';
import { FaWhatsapp, FaHeadphonesAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const BankInfoConfirmation = ({id}) => {
  const { t } = useTranslation();

  return (
    <div className="w-2/5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-center">
          {t('refundRequestConfirmed')} 
        </h1>
      </div>
      
      <div className="p-6">
        <div className="border border-gray-300 p-4 text-center rounded-md">
          <p className="text-lg font-medium">{t('orderId', {order_id: id})}</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-100">
        <div className="flex items-center space-x-2">
          <FaWhatsapp className="text-gray-500 text-xl" />
          <p className="text-gray-600">{t('contactNumber')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">{t('technicalSupport')}</p>
          <FaHeadphonesAlt className="text-gray-600 text-xl" />
        </div>
      </div>
    </div>
  );
};
