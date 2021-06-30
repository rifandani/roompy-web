import multer from 'multer'
// Polyfills required for Firebase
import XHR from 'xhr2'
import WS from 'ws'
// files
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import { getRoompy } from 'utils/getRoompy'
import { getAsString } from 'utils/getAsString'
import { nowMillis, storage } from 'configs/firebaseConfig'
import { NextApiRequestWithMulterFile } from 'utils/interfaces'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default nc
  .use(withCors(['PUT']))
  .use(multer().single('photo')) // handle files upload middleware
  /* ------------------------------- PUT => /api/android/upload?id=roompyId ------------------------------- */
  /* --------------- ONLY update or add new photo for roompy (not other roompy data) -------------- */
  .put(
    '/api/android/upload',
    async (req: NextApiRequestWithMulterFile, res) => {
      // polyfill
      global.XMLHttpRequest = XHR
      ;(global.WebSocket as any) = WS

      // get request file and query
      const roompyId = getAsString(req.query.id)
      const file = req.file
      // console.log('file => ', file);
      // res.status(201).json({ file, body: req.body });

      // get roompy & roompyRef
      const { roompy, roompyRef } = await getRoompy(roompyId)

      // split photoURL string
      const splitted = roompy.photoURL.split('%2F') // [1] = userId, [3] = roompyId
      const prevPhotoName = splitted[splitted.length - 1].split('?')[0] // [0] = elon.png, [1] = alt=media&token=

      // delete previous photo
      const prevPhotoRef = storage.ref(
        `users/${roompy.postedBy}/roompies/${roompy.id}/${prevPhotoName}`
      )
      await prevPhotoRef.delete()

      // POST new photo to storage => /users/{userId}/roompies/{roompiesId}/img.png
      const storageRef = storage.ref(
        `users/${roompy.postedBy}/roompies/${roompy.id}/${
          file?.originalname ?? file?.filename // file?.name
        }`
      )
      await storageRef.put((file?.buffer ?? file) as ArrayBuffer) // should be casted as Blob | ArrayBuffer | Uint8Array
      const url = await storageRef.getDownloadURL() // get fileUrl from uploaded file

      if (url) {
        // update ONLY photoURL and updatedAt from previous roompy data
        await roompyRef.update({
          photoURL: url,
          updatedAt: nowMillis,
        })

        // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(201).json({
          error: false,
          message: 'Photo updated successfully',
        })
      }
    }
  )
