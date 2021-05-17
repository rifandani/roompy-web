import { object, string, TypeOf } from 'yup'

export const createQrcodeSchema = object({
  url: string().required().url(),
}) // .camelCase()

export type TQrcode = TypeOf<typeof createQrcodeSchema>
// export interface IQrcode extends TypeOf<typeof createQrcodeSchema> {}
