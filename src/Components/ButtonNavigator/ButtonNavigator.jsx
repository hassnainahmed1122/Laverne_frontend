import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiCalculator } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../Context/AuthContext";

export const ButtonNavigator = () => {
  const { price } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isBankInfoPage = location.pathname.includes("/bank-info");

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFillBankDetailsClick = () => {
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
          {t('totalBasket', {price: price })}
        </div>
        <button
          className="flex text-left items-center bg-black text-white px-4 py-2 w-1/5 space-x-2"
          onClick={handleBackClick}
        >
          <p>{t('back')}</p>
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};
