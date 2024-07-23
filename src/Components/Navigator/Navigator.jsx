import React from 'react';
import { IoWalletOutline } from 'react-icons/io5';
import { TiShoppingCart } from 'react-icons/ti';
import { FaCheck } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export const Navigator = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isRefundRequest = currentPath.includes('/refund-request');
  const isBankingInfo = currentPath.includes('/bank-info');

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-1/2 mx-auto h-[14vh] bg-white my-10 px-4">
      <div
        className={`w-full md:w-2/5 flex items-center space-x-2 relative mb-4 md:mb-0 ${
          isBankingInfo ? 'text-gray-800' : 'text-gray-400'
        }`}
      >
        <span
          className={`text-sm md:text-md font-semibold ${
            isBankingInfo ? 'text-gray-800' : 'text-gray-400'
          }`}
        >
          Banking Data
        </span>
        <div className="relative">
          <IoWalletOutline
            className={`text-${isBankingInfo ? 'gray-800' : 'gray-500'}`}
            size={35}
          />
          <span
            className={`absolute top-0 right-[-4px] md:right-[-6px] transform translate-y-[-50%] inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 text-xs font-bold ${
              isBankingInfo ? 'text-gray-100 bg-green-700' : 'text-red-100 bg-gray-600'
            } rounded-full`}
          >
            0
          </span>
        </div>
      </div>

      <div
        className={`w-full md:w-1/5 flex justify-center mb-4 md:mb-0 ${
          isRefundRequest ? 'border-gray-800' : 'border-gray-400'
        } border`}
      >
      </div>

      <div
        className={`w-full md:w-2/5 flex items-center space-x-2 justify-end relative ${
          isRefundRequest ? 'text-gray-800' : 'text-gray-400'
        }`}
      >
        <span
          className={`text-sm md:text-md font-semibold ${
            isRefundRequest ? 'text-gray-800' : 'text-gray-400'
          }`}
        >
          Refund Basket
        </span>
        <div className="relative">
          <TiShoppingCart
            className={`text-${isRefundRequest ? 'gray-800' : 'gray-500'}`}
            size={35}
          />
          <div
            className={`absolute top-0 right-[-4px] md:right-[-6px] transform translate-y-[-50%] p-1 ${
              isRefundRequest ? 'bg-green-700' : 'bg-gray-700'
            } rounded-full`}
          >
            <FaCheck className="text-white" size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

