import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import setCookie from '../../../utils/setCookie'
import initMiddleware from '../../../middlewares/initMiddleware'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res) // Run cors

  if (req.method === 'POST') {
    // destructure request body form
    const { id } = req.body

    // clean/filter/validate client req.body
    if (!id) {
      // kalau input kosong
      return res.status(400).json({
        error: true,
        message: 'Please input all fields',
      })
    } else if (typeof id !== 'string') {
      // kalau input id tidak berupa string
      return res.status(400).json({
        error: true,
        message: 'Should be a valid string id from firebase uid',
      })
    }

    try {
      // set JWT token to cookie in headers
      setCookie({ sub: id }, res)

      // login SUCCESS --------------------------
      return res.status(200).json({ error: false, message: 'Login success.' })
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
