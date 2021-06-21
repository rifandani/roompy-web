import Cors from 'cors'
// files
import nc from 'middlewares/nc'
import { getRoompy } from 'utils/getRoompy'
import { nowMillis } from 'configs/firebaseConfig'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['PUT'],
    })
  )
  /* ------------------------------- PUT req => /roompy?id=roompyId ------------------------------- */
  /* ----------------------- update ONLY roompy data (photoURL not included) ---------------------- */
  .put(async (req, res) => {
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
  })
