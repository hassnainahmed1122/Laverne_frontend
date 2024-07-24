import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Footer } from "../Components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const OrderNumberPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        orderNumber: Yup.string()
            .required(t('orderNumberRequired'))
    });

    const formik = useFormik({
        initialValues: {
            orderNumber: ""
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log("Submitted order number:", values.orderNumber);
            navigate('/login');
        }
    });

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
                            <p className="text-black text-lg">{t('orderNumber')}</p>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
                            <div className="flex items-center mb-4">
                                <input
                                    type="text"
                                    name="orderNumber"
                                    value={formik.values.orderNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-e-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700"
                                    placeholder={t('enterOrderNumber')}
                                    style={{ height: "50px", width: "100%" }}
                                />
                            </div>
                            {formik.touched.orderNumber && formik.errors.orderNumber ? (
                                <div className="text-red-500 text-sm mb-4">
                                    {formik.errors.orderNumber}
                                </div>
                            ) : null}
                            <button
                                type="submit"
                                className="w-full py-2 bg-black text-white rounded-md hover:cursor-pointer"
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
