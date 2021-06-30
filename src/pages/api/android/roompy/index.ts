import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import { getAsString } from 'utils/getAsString'
import { getRoompy } from 'utils/getRoompy'
import { nowMillis } from 'configs/firebaseConfig'

export default nc
  .use(withCors(['PUT']))
  /* ------------------------------- PUT => /api/android/roompy?id=roompyId ------------------------------- */
  /* ----------------------- update ONLY roompy data (photoURL not included) ---------------------- */
  .put('/api/android/roompy', async (req, res) => {
    // get request body & query
    const roompyId = getAsString(req.query.id)
    const reqBody = req.body

    // get roompy & roompyRef
    const { roompy, roompyRef } = await getRoompy(roompyId)

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
  })
