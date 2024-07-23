import React from 'react';
import { FaWhatsapp, FaHeadphonesAlt } from 'react-icons/fa';

export const BankInfoConfirmation = () => {
  return (
    <div className="w-2/5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-center">
          Your refund request has been successfully confirmed
        </h1>
      </div>
      
      <div className="p-6">
        <div className="border border-gray-300 p-4 text-center rounded-md">
          <p className="text-lg font-medium">#order_id :order number</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-100">
        <div className="flex items-center space-x-2">
          <FaWhatsapp className="text-gray-500 text-xl" />
          <p className="text-gray-600">+966920029219</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">Technical Support</p>
          <FaHeadphonesAlt className="text-gray-600 text-xl" />
        </div>
      </div>
    </div>
  );
};

