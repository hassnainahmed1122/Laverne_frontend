import React from 'react';
import { TiShoppingCart } from "react-icons/ti";


export const RefundBasket = () => {
  return (
    <div className="flex w-full max-w-md mx-auto bg-gray-400 rounded-lg overflow-hidden hidden sm:flex rounded-md">
      <div className="w-8/10 bg-gray-300 text-white px-5 py-4 text-right">
        <h2 className="text-xl">Refund Bucket</h2>
        <p className="text-sm mt-2">SAR 0 - projects 0</p>
      </div>
      <div className="w-2/10 bg-gray-500 px-4 py-2 flex items-center justify-center">
        <TiShoppingCart size={32} color="white" />
      </div>
    </div>
  );
};

