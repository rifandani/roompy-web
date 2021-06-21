import Cors from 'cors'
// files
import nc from 'middlewares/nc'
import withYupConnect from 'middlewares/withYupConnect'
import { snapClient } from 'configs/midtransConfig'
import { db, nowMillis } from 'configs/firebaseConfig'
import {
  midtransTransactionApiSchema,
  TMidtransTransactionApi,
} from 'utils/yup/apiSchema'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['POST'],
    })
  )
  // yup middleware
  .use(withYupConnect(midtransTransactionApiSchema))
  /* ----------------------------- POST / api / midtrans / transaction ---------------------------- */
  .post(async (req, res) => {
    const { user_id, customer_details, item_details } =
      req.body as TMidtransTransactionApi

    // calculate total gross amount
    const grossAmount = item_details.reduce(
      (acc, item) => item.quantity * item.price + acc,
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
    // see https://docs.midtrans.com/en/after-payment/get-status?id=transaction-status
    await db.collection('orders').doc(data.transaction_details.order_id).set({
      user_id,
      customer_details: data.customer_details,
      transaction_details: data.transaction_details,
      item_details: data.item_details,
      created_at: nowMillis,
      updated_at: nowMillis,
      transaction_status: 'token_created',
    })

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({
      transaction,
      orderId: data.transaction_details.order_id,
      error: false,
    })
  })
