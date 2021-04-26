import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { realDB, databaseTime } from '../../../configs/firebaseConfig'
import getUser from '../../../utils/getUser'
import captureException from '../../../utils/sentry/captureException'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  const chatsRef = realDB.ref('chats')

  // GET req => /chats?id=userId
  if (req.method === 'GET') {
    try {
      // get user
      const { user } = await getUser(req)

      // variables
      let promises = []
      const userMessagesFromLength = user.messagesFrom.length
      const userMessagesToLength = user.messagesTo.length

      // get user messagesFrom (inbox) and push it to Promises array
      if (userMessagesFromLength > 0) {
        user.messagesFrom.forEach(async (chatId) => {
          promises.push(chatsRef.child(chatId).get())
        })
      }

      // get user messagesTo (outbox) and push it to Promises array
      if (userMessagesToLength > 0) {
        user.messagesTo.forEach(async (chatId) => {
          promises.push(chatsRef.child(chatId).get())
        })
      }

      // kalau Promises array empty
      if (promises.length === 0) {
        return res.status(200).json({
          error: false,
          messages: [],
          message: 'No messages found',
        })
      }

      // settle all Promises array
      const promiseValues = await Promise.all(promises)

      // convert toJSON to a serializable data
      const messages = promiseValues.map((val) => val.toJSON())

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        messages,
        error: false,
      })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // GET server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    // POST req => /chats
  } else if (req.method === 'POST') {
    try {
      const { senderUserId, text, chatId } = req.body // destructure body

      // chat ref
      const chatRef = chatsRef.child(chatId) // ref ke chatId

      // TODO: kalo FREE user max. 3 chats

      // update updatedAt, lastMessage
      await chatRef.update({
        updatedAt: databaseTime,
        lastMessage: text,
      })

      // push text ke message list
      await chatRef.child('message').push({
        text,
        senderUserId,
        time: databaseTime,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'Message sent' })
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
    res
      .status(405)
      .json({ error: true, message: 'Only support GET and POST req' })
  }
}
