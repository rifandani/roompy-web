import Cors from 'cors'
import axios from 'axios'
// files
import nc from 'middlewares/nc'
import { getAsString } from 'utils/getAsString'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['GET'],
    })
  )
  /* -------------------- GET /api/midtrans/transaction/status?orderId=orderId -------------------- */
  .get(async (req, res) => {
    const orderId = getAsString(req.query.orderId)

    // Buffer() requires a number, array or string as the first parameter, and an optional encoding type as the second parameter.
    const bufferObj = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':')
    // If we don't use toString(), JavaScript assumes we want to convert the object to utf8.
    const base64EncodedString = bufferObj.toString('base64')

    // if you want to decode
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
  })
