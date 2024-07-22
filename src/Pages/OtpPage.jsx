import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Footer } from "../Components/Footer/Footer";

export const OtpPage = () => {
  return (
    <>
    <div
      className="flex justify-center items-center p-4"
      style={{ minHeight: "50vh" }}
    >
      <div className="text-gray-600 text-xl">
        <div className="flex flex-col justify-center items-center text-[#636362]">
          <div className="flex items-center mb-10">
            <span className="text-bold text-[#FF0000] px-2">*</span>
            <p className="text-black text-lg">verification code</p>
          </div>
          <form className="max-w-sm mx-auto">
            <div className="flex items-center mb-4">
              <input
                type="text"
                className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-e-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700"
                placeholder="Enter Verification code"
                style={{ height: "50px", width: "100%" }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <span>Access</span>
                <MdOutlineKeyboardArrowLeft />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};
