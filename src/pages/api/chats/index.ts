import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { realDB, nowMillis } from '../../../configs/firebaseConfig'
import { getAsString } from '../../../utils/getAsString'

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'DELETE'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  const messagesRef = realDB.ref('messages_id')
  const chatsRef = realDB.ref('chats')

  // GET req => /chats & /chats?userId=userId
  if (req.method === 'GET') {
    try {
      if (Object.keys(req.query).length === 0) {
        // get chats
        const messages = await chatsRef.get()
        const messagesOnce = await chatsRef.once('value')

        const exportVal = messagesOnce.exportVal()
        const val = messagesOnce.val()
        const keys = messagesOnce.key // 'messages_id'
        const numChild = messagesOnce.numChildren() // 2

        // GET chats SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ messages, exportVal, val, keys, numChild })
      } else {
        const userId = getAsString(req.query.userId)

        // get chats by userId
        const chats = await chatsRef.child(userId).get()

        // GET chats SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ chats })
      }
    } catch (err) {
      // GET ERROR -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message, err })
    }
    // POST req => /chats
  } else if (req.method === 'POST') {
    try {
      const {
        senderUserId,
        senderRoompyId,
        receiverUserId,
        receiverRoompyId,
        text,
      } = req.body // destructure body

      // pertimbangkan apakah pake receiverUserId atau receiverRoompyId. Begitu juga dengan senderUserId atau senderRoompyId
      const senderRef = chatsRef.child(senderUserId) // ref ke pengirim
      const senderChats = await senderRef.get()
      const numChild = senderChats.numChildren() // number

      // TODO: kalo FREE user max. 3 chats

      const receiverRef = senderRef.child(receiverUserId) // ref ke receiver, child dari senderRef
      const roompySenderRef = receiverRef.child('senderRoompy') // ref ke senderRoompy, child dari receiverRef
      const roompyReceiverRef = receiverRef.child('receiverRoompy') // ref ke receiverRoompy, child dari receiverRef
      const pesanRef = receiverRef.child('messages') // ref ke messages, child dari receiverRef

      roompySenderRef.set({ id: senderRoompyId })
      roompyReceiverRef.set({ id: receiverRoompyId })
      const thenableRef = pesanRef.push({
        text,
        createdAt: nowMillis,
      })

      // POST chats SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Message sent' })
    } catch (err) {
      // POST ERROR -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message, err })
    }
    // DELETE req =>
  } else if (req.method === 'DELETE') {
    try {
      // DELETE chats SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        message: 'User deleted successfully',
      })
    } catch (err) {
      // DELETE chats ERROR -----------------------------------------------------------------
      res
        .status(501)
        .json({ error: true, name: err.name, message: err.message, err })
    }
  } else {
    // error => invalid req method
    res
      .status(405)
      .json({ error: true, message: 'Only support GET, POST and DELETE req' })
  }
}
