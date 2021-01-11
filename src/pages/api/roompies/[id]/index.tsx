import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// Polyfills required for Firebase (global as any).XMLHttpRequest
import XHR from 'xhr2';
import WS from 'ws';
// files
import { db, storage } from '../../../../configs/firebaseConfig';
// import { adminDb, adminStorage } from '../../../../configs/adminConfig';
import initMiddleware from '../../../../../middlewares/initMiddleware';
import { getAsString } from '../../../../utils/getAsString';
import { Roompy } from '../../../../utils/interfaces';

// Initialize the cors middleware
// more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'PUT', 'DELETE'], // Only allow these requests
  }),
);

export default async function SearchRoompies(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Run cors
  await cors(req, res);

  // polyfill
  global.XMLHttpRequest = XHR;
  (global.WebSocket as any) = WS;

  // ref
  const params = getAsString(req.query.id);
  const roompyRef = db.collection('roompies').doc(params);

  // get roompy
  const roompySnap = await roompyRef.get();
  const roompy = {
    ...roompySnap.data(),
    id: roompySnap.id,
  };

  // get photo name from photoURL
  const url = (roompy as Roompy).photoURL;
  const splittedUrl = url.split('%2F');
  const userId = splittedUrl[1];
  const roompyId = splittedUrl[3];
  const name = splittedUrl[4].split('?')[0];

  if (req.method === 'GET') {
    try {
      // GET SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json(roompy);
    } catch (err) {
      // GET ERROR -----------------------------------------------------------------
      res.status(500).json({ error: true, err });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = {
        name: req.body?.name,
        phoneNumber: req.body?.phoneNumber,
        gender: req.body?.gender,
        age: req.body?.age, // number
        occupation: req.body?.occupation,
        smoker: req.body?.smoker,
        ownPet: req.body?.ownPet,
        budget: req.body?.budget, // number
        moveDate: req.body?.moveDate, // milliseconds
        stayLength: req.body?.stayLength, // number
        desc: req.body?.desc,
        locPref: req.body?.locPref, // string[]
        homePref: req.body?.homePref, // { room, parking, wifi, bathroom }
        roompiesPref: req.body?.roompiesPref, // { gender, ageFrom (number), ageTo (number), smoker, pet }
        photoURL: req.body?.photoURL, // file[]
      };

      // storageRef
      const storageRef = storage.ref(`users/${userId}/roompies/${roompyId}`);

      // delete old photo
      const oldPhotoRef = storageRef.child(name);
      await oldPhotoRef.delete();

      // save new photo to storage
      await storageRef.put(data?.photoURL[0]);
      // get fileUrl from uploaded file
      const photoUrl = await storageRef.getDownloadURL();

      // save to firestore ONLY if url is ready
      if (photoUrl) {
        // save to firestore
        await roompyRef.update({
          ...data,
          photoURL: photoUrl,
        });

        // PUT SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({
          error: false,
          message: `${roompyId} roompies updated successfully`,
          data,
        });
      }
    } catch (err) {
      // PUT ERROR -----------------------------------------------------------------
      res.status(500).json({ error: true, err });
    }
  } else if (req.method === 'DELETE') {
    try {
      // console.log('url', url); // 1
      // console.log('splittedUrl', splittedUrl);
      // console.log('userId', userId);
      // console.log('roompyId', roompyId);
      // console.log('name', name);
      // console.log(`users/${userId}/roompies/${roompyId}/${name}`); // 2

      // get photoURL ref & delete photoURL in storage
      // const photoRef = storage.refFromURL(url);
      const storageRef = storage.ref(
        `users/${userId}/roompies/${roompyId}/${name}`,
      );
      await storageRef.delete();

      // delete roompy in roompies collection
      await roompyRef.delete();

      // update postedRoompies to empty [] in users collection
      await db.collection('users').doc(userId).update({
        postedRoompies: [],
      });

      // DELETE SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        message: `${roompyId} roompies deleted successfully`,
      });
    } catch (err) {
      // DELETE ERROR -----------------------------------------------------------------
      res.status(501).json({ error: true, err });
    }
  } else {
    // ERROR -----------------------------------------------------------------
    res.status(405).json({
      error: true,
      message: 'Only GET, PUT and DELETE methods allowed',
    });
  }
}
