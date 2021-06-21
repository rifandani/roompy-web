import multer from 'multer'
import Cors from 'cors'
// Polyfills required for Firebase
import XHR from 'xhr2'
import WS from 'ws'
// files
import nc from 'middlewares/nc'
import { getRoompy } from 'utils/getRoompy'
import { db, nowMillis, storage } from 'configs/firebaseConfig'
import { NextApiRequestWithMulterFile } from 'utils/interfaces'

export const config = {
  api: {
    bodyParser: false,
  },
}

const roompiesRef = db.collection('roompies')

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  )
  // handle files upload middleware - will ONLY support form-data
  .use(multer().single('photo'))
  /* ---------------------- GET => /roompies & /roompies?id=roompyId ---------------------- */
  .get(async (req, res) => {
    // kalau gaada query berarti GET all roompies
    if (Object.keys(req.query).length === 0) {
      // get all roompies
      const roompiesSnap = await roompiesRef.get()

      // tambahin attribute id di setiap object data roompy
      const roompies = roompiesSnap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }))

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // res.setHeader('Cache-Control', 'public, max-age=900, max-stale=604800') // tambahin cache untuk android
      res.status(200).json(roompies)
      return
    }

    // get roompy
    const { roompy } = await getRoompy(req)

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json(roompy)
  })
  /* -------------------------------------- POST => /roompies ------------------------------------- */
  .post(async (req: NextApiRequestWithMulterFile, res) => {
    // TODO: validate client request body

    // polyfill
    global.XMLHttpRequest = XHR
    ;(global.WebSocket as any) = WS

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
        file?.originalname ?? file?.filename // file?.name
      }`
    )
    await storageRef.put((file?.buffer ?? file) as ArrayBuffer) // should be casted as Blob | ArrayBuffer | Uint8Array
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

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Roompy created successfully',
        roompyId: postedRoompiesRef.id,
      })
    }
  })
  /* ------------------------------ PUT req => /roompies?id=roompyId ------------------------------ */
  .put(async (req: NextApiRequestWithMulterFile, res) => {
    // TODO: validate client request body

    // polyfill
    global.XMLHttpRequest = XHR
    ;(global.WebSocket as any) = WS

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
        file?.originalname ?? file?.filename // file?.name
      }`
    )
    await storageRef.put((file?.buffer ?? file) as ArrayBuffer) // should be casted as Blob | ArrayBuffer | Uint8Array
    const url = await storageRef.getDownloadURL() // get fileUrl from uploaded file

    if (url) {
      // update all previous roompy data
      await roompyRef.update({
        ...state,
        photoURL: url,
        updatedAt: nowMillis,
      })

      // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Roompy updated successfully',
        roompyId: roompyRef.id,
      })
    }
  })
  /* ----------------------------- DELETE req => /roompies?id=roompyId ---------------------------- */
  .delete(async (req, res) => {
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

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      message: 'Roompy deleted successfully',
    })
  })
