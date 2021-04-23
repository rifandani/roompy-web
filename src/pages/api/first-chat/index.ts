import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { db, nowMillis, realDB } from '../../../configs/firebaseConfig'

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  const usersRef = db.collection('users')

  // POST req => /api/first-chat
  if (req.method === 'POST') {
    try {
      const {
        senderUserId,
        senderRoompyId,
        receiverUserId,
        receiverRoompyId,
      } = req.body

      // chatId
      const chatId = senderRoompyId + '-' + receiverRoompyId

      // get senderRef & previousMessagesTo data
      const senderRef = usersRef.doc(senderUserId) // sender reference
      const senderDataSnapshot = await senderRef.get() // sender user object
      const previousMessagesTo = senderDataSnapshot.get('messagesTo') // array
      // update sender messagesTo document
      await senderRef.update({
        messagesTo: [...previousMessagesTo, chatId],
        updatedAt: nowMillis,
      })

      // get receiverRef & previousMessagesFrom data
      const receiverRef = usersRef.doc(receiverUserId) // receiver reference
      const receiverDataSnapshot = await receiverRef.get() // receiver user object
      const previousMessagesFrom = receiverDataSnapshot.get('messagesFrom') // array
      // update receiver messagesFrom document
      await receiverRef.update({
        messagesFrom: [...previousMessagesFrom, chatId],
        updatedAt: nowMillis,
      })

      // chat ref
      const chatsRef = realDB.ref('chats')
      const chatRef = chatsRef.child(chatId) // ref ke chatId

      // set initial data without lastMessage, message
      await chatRef.set({
        chatId,
        updatedAt: nowMillis,
      })

      // POST chats SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        chatId,
        error: false,
        message: 'Sender messagesTo updated & receiver messagesFrom updated',
      })
    } catch (err) {
      // POST ERROR -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message, err })
    }
  } else {
    // error => invalid req method
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}
