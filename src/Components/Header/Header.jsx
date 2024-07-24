import React from 'react';
import { RefundBasket } from '../RefundBasket/RefundBasket';
import { useAuth } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="w-full h-[14vh] bg-white shadow-md px-20 flex items-center justify-between">
      <div className="flex items-center">
        {isAuthenticated && (
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
