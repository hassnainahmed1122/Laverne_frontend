import React from 'react';
import { RefundBasket } from '../RefundBasket/RefundBasket';
import { useAuth } from '../../Context/AuthContext';
export const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="w-full h-[14vh] bg-white shadow-md px-20 flex items-center justify-between">
      <div className="flex items-center">
      {isAuthenticated && (
        <RefundBasket />
      )}
      </div>
      <div className="flex flex-col items-start space-y-2 font-dinnextltarabic p-4">
        <img
          src="https://cdn.salla.sa/XzOPD/EJ37QZ2evPx7y7561LXSZknDyIn19pZFzaaZ5LXh.jpg"
          alt="logo"
          className="w-auto h-10 md:h-12 lg:h-14"
        />
        <div className="text-md text-[#636362] font-semibold tracking-normal">
          Laverne Product Return Platform
        </div>
      </div>
    </div>
  );
};

