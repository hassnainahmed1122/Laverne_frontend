import React from "react";
import Breadcrumb from "../Components/BreadCrumbs/BreadCrumbs";
import flagImage from "../flag.png"; // Ensure this path is correct
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export const LoginPage = () => {
  return (
    <>
      <Breadcrumb />
      <div
        className="flex justify-center items-center p-4"
        style={{ minHeight: "50vh" }}
      >
        <div className="text-gray-600 text-xl">
          <div className="flex flex-col justify-center items-center text-[#636362]">
            <div className="flex items-center mb-4">
              <span className="text-bold text-[#FF0000] px-2">*</span>
              <p className="text-black text-lg">Enter Mobile Number</p>
            </div>
            <form className="max-w-sm mx-auto">
              <div className="flex items-center mb-4">
                <button
                  id="dropdown-phone-button"
                  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  type="button"
                  style={{ height: "50px", width: "150px" }} // Adjust the height and width here
                >
                  <MdOutlineKeyboardArrowDown />
                  <p className="px-2">+966</p>
                  <img
                    src={flagImage}
                    alt="flag"
                    className="h-6 w-6 ml-2"
                  />{" "}
                  {/* Adjust flag size */}
                </button>
                <input
                  type="text"
                  className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-e-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700"
                  placeholder="Enter mobile number"
                  style={{ height: "50px", width: "200px" }} // Adjust the height and width here
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
    </>
  );
};
