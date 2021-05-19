import { object, string, boolean, ref, TypeOf } from 'yup'
import 'yup-phone'

export const updateUserProfileSchema = object({
  username: string()
    .required('New username required')
    .min(3, 'Username must be 3 characters or more')
    .max(50, 'Username must be 50 characters or less'),
  newEmail: string().required('New email required').email('Invalid email'),
  currentPassword: string().required('Current password required'),
  newPassword: string()
    .required('New password required')
    .min(6, 'New password must be 6 characters or more'),
}) // .camelCase()

export const forgotPasswordSchema = object({
  email: string().required('Email required').email('Invalid email'),
})

export const registerSchema = object({
  username: string()
    .required('Username required')
    .min(3, 'Username must be 3 characters or more')
    .max(50, 'Username must be 50 characters or less'),
  email: string().required('Email required').email('Invalid email'),
  password: string()
    .required('Password required')
    .min(6, 'Password must be 6 characters or more'),
  confirmPassword: string()
    .required('Confirm your password')
    .min(6, 'Confirm your password with 6 characters or more')
    .oneOf([ref('password')], 'Password does not match'),
  termsConditions: boolean()
    .required('The terms and conditions must be accepted')
    .oneOf([true], 'The terms and conditions must be accepted.'),
}) // .camelCase()

export const loginSchema = object({
  email: string().required('Email required').email('Invalid email'),
  password: string()
    .required('Password required')
    .min(6, 'Password must be 6 characters or more'),
})

export const subscribeSchema = object({
  firstName: string()
    .required('First name required')
    .min(2, 'First name must be 2 characters or more')
    .max(30, 'First name must be 30 characters or less'),
  lastName: string()
    .required('Last name required')
    .min(3, 'Last name must be 3 characters or more')
    .max(30, 'Last name must be 30 characters or less'),
  email: string().required('Email required').email('Invalid email'),
  address: string()
    .required('Address required')
    .min(6, 'Address must be 6 characters or more')
    .max(60, 'Address must be 30 characters or less'),
  phone: string()
    .phone('ID', true, 'Please enter a valid Indonesia phone number')
    .required('Phone number required'),
}) // .camelCase()

export type TUpdateUserProfileSchema = TypeOf<typeof updateUserProfileSchema>
export type TForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>
export type TRegisterSchema = TypeOf<typeof registerSchema>
export type TLoginSchema = TypeOf<typeof loginSchema>
export type TSubscribeSchema = TypeOf<typeof subscribeSchema>
