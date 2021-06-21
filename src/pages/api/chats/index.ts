import Cors from 'cors'
// files
import withYupConnect from 'middlewares/withYupConnect'
import nc from 'middlewares/nc'
import getUser from 'utils/getUser'
import { chatsApiSchema, TChatsApi } from 'utils/yup/apiSchema'
import { realDB, databaseTimestamp } from 'configs/firebaseConfig'

const chatsRef = realDB.ref('chats')

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['GET', 'POST'],
    })
  )
  .use(withYupConnect(chatsApiSchema)) // yup middleware
  /* --------------------------------- GET req => /chats?id=userId -------------------------------- */
  .get(async (req, res) => {
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
  })
  /* ------------------------------------- POST req => /chats ------------------------------------- */
  .post(async (req, res) => {
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
  })
