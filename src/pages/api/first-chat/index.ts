import Cors from 'cors'
// files
import nc from 'middlewares/nc'
import withYupConnect from 'middlewares/withYupConnect'
import { firstChatApiSchema, TFirstChatApi } from 'utils/yup/apiSchema'
import {
  db,
  realDB,
  nowMillis,
  databaseTimestamp,
} from 'configs/firebaseConfig'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['POST'],
    })
  )
  .use(withYupConnect(firstChatApiSchema)) // yup middleware
  /* --------------------------------- POST req => /api/first-chat -------------------------------- */
  .post(async (req, res) => {
    const usersRef = db.collection('users') // users ref

    const { senderUserId, senderRoompyId, receiverUserId, receiverRoompyId } =
      req.body as TFirstChatApi

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
      updatedAt: databaseTimestamp,
    })

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({
      chatId,
      error: false,
    })
  })
