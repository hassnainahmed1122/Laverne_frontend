import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Context/AuthContext';

export const ProductCard = ({ item, onIncrease, onDecrease }) => {
  const { t } = useTranslation();
  const {
    refund_quantity: refundQuantity = 0,
    quantity: itemQuantity = 0,
    Product: {
      name,
      price = 0,
      tax = 0,
      discount = 0,
      thumbnail,
      tax_percentage: taxPercentage = 0,
    },
  } = item;

  // Calculations
  const itemPrice = parseFloat(price);
  const itemTaxPercentage = parseFloat(taxPercentage);
  const itemDiscount = parseFloat(discount);

  const basePrice = itemPrice * refundQuantity;
  const totalDiscount = itemDiscount * refundQuantity;
  const priceAfterDiscount = basePrice - totalDiscount;
  const taxAmount = (priceAfterDiscount * (itemTaxPercentage / 100)).toFixed(2);
  const totalPrice = (parseFloat(basePrice) + parseFloat(taxAmount) - parseFloat(totalDiscount)).toFixed(2);

  // Event Handlers
  const handleDecrease = () => onDecrease(item.id);
  const handleIncrease = () => onIncrease(item.id);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-3/5 bg-white shadow-lg rounded-lg p-4 mt-2 flex flex-col space-y-2">
        <div className="flex justify-end items-start mb-2 space-x-2">
          <div className="flex flex-col space-y-1 text-right">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <span className="text-gray-600">{t('price', { price: itemPrice.toFixed(2) })}</span>
            <span className="text-gray-600">{t('tax', { price: taxAmount })}</span>
            <span className="text-gray-600">{`TAX Percentage: ${item?.Product?.tax_percentage}%`}</span>
            <span className="text-gray-600">{t('discount', { price: totalDiscount.toFixed(2) })}</span>
            <span className="text-gray-600">{t('totalProductPrice', { price: totalPrice })}</span>
          </div>
          <img
            src={thumbnail}
            alt={name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleIncrease}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-lg"
              disabled={refundQuantity >= itemQuantity}
            >
              {t('increase')}
            </button>
            <input
              type="number"
              min={0}
              max={itemQuantity}
              value={refundQuantity}
              readOnly
              className="w-24 text-center border-gray-300 border rounded-md"
            />
            <button
              onClick={handleDecrease}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-lg"
              disabled={refundQuantity === 0}
            >
              {t('decrease')}
            </button>
          </div>
          <div className="text-gray-700 font-semibold">
            <span className="text-red-500">*</span>
            {t('quantityLabel')}: {itemQuantity}
          </div>
        </div>
      </div>
    </div>
  );
};
