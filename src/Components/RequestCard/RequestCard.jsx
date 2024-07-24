import React, { useState } from 'react';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

export const RequestCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        onClick={openModal} 
        className="flex justify-center items-center cursor-pointer"
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
              <span className="text-2xl text-gray-800">1234.56</span>
              <span className="text-gray-600">SAR</span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-2xl text-gray-800 font-semibold">
                {t('orderDetails')}
              </span>
              <div className="flex items-center text-gray-600 mt-1">
                <span className="text-sm">{t('daysAgo')}</span>
                <div className="ml-2 inline-flex items-center px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded-full">
                  {t('underRevision')}
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
