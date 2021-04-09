import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { db, nowMillis } from '../../../configs/firebaseConfig'
import { getAsString } from '../../../utils/getAsString'

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['POST',],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  const usersRef = db.collection('users')

  // POST req => 
  if (req.method === 'POST') {
    try {
      const {
        senderId,
        receiverId,
      } = req.body

      // get senderRef & previousMessagesTo data
      const senderRef = usersRef.doc(senderId) // sender reference
      const senderDataSnapshot = await senderRef.get() // sender data object
      const previousMessagesTo = senderDataSnapshot.get('messagesTo') // array
      // update sender messagesTo document
      await senderRef.update({
        messagesTo: [
          ...previousMessagesTo,
          senderId + '-' + receiverId
        ],
        updatedAt: nowMillis,
      })

      // get receiverRef & previousMessagesFrom data
      const receiverRef = usersRef.doc(receiverId) // receiver reference
      const receiverDataSnapshot = await receiverRef.get() // receiver data object
      const previousMessagesFrom = receiverDataSnapshot.get('messagesFrom') // array
      // update receiver messagesFrom document
      await receiverRef.update({
        messagesFrom: [
          ...previousMessagesFrom,
          senderId + '-' + receiverId
        ],
        updatedAt: nowMillis,
      })

      // POST chats SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Users messagesFrom & messagesTo updated' })
    } catch (err) {
      // POST ERROR -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message, err })
    }
  } else {
    // error => invalid req method
    res
      .status(405)
      .json({ error: true, message: 'Only support POST req' })
  }
}
