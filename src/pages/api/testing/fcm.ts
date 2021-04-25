import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { nowMillis, serverTimestamp } from '../../../configs/firebaseConfig'

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  if (req.method === 'GET') {
    try {
      // GET success => OK +++++++++++++++++++++++++++++++
      res.status(500).json({
        nowMillis,
        serverTimestamp,
        error: false,
        dateNow: Date.now(),
      })
    } catch (err) {
      // server error => Internal Server Error ---------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
  } else {
    // client error => Method Not Allowed
    res.status(405).json({ error: true, message: 'Only support GET req' })
  }
}
