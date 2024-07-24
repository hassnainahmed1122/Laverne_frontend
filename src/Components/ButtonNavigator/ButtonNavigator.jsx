import React from "react";
import { useLocation } from "react-router-dom";
import { GiCalculator } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useTranslation } from 'react-i18next';

export const ButtonNavigator = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isBankInfoPage = location.pathname.includes("/bank-info");

  return (
    <div className="flex justify-center w-full mt-10">
      <div className={`flex w-full max-w-4xl bg-white ${isBankInfoPage ? 'justify-center' : ''}`}>
        {!isBankInfoPage && (
          <button
            className={`flex text-center items-center bg-black text-white px-4 py-2 ${isBankInfoPage ? 'w-1/5' : 'w-2/5'} space-x-2`}
          >
            <MdKeyboardArrowLeft />
            <p>{t('fillBankDetails')}</p>
          </button>
        )}
        <div
          className={`space-x-2 border border-black text-black bg-white flex items-center justify-center ${isBankInfoPage ? 'w-1/5' : 'w-2/5'}`}
        >
          <GiCalculator className="text-black text-2xl italic" />
          {t('totalBasket')}
        </div>
        <button
          className="flex text-left items-center bg-black text-white px-4 py-2 w-1/5 space-x-2"
        >
          <p>{t('back')}</p>
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};
