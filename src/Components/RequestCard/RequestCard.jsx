import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';

export const RequestCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Request Card */}
      <div 
        onClick={openModal} 
        className="flex justify-center items-center cursor-pointer"
      >
        <div className="bg-white shadow-lg rounded-lg md:w-1/2">
          <div className="border-b border-gray-300 p-4 flex items-center justify-end space-x-2">
            <h1 className="text-xl text-gray-800 text-right">
              Request
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
                Order details #1262894
              </span>
              <div className="flex items-center text-gray-600 mt-1">
                <span className="text-sm">5 days ago</span>
                <div className="ml-2 inline-flex items-center px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded-full">
                  Under Revision
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg rounded-lg w-11/12 md:w-1/3">
            {/* Header */}
            <div className="border-b border-gray-300 p-4 flex items-center justify-end">
              <IoIosClose
                className="text-gray-600 cursor-pointer"
                size={24}
                onClick={closeModal}
              />
            </div>

            {/* Content */}
            <div className="p-4 bg-red-100 text-black">
              <p>The request is under review</p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 p-4 flex justify-end">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
