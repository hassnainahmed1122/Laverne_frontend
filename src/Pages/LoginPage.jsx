import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import flagImage from '../flag.png';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import i18n from '../Langauge/i18n';
import { Footer } from '../Components/Footer/Footer';

export const LoginPage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^\d{9}$/, i18n.t('invalidMobileNumber'))
      .required(i18n.t('mobileNumberRequired'))
  });

  const formik = useFormik({
    initialValues: {
      mobileNumber: ""
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("Submitted mobile number:", values.mobileNumber);
      navigate('/otp');
    }
  });

  return (
    <>
      <div className="flex justify-center items-center p-4" style={{ minHeight: "50vh" }}>
        <div className="text-gray-600 text-xl">
          <div className="flex flex-col justify-center items-center text-[#636362]">
            <div className="flex items-center mb-10">
              <span className="text-bold text-[#FF0000] px-2">*</span>
              <p className="text-black text-lg">{i18n.t('enterMobileNumber')}</p>
            </div>
            <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
              <div className="flex items-center mb-4">
                <button
                  id="dropdown-phone-button"
                  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  type="button"
                  style={{ height: "50px", width: "150px" }}
                >
                  <MdOutlineKeyboardArrowDown />
                  <p className="px-2">+966</p>
                  <img src={flagImage} alt="flag" className="h-6 w-6 ml-2" />
                </button>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-e-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700"
                  placeholder={i18n.t('enterMobileNumber')}
                  style={{ height: "50px", width: "200px" }}
                />
              </div>
              {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.mobileNumber}
                </div>
              ) : null}
              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-md hover:cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <span>{i18n.t('access')}</span>
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
