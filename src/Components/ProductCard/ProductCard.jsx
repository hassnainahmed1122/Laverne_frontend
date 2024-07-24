import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ProductCard = () => {
  const [quantity, setQuantity] = useState(0);
  const { t } = useTranslation();

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 0)); 
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-3/5 bg-white shadow-lg rounded-lg p-4 mt-2 flex flex-col space-y-2">
        <div className="flex justify-end items-start mb-2 space-x-2">
          <div className="flex flex-col space-y-1 text-right">
            <h2 className="text-lg font-semibold text-gray-800">{t('productName')}</h2>
            <span className="text-gray-600">{t('price')}</span>
          </div>
          <img
            src="https://via.placeholder.com/150"
            alt={t('productName')}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={handleIncrease}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-lg"
            >
              {t('increase')}
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-24 text-center border-gray-300 border rounded-md"
            />
            <button
              onClick={handleDecrease}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-lg"
            >
              {t('decrease')}
            </button>
          </div>
          <div className="text-gray-700 font-semibold">
            <span className='text-red-500'>*</span>
            {t('quantityLabel')}: {quantity}
          </div>
        </div>
      </div>
    </div>
  );
};
