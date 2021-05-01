import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import * as Sentry from '@sentry/node'
import axios from 'axios'
// files
import initMiddleware from '../../../../middlewares/initMiddleware'
import init from '../../../../utils/sentry/init'
import { getAsString } from '../../../../utils/getAsString'

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
)

// init sentry
init()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // GET /api/midtrans/transaction-status?orderId=orderId
  if (req.method === 'GET') {
    try {
      const orderId = getAsString(req.query.orderId)

      // Buffer() requires a number, array or string as the first parameter, and an optional encoding type as the second parameter.
      var bufferObj = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':')
      // If we don't use toString(), JavaScript assumes we want to convert the object to utf8.
      var base64EncodedString = bufferObj.toString('base64')

      // trying to decode
      // var bufferObj2 = Buffer.from(base64EncodedString, 'base64')
      // var base64DecodedString = bufferObj2.toString('ascii')

      // get token in sandbox environment
      const transactionResponse = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
        {
          headers: {
            Authorization: 'Basic ' + base64EncodedString,
          },
        }
      )

      // data ada setelah user memilih payment methods dan membayar sejumlah uang tsb
      const data = transactionResponse?.data

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, data })
    } catch (err) {
      Sentry.captureException(err, {
        user: {
          username: 'rifandani',
        },
      })

      // Flushing before returning is necessary if deploying to Vercel, see
      // https://vercel.com/docs/platform/limits#streaming-responses
      await Sentry.flush(2000)

      // GET server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => Method Not Allowed
    res.status(405).json({ error: true, message: 'Only support GET req' })
  }
}
