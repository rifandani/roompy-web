import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// Polyfills required for Firebase
import XHR from 'xhr2';
import WS from 'ws';
import nc from 'next-connect';
// files
import { db, storage } from '../../../configs/firebaseConfig';
import initMiddleware from '../../../../middlewares/initMiddleware';
import middleware from '../../../../middlewares/middleware';

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: 'POST',
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

  if (req.method === 'POST') {
    try {
      // @ts-ignore
      const files = req.files; // { file: object | object[], roompy: object } tergantung form.multiples = true / false

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

      // POST SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: `photos uploaded`,
        photoURL: '',
      });
    } catch (err) {
      // POST ERROR -----------------------------------------------------------------
      res.status(500).json({ error: true, err });
    }
  } else {
    // REQ ERROR -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only POST method allowed' });
  }
});

export default handler;
