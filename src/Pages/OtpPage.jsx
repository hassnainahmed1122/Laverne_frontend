import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Footer } from "../Components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";

export const OtpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { goToLogin,  setTokenAndAuthenticatedToTrue } = useAuth();
  const [timeLeft, setTimeLeft] = useState(60); // Timer for 1 minute
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, t('invalidCode'))
      .required(t('verificationCodeRequired'))
  });

  const formik = useFormik({
    initialValues: {
      otp: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const orderNumber = localStorage.getItem('order_number');
      const phoneNumber = localStorage.getItem('phone_number');
      
      if (!orderNumber || !phoneNumber) {
        toast.error(t('missingData'));
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/v1/customer/verify-otp', {
          phoneNumber: phoneNumber,
          otp: values.otp,
          order_id: orderNumber,
        });
        
        toast.success(response.data.message);
        setTokenAndAuthenticatedToTrue(response.data.token)
        setTimeout(() => {
          navigate('/product-list');
        }, 1000)
      } catch (error) {
        toast.error(error.response?.data?.message || t('errorOccurred'));
      }
    }
  });

  useEffect(() => {
    // Start the countdown timer
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Disable the button if the input is empty or time has run out
    setIsButtonDisabled(!formik.values.otp || timeLeft === 0);
  }, [formik.values.otp, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <ToastContainer />
      <div className="flex p-4">
        <button 
          onClick={goToLogin} 
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
        >
          {t('goBack')}
        </button>
      </div>
      <div
        className="flex justify-center items-center p-4"
        style={{ minHeight: "50vh" }}
      >
        <div className="text-gray-600 text-xl">
          <div className="flex flex-col justify-center items-center text-[#636362]">
            <div className="flex items-center mb-10">
              <span className="text-bold text-[#FF0000] px-2">*</span>
              <p className="text-black text-lg">{t('verificationCode')}</p>
            </div>
            <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  name="otp"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-e-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700"
                  placeholder={t('enterVerificationCode')}
                  style={{ height: "50px", width: "100%" }}
                  disabled={timeLeft === 0} // Disable input when time runs out
                />
              </div>
              {formik.touched.otp && formik.errors.otp ? (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.otp}
                </div>
              ) : null}

              <div className="text-gray-500 text-sm mb-4">
                {timeLeft > 0 ? `${t('timeRemaining')}: ${formatTime(timeLeft)}` : t('timeExpired')}
              </div>

              <button
                type="submit"
                className={`w-full py-2 bg-black text-white rounded-md ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
                disabled={isButtonDisabled}
              >
                <div className="flex items-center justify-center">
                  <span>{t('access')}</span>
                  <MdOutlineKeyboardArrowLeft />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
