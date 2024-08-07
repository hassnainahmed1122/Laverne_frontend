import React, { useState, useEffect, useCallback } from "react";
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
  const { goToLogin, setTokenAndAuthenticatedToTrue } = useAuth();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Form validation schema
  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, t('invalidCode'))
      .required(t('verificationCodeRequired'))
  });

  // Formik setup
  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema,
    onSubmit: async (values) => {
      const orderNumber = localStorage.getItem('order_number');
      const phoneNumber = localStorage.getItem('phone_number');
      
      if (!orderNumber || !phoneNumber) {
        toast.error(t('missingData'));
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/v1/customer/verify-otp', {
          phoneNumber,
          otp: values.otp,
          order_id: orderNumber,
        });

        toast.success(t(response.data.message));
        setTokenAndAuthenticatedToTrue(response.data.token);
        setTimeout(() => navigate('/product-list'), 1000);
      } catch (error) {
        console.log('testing................', error)
        toast.error(t(error.response?.data?.message) || t('errorOccurred'));
      }
    }
  });

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  // Update button disabled state based on input and timer
  useEffect(() => {
    setIsButtonDisabled(!formik.values.otp || timeLeft === 0);
  }, [formik.values.otp, timeLeft]);

  // Format time remaining
  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

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
                  disabled={timeLeft === 0}
                />
              </div>
              {formik.touched.otp && formik.errors.otp && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.otp}
                </div>
              )}

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
      {/* <Footer /> */}
    </>
  );
};
