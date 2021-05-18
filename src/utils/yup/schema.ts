import { object, string, boolean, ref, TypeOf } from 'yup'

export const createQrcodeSchema = object({
  url: string().required().url(),
}) // .camelCase()

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
}) // .camelCase()

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

export const registerApiSchema = object({
  id: string().required('Id required'),
  username: string()
    .required('Username required')
    .min(3, 'Username must be 3 characters or more')
    .max(50, 'Username must be 50 characters or less'),
  email: string().required('Email required').email('Invalid email'),
}) // .camelCase()

export const loginSchema = object({
  email: string().required('Email required').email('Invalid email'),
  password: string()
    .required('Password required')
    .min(6, 'Password must be 6 characters or more'),
}) // .camelCase()

export const loginApiSchema = object({
  id: string().required('Id required'),
}) // .camelCase()

// export interface IQrcode extends TypeOf<typeof createQrcodeSchema> {}
export type TQrcode = TypeOf<typeof createQrcodeSchema>
export type TUpdateUserProfileSchema = TypeOf<typeof updateUserProfileSchema>
export type TForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>
export type TRegisterSchema = TypeOf<typeof registerSchema>
export type TLoginSchema = TypeOf<typeof loginSchema>
