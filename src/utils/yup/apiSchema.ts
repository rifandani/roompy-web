import { object, string, array, number, TypeOf } from 'yup'

export const qrcodeApiSchema = object({
  url: string().required().url(),
})

export const registerApiSchema = object({
  id: string().required('Id required'),
  username: string()
    .required('Username required')
    .min(3, 'Username must be 3 characters or more')
    .max(50, 'Username must be 50 characters or less'),
  email: string().required('Email required').email('Invalid email'),
})

export const loginApiSchema = object({
  id: string().required('Id required'),
})

export const chatsApiSchema = object({
  chatId: string().required('chatId required'),
  senderUserId: string().required('senderUserId required'),
  text: string().required('text required'),
}) // .camelCase()

export const favRoompiesApiSchema = object({
  userId: string().required('userId required'),
  roompyId: string().required('roompyId required'),
}) // .camelCase()

export const fcmApiSchema = object({
  token: string().required('token required'),
  notification: object({
    title: string().required('notification.title required'),
    body: string().required('notification.body required'),
    imageUrl: string()
      .required('notification.imageUrl required')
      .url('Please enter a valid URL'),
  }).required('notification required'),
  data: object({
    title: string().required('data.title required'),
    body: string().required('data.body required'),
  }).required('data required'),
  webpush: object().optional(),
  android: object().optional(),
})

export const firstChatApiSchema = object({
  senderUserId: string().required('senderUserId required'),
  senderRoompyId: string().required('senderRoompyId required'),
  receiverUserId: string().required('receiverUserId required'),
  receiverRoompyId: string().required('receiverRoompyId required'),
}) // .camelCase()

export const midtransTransactionApiSchema = object({
  user_id: string().required('user_id required'),
  customer_details: object({
    first_name: string().required('customer_details.first_name required'),
    last_name: string().required('customer_details.last_name required'),
    email: string().email().required('customer_details.email required'),
    phone: string()
      .phone('ID', true, 'Please enter a valid Indonesia phone number')
      .required('customer_details.phone required'),
    address: string().required('customer_details.address required'),
    city: string().required('customer_details.city required'),
    postal_code: string().required('customer_details.postal_code required'),
    country_code: string().required('customer_details.country_code required'),
  }).required('customer_details required'),
  item_details: array()
    .of(
      object({
        id: string().required('item_details.id required'),
        price: number().positive().required('item_details.price required'),
        quantity: number()
          .positive()
          .required('item_details.quantity required'),
        name: string().required('item_details.name required'),
        brand: string().required('item_details.brand required'),
        category: string().required('item_details.category required'),
        merchant_name: string().required('item_details.merchant_name required'),
      })
    )
    .min(1)
    .required('item_details required'),
})

export const usersApiSchema = object({
  username: string().required('username required'),
  email: string().email().required('email required'),
})

// export interface IQrcode extends TypeOf<typeof createQrcodeSchema> {}
export type TQrcodeApi = TypeOf<typeof qrcodeApiSchema>
export type TRegisterApi = TypeOf<typeof registerApiSchema>
export type TLoginApi = TypeOf<typeof loginApiSchema>
export type TChatsApi = TypeOf<typeof chatsApiSchema>
export type TFavRoompiesApi = TypeOf<typeof favRoompiesApiSchema>
export type TFcmApi = TypeOf<typeof fcmApiSchema>
export type TFirstChatApi = TypeOf<typeof firstChatApiSchema>
export type TMidtransTransactionApi = TypeOf<
  typeof midtransTransactionApiSchema
>
export type TUsersApi = TypeOf<typeof usersApiSchema>
