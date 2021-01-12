import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// Polyfills required for Firebase
import XHR from 'xhr2';
import WS from 'ws';
// import formidable from 'formidable';
import nc from 'next-connect';
// files
import initMiddleware from '../../../../middlewares/initMiddleware';
import middleware from '../../../../middlewares/middleware';
import { db, storage } from '../../../configs/firebaseConfig';
import getRoompy from '../../../utils/getRoompy';

const handler = nc();
handler.use(middleware);

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

export const config = {
  api: {
    bodyParser: false,
  },
};

const roompiesRef = db.collection('roompies');

// GET REQUEST => roompies & roompy
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // run cors

  try {
    if (Object.keys(req.query).length === 0) {
      // get all roompies
      const roompiesSnap = await roompiesRef.orderBy('createdAt', 'desc').get();
      const roompies = roompiesSnap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));

      // GET roompies SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json(roompies);
    } else {
      // get roompy
      const { roompy } = await getRoompy(req);

      // GET roompy SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json(roompy);
    }
  } catch (err) {
    // GET ERROR -----------------------------------------------------------------
    res.status(500).json({ error: true, message: err.message, err });
  }
});

// POST REQUEST
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // Run cors

  // polyfill
  global.XMLHttpRequest = XHR;
  (global.WebSocket as any) = WS;

  try {
    // @ts-ignore
    const files = req.files;
    const state = JSON.parse(req.body.roompy);
    const userId = req.body.userId;

    // console.log('photo => ', files.photo);
    // console.log('JSON.parse req.body.roompy => ', state);
    // console.log('string req.body.userId => ', userId);
    res.status(201).json({ files, body: req.body });

    // save to firestore with empty photoURL & get the roompiesId first
    // const postedRoompiesRef = await roompiesRef.add({
    //   ...state,
    //   photoURL: '',
    // });

    // // storageRef => /users/{userId}/roompies/{roompiesId}/img.png
    // const storageRef = storage.ref(
    //   `users/${userId}/roompies/${postedRoompiesRef.id}/${files.photo.name}`,
    // );
    // await storageRef.put(files.photo); // save to storage => File / Blob
    // const url = await storageRef.getDownloadURL(); // get fileUrl from uploaded file
    // console.log('url', url);

    // if (url) {
    //   // update photoURL the previous roompies
    //   await roompiesRef.doc(postedRoompiesRef.id).update({
    //     photoURL: url,
    //   });

    //   // get user document, then update user 'postedRoompies'
    //   const userRef = db.collection('users').doc(userId);
    //   // const userSnap = await userRef.get();
    //   // const prevPostedRoompies = userSnap.get('postedRoompies'); // array
    //   await userRef.update({
    //     postedRoompies: [postedRoompiesRef.id],
    //   });

    //   // POST SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //   res.status(201).json({
    //     error: false,
    //     message: 'Roompies created successfully',
    //   });
    // }
  } catch (err) {
    // POST ERROR -----------------------------------------------------------------
    return res.status(500).json({ error: true, message: err.message, err });
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // PUT SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      message: 'roompies updated successfully',
    });
  } catch (err) {
    // PUT ERROR -----------------------------------------------------------------
    res.status(500).json({ error: true, message: err.message, err });
  }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // Run cors

  // polyfill
  global.XMLHttpRequest = XHR;
  (global.WebSocket as any) = WS;

  try {
    // get roompy
    const { roompy, roompyRef } = await getRoompy(req);

    // get photoURL ref & delete photoURL in storage
    const photoRef = storage.refFromURL(roompy.photoURL);
    // const storageRef = storage.ref(
    //   `users/${userId}/roompies/${roompyId}/${name}`,
    // );
    await photoRef.delete();

    // delete roompy in roompies collection
    await roompyRef.delete();

    // update postedRoompies to empty [] in users collection
    await db.collection('users').doc(roompy.postedBy).update({
      postedRoompies: [],
    });

    // DELETE SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      message: 'roompies deleted successfully',
    });
  } catch (err) {
    // DELETE ERROR -----------------------------------------------------------------
    res.status(501).json({ error: true, message: err.message, err });
  }
});

export default handler;
