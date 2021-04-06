import { NextApiRequest, NextApiResponse } from 'next'
// files
import setCookie from '../../../utils/setCookie'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // destructure request body form
    const { id } = req.body

    try {
      // set JWT token to cookie in headers
      setCookie({ sub: id }, res)

      // login SUCCESS --------------------------
      return res
        .status(200)
        .json({ error: false, message: 'Cookie set to the response headers' })
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, name: err.name, message: err.message, err }) // login ERROR
    }
  } else {
    // error => invalid req method
    return res
      .status(405)
      .json({ error: true, message: 'Only support POST req' })
  }
}
