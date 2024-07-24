import React from 'react';
import { RefundBasket } from '../RefundBasket/RefundBasket';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const showRefundBasket = /login|otp|order-number/.test(location.pathname);

  return (
    <div className="w-full h-[14vh] bg-white shadow-md px-20 flex items-center justify-between">
      <div className="flex items-center">
        {!showRefundBasket && (
          <RefundBasket />
        )}
      </div>
      <div className="flex flex-col items-center space-y-2 font-dinnextltarabic p-4">
        <img
          src="https://cdn.salla.sa/XzOPD/EJ37QZ2evPx7y7561LXSZknDyIn19pZFzaaZ5LXh.jpg"
          alt="logo"
          className="w-auto sm:h-14 md:h-20"
        />
        <div className="text-md text-[#636362] font-semibold tracking-normal">
          {t('productReturnPlatform')}
        </div>
      </div>
    </div>
  );
};
