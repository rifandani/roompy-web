import Cors from 'cors'
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
  /* -------------------------- GET req => /posted/roompies?userId=userId ------------------------- */
  .get(async (req, res) => {
    const userId = getAsString(req.query.userId)

    // get all roompies
    const roompiesSnap = await db.collection('roompies').get()

    const roompies = roompiesSnap.docs.map((el) => ({
      ...el.data(),
      id: el.id,
    })) as Roompy[]

    // filter all roompies array to get the roompy object that match with userId from query
    const userPostedRoompies = roompies.filter((el) => el.postedBy === userId)

    // GET success => OK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      postedRoompies: userPostedRoompies,
      havePostedRoompies: userPostedRoompies.length > 0 ? true : false,
    })
  })
