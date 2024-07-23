import React from "react";
import { useLocation } from "react-router-dom";
import { GiCalculator } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export const ButtonNavigator = () => {
  const location = useLocation();
  const isBankInfoPage = location.pathname.includes("/bank-info");

  return (
    <div className="flex justify-center w-full mt-10">
      <div className={`flex w-full max-w-4xl bg-white ${isBankInfoPage ? 'justify-center' : ''}`}>
        {!isBankInfoPage && (
          <button className="flex text-center items-center bg-black text-white px-4 py-2 ${isBankInfoPage ? 'w-1/5' : 'w-2/5'} space-x-2">
            <MdKeyboardArrowLeft />
            <p>Fill in the bank details</p>
          </button>
        )}
        <div className={`space-x-2 border border-black text-black bg-white flex items-center justify-center ${isBankInfoPage ? 'w-1/5' : 'w-2/5'}`}>
          <GiCalculator className="text-black text-2xl italic" />
          Total basket 0 SAR
        </div>
        <button className="flex text-left items-center bg-black text-white px-4 py-2 w-1/5 space-x-2">
          <p>Back</p>
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};
