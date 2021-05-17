import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

// yup middleware
const yupMiddleware = (
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) => async (req: NextApiRequest, res: NextApiResponse) => {
  // supported request method
  const isSupportedMethod = ['POST', 'PUT'].includes(req.method)

  if (isSupportedMethod) {
    try {
      // const newSchema = req.method === 'POST' ? schema : schema.concat(object({ id: number().required().positive() }))

      // validate req.body
      await schema.validate(req.body, {
        abortEarly: false,
        strict: true,
        stripUnknown: true,
      })
    } catch (err) {
      // STOP execution
      // client error => Bad Request ---------------------------------------
      return res.status(400).json({
        error: true,
        name: err.name,
        message: err.message,
        errors: err.errors,
      })
    }
  }

  // continue to API handler
  await handler(req, res)
}

export default yupMiddleware
