import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import * as Sentry from '@sentry/node'
import axios from 'axios'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { db, nowMillis } from '../../../configs/firebaseConfig'
import init from '../../../utils/sentry/init'
import { snapClient } from '../../../configs/midtransConfig'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

// init sentry
init()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // POST /api/midtrans/payment-notification-handler
  if (req.method === 'POST') {
    try {
      const notificationJson = req.body // POST notification dari midtrans webhook

      // ensure the integrity of the notifications and the content, it is recommended to verify the notification
      // see more https://docs.midtrans.com/en/after-payment/http-notification?id=verifying-notification-authenticity
      const notifResponse = await snapClient.transaction.notification(
        notificationJson
      )

      const orderId: string = notifResponse?.order_id
      const transactionStatus: string = notifResponse?.transaction_status
      const fraudStatus: string = notifResponse?.fraud_status
      const grossAmount: string = notifResponse?.gross_amount

      // log to serverless functions
      const logMessage = `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      console.log(logMessage)

      const orderRef = db.collection('orders').doc(orderId) // get order with id === order_id
      const userId = orderId.split('-')[1]
      const userRef = db.collection('users').doc(userId) // get user with id === order_id

      if (transactionStatus == 'capture') {
        // capture only applies to card transaction, which you need to check for the fraudStatus
        if (fraudStatus == 'challenge') {
          // Transaction is flagged as potential fraud, but cannot be determined precisely.
          // You can accept or deny via Dashboard, or via Approve or Deny API.

          // update the order document
          await orderRef.update({
            transaction_status: 'challenge',
            updated_at: nowMillis,
          })

          // DENY transaction because it is ambiguous
          await snapClient.transaction.deny(orderId)

          // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          res.status(201).json({
            error: false,
            message: 'Transaction challenge denied',
          })
          return
        } else if (fraudStatus == 'accept') {
          // Transaction is safe to proceed. It is not considered as a fraud.

          // update the order document
          await orderRef.update({
            transaction_status: 'success',
            updated_at: nowMillis,
          })

          // update the user document
          await userRef.update({
            premium: true,
            premiumUntil: nowMillis + 2592000000, // + 30 hari
          })

          // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          res.status(201).json({
            error: false,
            message: 'Transaction accepted',
          })
          return
        }
      } else if (transactionStatus == 'settlement') {
        // The transaction is successfully settled. Funds have been credited to your account.

        // update the order document
        await orderRef.update({
          transaction_status: 'success',
          updated_at: nowMillis,
        })

        // update the user document
        await userRef.update({
          premium: true,
          premiumUntil: nowMillis + 2592000000, // + 30 hari
        })

        // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(201).json({
          error: false,
          message: 'Transaction settled',
        })
        return
      } else if (
        transactionStatus == 'cancel' ||
        transactionStatus == 'expire' ||
        transactionStatus == 'deny'
      ) {
        // update the order document
        await orderRef.update({
          transaction_status: 'failure',
          updated_at: nowMillis,
        })

        // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(201).json({
          error: false,
          message: 'Transaction canceled / expired',
        })
        return
      } else if (transactionStatus == 'refund') {
        // This API only supports credit_card === bni, mandiri, cimb

        // update the order document
        await orderRef.update({
          transaction_status: 'refund',
          updated_at: nowMillis,
        })

        // Refund Transaction with Direct Refund
        await snapClient.transaction.refundDirect(orderId, {
          refund_key: `refund-${orderId}`, // merchant refund ID
          amount: grossAmount,
          reason: 'I dont know why is this refunded',
        })

        // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(201).json({
          error: false,
          message: 'Transaction refunded',
        })
        return
      } else if (transactionStatus === 'pending') {
        // update the order document
        await orderRef.update({
          transaction_status: 'pending',
          updated_at: nowMillis,
        })

        // Approve Transaction
        await snapClient.transaction.approve(orderId)

        // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(201).json({
          error: false,
          message: 'Transaction pending / waiting payment',
        })
        return
      }

      // else
      res.status(200).json({
        message: logMessage,
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
