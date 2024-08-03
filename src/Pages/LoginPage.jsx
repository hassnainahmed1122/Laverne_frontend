import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer/Footer';
import flagImage from '../flag.png';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/AuthContext';

const validationSchema = Yup.object({
  mobileNumber: Yup.string()
    .matches(/^5\d{8}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
  orderNumber: Yup.string().required('Order number is required')
});

const LoginForm = ({ formik, loading }) => (
  <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
    <div className="flex items-center mb-4">
      <button
        id="dropdown-phone-button"
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
        style={{ height: '50px', width: '150px' }}
        disabled={loading}
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
        placeholder="Enter mobile number"
        style={{ height: '50px', width: '200px' }}
        disabled={loading}
      />
    </div>
    {formik.touched.mobileNumber && formik.errors.mobileNumber && (
      <div className="text-red-500 text-sm mb-4">{formik.errors.mobileNumber}</div>
    )}

    <div className="flex items-center mb-4">
      <input
        type="text"
        name="orderNumber"
        value={formik.values.orderNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-e-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700"
        placeholder="Enter order number"
        style={{ height: '50px', width: '100%' }}
        disabled={loading}
      />
    </div>
    {formik.touched.orderNumber && formik.errors.orderNumber && (
      <div className="text-red-500 text-sm mb-4">{formik.errors.orderNumber}</div>
    )}

    <button
      type="submit"
      className={`w-full py-2 bg-black text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
      disabled={loading}
    >
      <div className="flex items-center justify-center">
        <span>{loading ? 'Loading...' : 'Access'}</span>
        <MdOutlineKeyboardArrowLeft />
      </div>
    </button>
  </form>
);

const MemoizedFooter = React.memo(Footer);

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      orderNumber: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/v1/customer/login', {
          phoneNumber: `+966${values.mobileNumber}`,
          order_number: values.orderNumber
        });
        toast.success(response.data.message);
        login(response.data.orderId, `+966${values.mobileNumber}`);
        setTimeout(() => navigate('/otp'), 1000);
      } catch ({ response }) {
        toast.error(response.data.message);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    formik.handleSubmit();
  }, [formik]);

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center p-4" style={{ minHeight: '50vh' }}>
        <div className="text-gray-600 text-xl">
          <div className="flex flex-col justify-center items-center text-[#636362]">
            <div className="flex items-center mb-10">
              <span className="text-bold text-[#FF0000] px-2">*</span>
              <p className="text-black text-lg">{t('enterMobileNumberAndOrderNumber')}</p>
            </div>
            <LoginForm formik={formik} loading={loading} />
          </div>
        </div>
      </div>
      <MemoizedFooter />
    </>
  );
};
