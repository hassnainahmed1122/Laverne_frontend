import React, { useState } from 'react';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment-timezone';

export const RequestCard = ({ orderData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = () => {
    if (orderData.status === 'underRevision') {
      openModal();
    } else {
      navigate('/product-list/details');
    }
  };

  const total = (
    parseFloat(orderData?.sub_total) +
    parseFloat(orderData?.shipping_cost) +
    parseFloat(orderData?.cash_on_delivery) +
    parseFloat(orderData?.tax_amount) -
    parseFloat(orderData?.discount_amount)
  ).toFixed(2);

  const userTimeZone = moment.tz.guess();
  const orderDateTime = moment.utc(orderData?.date);
  const localOrderDateTime = orderDateTime.tz(userTimeZone);
  const daysPassed = moment().diff(localOrderDateTime, 'days');

  return (
    <>
      <div 
        onClick={handleClick} 
        className="flex justify-center items-center cursor-pointer mt-2"
      >
        <div className="bg-white shadow-lg rounded-lg md:w-1/2">
          <div className="border-b border-gray-300 p-4 flex items-center justify-end space-x-2">
            <h1 className="text-xl text-gray-800 text-right">
              {t('request')}
            </h1>
            <IoIosArrowBack />
          </div>

          <div className="p-4 flex justify-between">
            <div className="flex flex-col items-end">
              <span className="text-2xl text-gray-800">{total}</span>
              <span className="text-gray-600">SAR</span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-2xl text-gray-800 font-semibold">
                {t('orderDetails', {order_id: orderData?.salla_reference_id})}
              </span>
              <div className="flex items-center text-gray-600 mt-1">
                <span className="text-sm">{t('daysAgo', {daysPassed:daysPassed})}</span>
                <div className="ml-2 inline-flex items-center px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded-full">
                  {orderData.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg rounded-lg w-11/12 md:w-1/3">
            <div className="border-b border-gray-300 p-4 flex items-center justify-end">
              <IoIosClose
                className="text-gray-600 cursor-pointer"
                size={24}
                onClick={closeModal}
              />
            </div>

            <div className="p-4 bg-red-100 text-black">
              <p>{t('modalReview')}</p>
            </div>

            <div className="border-t border-gray-300 p-4 flex justify-end">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
