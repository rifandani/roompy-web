import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// Polyfills required for Firebase
import XHR from 'xhr2'
import WS from 'ws'
import nc from 'next-connect'
import multer from 'multer'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { db, nowMillis, storage } from '../../../configs/firebaseConfig'
import getRoompy from '../../../utils/getRoompy'

const upload = multer() // will ONLY support form-data
const handler = nc()
handler.use(upload.single('photo'))

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)

export const config = {
  api: {
    bodyParser: false,
  },
}

const roompiesRef = db.collection('roompies')

// GET REQUEST => /roompies & /roompies?id=roompyId
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  try {
    // kalau gaada query berarti GET all roompies
    if (Object.keys(req.query).length === 0) {
      // get all roompies
      const roompiesSnap = await roompiesRef.get()

      // tambahin attribute id di setiap object data roompy
      const roompies = roompiesSnap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }))

      // GET roompies SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // res.setHeader('Cache-Control', 'public, max-age=900, max-stale=604800') // tambahin cache untuk android
      res.status(200).json(roompies)
    } else {
      // get roompy
      const { roompy } = await getRoompy(req)

      // GET roompy SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // res.setHeader('Cache-Control', 'public, max-age=900, max-stale=604800') // tambahin cache untuk android
      res.status(200).json(roompy)
    }
  } catch (err) {
    // GET ERROR -----------------------------------------------------------------
    res
      .status(500)
      .json({ error: true, name: err.name, message: err.message, err })
  }
})

// POST REQUEST => /roompies
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // polyfill
  global.XMLHttpRequest = XHR
  ;(global.WebSocket as any) = WS

  try {
    // @ts-ignore
    const file = req.file // hanya 1 file
    const state = JSON.parse(req.body.roompy)
    const userId = state.postedBy

    // console.log('file => ', file);
    // console.log('JSON.parse req.body.roompy => ', state);
    // console.log('string req.body.userId => ', userId);
    // res.status(201).json({ file, body: req.body });

    // save to firestore with empty photoURL & get the roompiesId first
    const postedRoompiesRef = await roompiesRef.add({
      ...state,
      createdAt: nowMillis,
      photoURL: '',
    })

    // storageRef => /users/{userId}/roompies/{roompiesId}/img.png
    const storageRef = storage.ref(
      `users/${userId}/roompies/${postedRoompiesRef.id}/${
        file?.originalname ?? file?.name ?? file?.filename
      }`
    )
    await storageRef.put(file?.buffer ?? file) // save to storage => File / Blob
    const url = await storageRef.getDownloadURL() // get fileUrl from uploaded file

    if (url) {
      // update photoURL the previous roompies
      await roompiesRef.doc(postedRoompiesRef.id).update({
        photoURL: url,
      })

      // get user document, then update user 'postedRoompies'
      const userRef = db.collection('users').doc(userId)
      const userSnap = await userRef.get()
      const prevPostedRoompies = userSnap.get('postedRoompies') // array
      await userRef.update({
        postedRoompies: [...prevPostedRoompies, postedRoompiesRef.id],
      })

      // POST SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Roompy created successfully',
      })
    }
  } catch (err) {
    // POST ERROR -----------------------------------------------------------------
    return res
      .status(500)
      .json({ error: true, name: err.name, message: err.message, err })
  }
})

// PUT req => /roompies?id=roompyId
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // polyfill
  global.XMLHttpRequest = XHR
  ;(global.WebSocket as any) = WS

  try {
    // @ts-ignore
    const file = req.file // hanya 1 file
    const state = JSON.parse(req.body.roompy)
    const userId = state.postedBy

    // console.log('file => ', file);
    // console.log('JSON.parse req.body.roompy => ', state);
    // console.log('string req.body.userId => ', userId);
    // res.status(201).json({ file, body: req.body });

    // get roompy & roompyRef
    const { roompy, roompyRef } = await getRoompy(req)

    // split photoURL string
    const splitted = roompy.photoURL.split('%2F') // [1] = userId, [3] = roompyId
    const prevPhotoName = splitted[splitted.length - 1].split('?')[0] // elon.png

    // delete previous photo
    const photoRef = storage.ref(
      `users/${userId}/roompies/${roompy.id}/${prevPhotoName}`
    )
    await photoRef.delete()

    // POST new photo to storage => /users/{userId}/roompies/{roompiesId}/img.png
    const storageRef = storage.ref(
      `users/${userId}/roompies/${roompy.id}/${
        file?.originalname ?? file?.name ?? file?.filename
      }`
    )
    await storageRef.put(file?.buffer ?? file) // save to storage => File / Blob
    const url = await storageRef.getDownloadURL() // get fileUrl from uploaded file

    if (url) {
      // update all previous roompy data
      await roompyRef.update({
        ...state,
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

// DELETE req => /roompies?id=roompyId
handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // polyfill
  global.XMLHttpRequest = XHR
  ;(global.WebSocket as any) = WS

  try {
    // get roompy
    const { roompy, roompyRef } = await getRoompy(req)

    // split photoURL string
    const splitted = roompy.photoURL.split('%2F') // [1] = userId, [3] = roompyId
    const prevPhotoName = splitted[splitted.length - 1].split('?')[0] // elon.png

    // delete previous photo
    const photoRef = storage.ref(
      `users/${roompy.postedBy}/roompies/${roompy.id}/${prevPhotoName}`
    )
    await photoRef.delete()

    // delete roompy in roompies collection
    await roompyRef.delete()

    // update postedRoompies => filter the previous data in users collection
    const userRef = db.collection('users').doc(roompy.postedBy)
    const user = await userRef.get()
    const filteredPostedRoompies = user
      .data()
      .postedRoompies.filter((prev: string) => prev !== roompy.id)
    await userRef.update({
      postedRoompies: filteredPostedRoompies,
    })

    // DELETE SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      message: 'Roompy deleted successfully',
    })
  } catch (err) {
    // DELETE ERROR -----------------------------------------------------------------
    res
      .status(501)
      .json({ error: true, name: err.name, message: err.message, err })
  }
})

export default handler
