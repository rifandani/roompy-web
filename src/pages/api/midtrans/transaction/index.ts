import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../../middlewares/initMiddleware'
import { db, nowMillis } from '../../../../configs/firebaseConfig'
import { snapClient } from '../../../../configs/midtransConfig'
import captureException from '../../../../utils/sentry/captureException'
import yupMiddleware from '../../../../middlewares/yupMiddleware'
import { midtransTransactionApiSchema } from '../../../../utils/yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // POST /api/midtrans/transaction
  if (req.method === 'POST') {
    try {
      const { user_id, customer_details, item_details } = req.body // destructure body

      // calculate total gross amount
      const grossAmount = item_details.reduce(
        (acc: number, item: any) => item.quantity * item.price + acc,
        0
      )

      const ordersRef = await db.collection('orders').get() // get orders collection size for order_id

      const data = {
        user_id,
        customer_details,
        item_details,
        transaction_details: {
          order_id: `${ordersRef.size + 1}-${user_id}-${nowMillis}`,
          gross_amount: grossAmount, // total harga
        },
        credit_card: {
          secure: true,
          save_card: true,
        },
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
      // capture exception sentry
      await captureException(err)

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

export default yupMiddleware(midtransTransactionApiSchema, handler)
