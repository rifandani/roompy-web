import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import { getAsString } from 'utils/getAsString'
import { getRoompies } from 'utils/getRoompies'

export default nc
  // cors middleware
  .use(withCors(['GET']))
  /* -------------------------- GET req => /posted/roompies?userId=userId ------------------------- */
  .get('/api/posted/roompies', async (req, res) => {
    // if there is no query, throws 400
    if (Object.keys(req.query).length === 0) {
      res
        .status(400)
        .json({ error: true, message: 'Please provide query userId' })
      return
    }

    // get all roompies
    const userId = getAsString(req.query.userId)
    const { roompies } = await getRoompies()

    // filter all roompies array to get the roompy object that match with userId from query
    const userPostedRoompies = roompies.filter(
      (roompy) => roompy.postedBy === userId
    )

    // GET success => OK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      postedRoompies: userPostedRoompies,
      havePostedRoompies: userPostedRoompies.length > 0 ? true : false,
    })
  })
