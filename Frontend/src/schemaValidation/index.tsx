import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address')
        .required('Email is required')
        .matches(/^[a-zA-Z]+\.[a-zA-Z]+@(innopolis\.ru|innopolis\.university)$/, 'Given email is not an official Innopolis University email address.'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*()]/, 'Password must contain at least one special character'),
    password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const loginValidationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

export const resetPasswordValidationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const changePasswordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const profileValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});
