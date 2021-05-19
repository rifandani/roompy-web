import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import * as turf from '@turf/turf'
// files
import initMiddleware from '../../../../middlewares/initMiddleware'
import { db } from '../../../../configs/firebaseConfig'
import { Roompies } from '../../../../utils/interfaces'
import { getAsString } from '../../../../utils/getAsString'
import captureException from '../../../../utils/sentry/captureException'

// Initialize the cors middleware, see more: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: 'GET',
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  // GET req => /matches/roompies?userId=userId
  if (req.method === 'GET') {
    try {
      const userId = getAsString(req.query.userId) // destructure req.query

      // get all roompies
      const roompiesSnap = await db.collection('roompies').get()

      // append id to all roompy object
      const roompies = roompiesSnap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }))

      // filter all roompies so that it only select roompy from query userId
      const userPostedRoompies = (roompies as Roompies).filter(
        (el) => el.postedBy === userId
      )

      // kalau belum ada postedRoompies
      if (userPostedRoompies.length === 0) {
        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({
          error: false,
          matchRoompies: [],
          message: 'There is no posted roompies in this user document',
        })
        return
      }

      // current user roompiesPreferences
      // panjang array minimal 1, maksimal 3
      const userLocPref = userPostedRoompies[0].locPref.map(
        (el) => turf.point([el.lng, el.lat]) // Note order: longitude, latitude.
      )

      // roompies except user postedRoompies
      const roompiesExcept = (roompies as Roompies).filter(
        (el) => el.postedBy !== userId
      )

      // filter all roompies based on userPref
      let matchRoompies = []
      roompiesExcept.forEach((roompy) => {
        const roompyLocPref = roompy.locPref.map(
          (el) => turf.point([el.lng, el.lat]) // Note order: longitude, latitude.
        )

        userLocPref.forEach((userLoc) => {
          roompyLocPref.forEach((roompyLoc) => {
            const distance = turf.distance(userLoc, roompyLoc) // in km
            console.log(distance)

            if (distance <= 1) {
              matchRoompies.push(roompy)
            }
          })
        })
      })

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        matchRoompies,
        error: false,
        userLocPref: userPostedRoompies[0].locPref,
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
