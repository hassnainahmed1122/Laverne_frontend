import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object({
    mobileNumber: Yup.string()
        .matches(/^\d{9}$/, "Invalid mobile number. Must be exactly 9 digits.")
        .required("Mobile number is required")
});