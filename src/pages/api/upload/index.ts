import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// Polyfills required for Firebase
import XHR from 'xhr2'
import WS from 'ws'
// import formidable from 'formidable';
import nc from 'next-connect'
import multer from 'multer'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { nowMillis, storage } from '../../../configs/firebaseConfig'
import getRoompy from '../../../utils/getRoompy'

// handle files upload middleware
const upload = multer()
const handler = nc()
handler.use(upload.single('photo'))

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['PUT'],
  })
)

export const config = {
  api: {
    bodyParser: false,
  },
}

// PUT req => /upload?id=roompyId
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // polyfill
  global.XMLHttpRequest = XHR
  ;(global.WebSocket as any) = WS

  try {
    // @ts-ignore
    const file = req.file

    // console.log('file => ', file);
    // res.status(201).json({ file, body: req.body });

    // get roompy & roompyRef
    const { roompy, roompyRef } = await getRoompy(req)

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
        file?.originalname ?? file?.name ?? file?.filename
      }`
    )
    await storageRef.put(file?.buffer ?? file) // save to storage => File / Blob
    const url = await storageRef.getDownloadURL() // get fileUrl from uploaded file

    if (url) {
      // update all previous roompy data
      await roompyRef.update({
        photoURL: url,
        updatedAt: nowMillis,
      })

      // PUT SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Roompy updated successfully',
      })
    }
  } catch (err) {
    // PUT ERROR -----------------------------------------------------------------
    res
      .status(500)
      .json({ error: true, name: err.name, message: err.message, err })
  }
})

export default handler
