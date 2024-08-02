import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Context/AuthContext';

export const ProductCard = ({ item }) => {
  const { quantity, increaseQuantity, decreaseQuantity, increasePrice, decreasePrice } = useAuth();
  const { t } = useTranslation();

  const { quantity: itemQuantity,Product } = item;
  const {
    name,
    price,
    tax,
    discount,
    thumbnail,
  } = Product;

  const totalPrice = (parseFloat(price) + parseFloat(tax) - parseFloat(discount)) * itemQuantity;

  const handleDecrease = () => {
    if (itemQuantity > 0) {
      decreaseQuantity(1);
      decreasePrice(parseFloat(price) + parseFloat(tax) - parseFloat(discount));
    }
  };

  const handleIncrease = () => {
    if (quantity < itemQuantity) {
      increaseQuantity(1);
      increasePrice(parseFloat(price) + parseFloat(tax) - parseFloat(discount));
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-3/5 bg-white shadow-lg rounded-lg p-4 mt-2 flex flex-col space-y-2">
        <div className="flex justify-end items-start mb-2 space-x-2">
          <div className="flex flex-col space-y-1 text-right">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <span className="text-gray-600">{t('price', { price: totalPrice.toFixed(2) })}</span>
          </div>
          <img
            src={thumbnail}
            alt={name}
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
              value={itemQuantity}
              min="0"
              max={itemQuantity}
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
            {t('quantityLabel')}: {itemQuantity}
          </div>
        </div>
      </div>
    </div>
  );
};
