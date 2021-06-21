import Cors from 'cors'
import * as turf from '@turf/turf'
// files
import nc from 'middlewares/nc'
import { db } from 'configs/firebaseConfig'
import { Roompy } from 'utils/interfaces'
import { getAsString } from 'utils/getAsString'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['GET'],
    })
  )
  // GET req => /matches/roompies?userId=userId
  .get(async (req, res) => {
    const userId = getAsString(req.query.userId) // destructure req.query

    // get all roompies
    const roompiesSnap = await db.collection('roompies').get()

    // append id to all roompy object
    const roompies = roompiesSnap.docs.map((el) => ({
      ...el.data(),
      id: el.id,
    })) as Roompy[]

    // filter all roompies so that it only select roompy from query userId
    const userPostedRoompies = roompies.filter((el) => el.postedBy === userId)

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
    const roompiesExcept = roompies.filter((el) => el.postedBy !== userId)

    // filter all roompies based on userPref
    const matchRoompies = []
    roompiesExcept.forEach((roompy) => {
      const roompyLocPref = roompy.locPref.map(
        (el) => turf.point([el.lng, el.lat]) // Note order: longitude, latitude.
      )

      userLocPref.forEach((userLoc) => {
        roompyLocPref.forEach((roompyLoc) => {
          const distance = turf.distance(userLoc, roompyLoc) // in km

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
  })
