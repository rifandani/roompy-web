import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// Polyfills required for Firebase
import XHR from 'xhr2';
import WS from 'ws';
// import formidable from 'formidable';
import nc from 'next-connect';
// files
import { db, storage } from '../../../configs/firebaseConfig';
import initMiddleware from '../../../../middlewares/initMiddleware';
import middleware from '../../../../middlewares/middleware';

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'], // Only allow requests
  }),
);

const handler = nc();
handler.use(middleware);

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // Run cors
  await cors(req, res);

  // polyfill
  global.XMLHttpRequest = XHR;
  (global.WebSocket as any) = WS;

  // ref
  const roompiesRef = db.collection('roompies');

  // const form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  // form.multiples = false;

  if (req.method === 'GET') {
    try {
      // get all roompies
      const snap = await roompiesRef.orderBy('createdAt', 'desc').get();
      const roompies = snap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));

      // GET SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json(roompies);
    } catch (err) {
      // GET ERROR -----------------------------------------------------------------
      res.status(500).json({ error: true, err });
    }
  } else if (req.method === 'POST') {
    try {
      // const data = {
      //   name: req.body?.name,
      //   phoneNumber: req.body?.phoneNumber,
      //   gender: req.body?.gender,
      //   age: req.body?.age, // number
      //   occupation: req.body?.occupation,
      //   smoker: req.body?.smoker,
      //   ownPet: req.body?.ownPet,
      //   budget: req.body?.budget, // number
      //   moveDate: req.body?.moveDate, // milliseconds
      //   stayLength: req.body?.stayLength, // number
      //   desc: req.body?.desc,
      //   locPref: req.body?.locPref, // string[]
      //   homePref: req.body?.homePref, // { room, parking, wifi, bathroom }
      //   roompiesPref: req.body?.roompiesPref, // { gender, ageFrom (number), ageTo (number), smoker, pet }
      //   photoURL: req.body?.photoURL, // file[]
      // };

      // @ts-ignore
      const files = req.files;

      res.status(200).json({ files });

      // save to firestore with empty photoURL & get the roompiesId first
      // const postedRoompiesRef = await roompiesRef.add({
      //   ...data,
      //   photoURL: '',
      // });

      // // storageRef => /users/{userId}/roompies/{roompiesId}/img.png
      // const storageRef = storage.ref(
      //   `users/${req.body?.userId}/roompies/${postedRoompiesRef.id}/${data?.photoURL[0].name}`,
      // );
      // await storageRef.put(data?.photoURL[0]); // save to storage => File / Blob
      // const url = await storageRef.getDownloadURL(); // get fileUrl from uploaded file

      // if (url) {
      //   // update photoURL the previous roompies
      //   await roompiesRef.doc(postedRoompiesRef.id).update({
      //     photoURL: url,
      //   });

      //   // get user document, then update user 'postedRoompies'
      //   const userRef = db.collection('users').doc(req.body?.userId);
      //   // const userSnap = await userRef.get();
      //   // const prevPostedRoompies = userSnap.get('postedRoompies'); // array
      //   await userRef.update({
      //     postedRoompies: [postedRoompiesRef.id],
      //   });

      //   // POST SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //   res.status(201).json({
      //     error: false,
      //     message: `${postedRoompiesRef.id} roompies created successfully`,
      //     data,
      //   });
      // }
    } catch (err) {
      // POST ERROR -----------------------------------------------------------------
      res.status(500).json({ error: true, err });
    }
  } else {
    // REQ ERROR -----------------------------------------------------------------
    res
      .status(405)
      .json({ error: true, message: 'Only GET and POST method allowed' });
  }
});

export default handler;
