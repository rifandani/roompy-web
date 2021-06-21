import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import getUser from 'utils/getUser'
import captureException from 'utils/sentry/captureException'
import initMiddleware from 'middlewares/initMiddleware'
import withYup from 'middlewares/withYup'
import { chatsApiSchema, TChatsApi } from 'utils/yup/apiSchema'
import { realDB, databaseTimestamp } from 'configs/firebaseConfig'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
  })
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await cors(req, res) // run cors

    const chatsRef = realDB.ref('chats')

    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                         GET req => /chats?id=userId                        */
      /* -------------------------------------------------------------------------- */

      // get user
      const { user } = await getUser(req)

      // variables
      const promises = []
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
        res.status(200).json({
          error: false,
          messages: [],
          message: 'No messages found',
        })
        return
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
    } else if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                             POST req => /chats                             */
      /* -------------------------------------------------------------------------- */

      const { senderUserId, text, chatId } = req.body as TChatsApi

      // chat ref
      const chatRef = chatsRef.child(chatId)

      // TODO: kalo FREE user max. 3 chats

      // update updatedAt & lastMessage
      await chatRef.update({
        updatedAt: databaseTimestamp,
        lastMessage: text,
      })

      // push text ke message list
      await chatRef.child('message').push({
        text,
        senderUserId,
        time: databaseTimestamp,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'Message sent' })
    } else {
      // client error => Method Not Allowed -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only support GET, POST req',
      })
    }
  } catch (err) {
    // capture exception sentry
    await captureException(err)

    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({
      error: true,
      name: err.name,
      message: err.message,
    })
  }
}

export default withYup(chatsApiSchema, handler)
