import midtransClient from 'midtrans-client'

// Create Core API / Snap instance (both have shared `transactions` methods)
export const snapClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})
