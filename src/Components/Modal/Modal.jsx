import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

export const Modal = ({ isOpen, onClose, children, handleNextClick }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white shadow-lg rounded-lg w-11/12 md:w-1/3">
                <div className="border-b border-gray-300 p-4 flex items-center justify-end">
                    <IoIosClose
                        className="text-gray-600 cursor-pointer"
                        size={24}
                        onClick={onClose}
                    />
                </div>
                {children}
                <div className="border-t border-gray-300 p-4 flex justify-between">
                    <button
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={handleNextClick}
                    >
                        {t('next')}
                    </button>
                    <button
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        {t('close')}
                    </button>
                </div>
            </div>
        </div>
    );
};
