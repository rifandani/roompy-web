import Cors from 'cors'
import axios from 'axios'
import * as Sentry from '@sentry/node'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import init from 'utils/sentry/init'
import initMiddleware from 'middlewares/initMiddleware'
import { db, nowMillis } from 'configs/firebaseConfig'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

// init sentry
init()

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await cors(req, res) // Run cors

  // POST /api/midtrans/token-request
  if (req.method === 'POST') {
    try {
      const { user_id, customer_details } = req.body // destructure body

      // Buffer() requires a number, array or string as the first parameter, and an optional encoding type as the second parameter.
      const bufferObj = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':')
      // If we don't use toString(), JavaScript assumes we want to convert the object to utf8.
      const base64EncodedString = bufferObj.toString('base64')

      // trying to decode
      // var bufferObj2 = Buffer.from(base64EncodedString, 'base64')
      // var base64DecodedString = bufferObj2.toString('ascii')

      const ordersRef = await db.collection('orders').get() // get orders collection size for order_id

      const data = {
        customer_details,
        transaction_details: {
          order_id: `ORDER-${ordersRef.size + 1}-${nowMillis}`,
          gross_amount: 100000, // total harga
        },
        credit_card: {
          secure: true,
        },
        item_details: [
          {
            id: 'premium-account',
            price: 100000, // harga satuan
            quantity: 1, // jumlah
            name: 'Premium Account',
          },
        ],
      }

      // save to orders collection
      // see https://docs.midtrans.com/en/after-payment/get-status?id=transaction-status
      await db.collection('orders').add({
        user_id,
        customer_details: data.customer_details,
        transaction_details: data.transaction_details,
        item_details: data.item_details,
        createdAt: nowMillis,
        transaction_status: 'pending',
      })

      // get token in sandbox environment
      const snapResponse = await axios.post(
        'https://app.sandbox.midtrans.com/snap/v1/transactions',
        data,
        {
          headers: {
            Authorization: 'Basic ' + base64EncodedString,
          },
        }
      )

      const snap = snapResponse?.data

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        dataFromMidtrans: snap,
        orderId: data.transaction_details.order_id,
      })
    } catch (err) {
      Sentry.captureException(err, {
        user: {
          username: 'rifandani',
        },
      })

      // Flushing before returning is necessary if deploying to Vercel, see
      // https://vercel.com/docs/platform/limits#streaming-responses
      await Sentry.flush(2000)

      // POST server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => Method Not Allowed
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}
