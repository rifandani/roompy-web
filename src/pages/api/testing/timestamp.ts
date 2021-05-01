import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import {
  db,
  nowMillis,
  firestoreTimestamp,
} from '../../../configs/firebaseConfig'
import { getAsString } from '../../../utils/getAsString'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // GET /api/testing/timestamp
  if (req.method === 'GET') {
    try {
      const promoRef = await db
        .collection('promos')
        .doc('Lbgb6PRW9QU48I6m9GIr')
        .get()

      const promo = {
        ...promoRef.data(),
      }

      console.log('promo createdAt seconds', promo.createdAt.seconds)

      // GET success => OK +++++++++++++++++++++++++++++++
      res.status(200).json({
        nowMillis,
        promo,
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
    // POST /api/testing/timestamp
  } else if (req.method === 'POST') {
    try {
      const { title } = req.body

      const promoRef = await db.collection('promos').add({
        title,
        nowMillis,
        createdAt: firestoreTimestamp,
        updatedAt: firestoreTimestamp,
        dateNow: Date.now(),
      })

      // POST success => Created +++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'POST success',
        promoId: promoRef.id,
      })
    } catch (err) {
      // server error => Internal Server Error ---------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
    // PUT /api/testing/timestamp/:id
  } else if (req.method === 'PUT') {
    try {
      const { title } = req.body
      const id = getAsString(req.query.id)

      await db.collection('promos').doc(id).update({
        title,
        updatedAt: firestoreTimestamp,
      })

      // POST success => Created +++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'PUT success',
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
    res
      .status(405)
      .json({ error: true, message: 'Only support GET, POST and PUT req' })
  }
}
