import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../../middlewares/initMiddleware'
import { db } from '../../../../configs/firebaseConfig'
import { Roompies } from '../../../../utils/interfaces'
import { getAsString } from '../../../../utils/getAsString'
import captureException from '../../../../utils/sentry/captureException'

const cors = initMiddleware(
  Cors({
    methods: 'GET',
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  // GET req => /posted/roompies?userId=userId
  if (req.method === 'GET') {
    try {
      const userId = getAsString(req.query.userId)

      // get all roompies
      const roompiesSnap = await db.collection('roompies').get()

      const roompies = roompiesSnap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }))

      // filter all roompies array to get the roompy object that match with userId from query
      const userPostedRoompies = (roompies as Roompies).filter(
        (el) => el.postedBy === userId
      )

      // GET success => OK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        postedRoompies: userPostedRoompies,
        havePostedRoompies: userPostedRoompies.length > 0 ? true : false,
      })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // GET server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => Method Not Allowed
    res.status(405).json({ error: true, message: 'Only support GET req' })
  }
}
