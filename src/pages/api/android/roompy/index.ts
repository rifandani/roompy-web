import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// Polyfills required for Firebase
import XHR from 'xhr2'
import WS from 'ws'
// files
import initMiddleware from '../../../../middlewares/initMiddleware'
import { nowMillis } from '../../../../configs/firebaseConfig'
import getRoompy from '../../../../utils/getRoompy'
import captureException from '../../../../utils/sentry/captureException'

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['PUT'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // polyfill
  global.XMLHttpRequest = XHR
  ;(global.WebSocket as any) = WS

  // update ONLY roompy data (photoURL not included)
  // PUT req => /roompy?id=roompyId
  if (req.method === 'PUT') {
    try {
      // destructure req.body
      const reqBody = req.body

      // get roompy & roompyRef
      const { roompy, roompyRef } = await getRoompy(req)

      // update all previous roompy data
      await roompyRef.update({
        ...reqBody,
        photoURL: roompy.photoURL, // make sure photoURL does not updated
        updatedAt: nowMillis,
      })

      // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Roompy updated successfully',
      })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // PUT server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => Method Not Allowed
    res.status(405).json({ error: true, message: 'Only support PUT req' })
  }
}
