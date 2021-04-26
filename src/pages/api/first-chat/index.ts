import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import {
  databaseTime,
  db,
  nowMillis,
  realDB,
} from '../../../configs/firebaseConfig'
import captureException from '../../../utils/sentry/captureException'

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

      // get senderRef object data
      const senderRef = usersRef.doc(senderUserId) // sender reference
      const senderDataSnapshot = await senderRef.get()

      // update sender messagesTo document
      const previousMessagesTo = senderDataSnapshot.get('messagesTo') // array
      await senderRef.update({
        messagesTo: [...previousMessagesTo, chatId],
        updatedAt: nowMillis,
      })

      // get receiverRef object data
      const receiverRef = usersRef.doc(receiverUserId) // receiver reference
      const receiverDataSnapshot = await receiverRef.get()

      // update receiver messagesFrom document
      const previousMessagesFrom = receiverDataSnapshot.get('messagesFrom') // array
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
        updatedAt: databaseTime,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        chatId,
        error: false,
        message: 'Sender messagesTo updated & receiver messagesFrom updated',
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
    // client error => Method Not Allowed -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}
