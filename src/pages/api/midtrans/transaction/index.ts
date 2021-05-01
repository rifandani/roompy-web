import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import * as Sentry from '@sentry/node'
// files
import initMiddleware from '../../../../middlewares/initMiddleware'
import { db, nowMillis } from '../../../../configs/firebaseConfig'
import init from '../../../../utils/sentry/init'
import { snapClient } from '../../../../configs/midtransConfig'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

// init sentry
init()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // POST /api/midtrans/transaction
  if (req.method === 'POST') {
    try {
      const { user_id, customer_details } = req.body // destructure body

      const ordersRef = await db.collection('orders').get() // get orders collection size for order_id

      const data = {
        customer_details,
        transaction_details: {
          order_id: `${ordersRef.size + 1}-${user_id}-${nowMillis}`,
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

      // create transaction
      const transaction = await snapClient.createTransaction(data)

      // save to orders collection with id === order_id
      await db.collection('orders').doc(data.transaction_details.order_id).set({
        user_id,
        customer_details: data.customer_details,
        transaction_details: data.transaction_details,
        item_details: data.item_details,
        created_at: nowMillis,
        updated_at: nowMillis,
        transaction_status: 'token_created', // see https://docs.midtrans.com/en/after-payment/get-status?id=transaction-status
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        transaction,
        orderId: data.transaction_details.order_id,
        error: false,
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
