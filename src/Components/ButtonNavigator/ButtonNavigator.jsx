import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiCalculator } from 'react-icons/gi';
import { MdOutlineKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Context/AuthContext';
import { Modal } from '../Modal/Modal';

export const ButtonNavigator = ({ backLocation }) => {
  const { orderData, orderItems, setTotalPrice, totalPrice } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isBankInfoPage = location.pathname.includes('/bank-info');

  // Calculate totals using useMemo
  const { totalAmount, totalTax, totalDiscount, orderTax } = useMemo(() => {
    const initialValues = { priceSum: 0, taxSum: 0, discountSum: 0, };

    const totals = orderItems.reduce((acc, item) => {
      const quantity = parseFloat(item.refund_quantity);
      const price = parseFloat(item.Product.price);
      const tax = parseFloat(item.Product.tax);
      const discount = parseFloat(item.Product.discount);

      acc.priceSum += price * quantity;
      acc.taxSum += tax * quantity;
      acc.discountSum += discount * quantity;
      
      return acc;
    }, initialValues);
    const shippingCost = parseFloat(orderData?.shipping_cost) || 0;
    const cashOnDelivery = parseFloat(orderData?.cash_on_delivery) || 0;
    const otherCostTax = (parseFloat(orderData?.tax_percentage) / 100) * (shippingCost + cashOnDelivery)
    const refundFee = 19;

    const finalTotalPrice = (totals.priceSum + totals.taxSum - otherCostTax - totals.discountSum - shippingCost - cashOnDelivery - refundFee).toFixed(2);

    return {
      totalDiscount: totals.discountSum.toFixed(2),
      totalAmount: finalTotalPrice,
      totalTax: (totals.taxSum).toFixed(2),
      orderTax: otherCostTax.toFixed(2)
    };
  }, [orderItems, orderData]);

  const handleBackClick = () => navigate(backLocation);

  const handleFillBankDetailsClick = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleNextClick = () => {
    setTotalPrice(totalAmount);
    navigate('/bank-info');
  };

  return (
    <div className="flex justify-center w-full mt-10">
      <div className={`flex w-full max-w-4xl bg-white ${isBankInfoPage ? 'justify-center' : ''}`}>
        {!isBankInfoPage && (
          <button
            className={`flex text-center items-center bg-black text-white px-4 py-2 ${isBankInfoPage ? 'w-1/5' : 'w-2/5'} space-x-2`}
            onClick={handleFillBankDetailsClick}
          >
            <MdKeyboardArrowLeft />
            <p>{t('fillBankDetails')}</p>
          </button>
        )}
        <div
          className={`space-x-2 border border-black text-black bg-white flex items-center justify-center ${isBankInfoPage ? 'w-1/5' : 'w-2/5'}`}
        >
          <GiCalculator className="text-black text-2xl italic" />
          {t('totalBasket', { price: totalPrice })}
        </div>
        <button
          className="flex text-left items-center bg-black text-white px-4 py-2 w-1/5 space-x-2"
          onClick={handleBackClick}
        >
          <p>{t('back')}</p>
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} handleNextClick={handleNextClick}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">{t('receipt')}</h2>
          <div className="space-y-2">
            <DetailRow label="Subtotal With Tax:" value={(parseFloat(orderData.sub_total) + parseFloat(totalTax) - parseFloat(totalDiscount)).toFixed(2)} />
            <DetailRow label="Shipping And Cash On Delivery Tax:" value={`-${orderTax}`} />
            <DetailRow label="Shipping Cost:" value={`-${orderData?.shipping_cost}`} />
            <DetailRow label="Cash On Delivery:" value={`-${orderData?.cash_on_delivery}`} />
            <DetailRow label="Refund Fee:" value="-19.00" isBold />
            <DetailRow label="Total Refundable Amount:" value={totalAmount} isBold borderTop />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const DetailRow = ({ label, value, isBold, borderTop }) => (
  <div className={`flex justify-between ${isBold ? 'font-semibold' : ''} ${borderTop ? 'border-t pt-2' : ''}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
