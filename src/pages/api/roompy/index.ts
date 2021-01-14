import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// Polyfills required for Firebase
import XHR from 'xhr2';
import WS from 'ws';
// import formidable from 'formidable';
import nc from 'next-connect';
// files
import initMiddleware from '../../../middlewares/initMiddleware';
import { db, nowMillis, storage } from '../../../configs/firebaseConfig';
import getRoompy from '../../../utils/getRoompy';

const handler = nc();

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: 'PUT',
  }),
);

// PUT req => /roompy?id=roompyId
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // Run cors

  // polyfill
  global.XMLHttpRequest = XHR;
  (global.WebSocket as any) = WS;

  try {
    // destructure req.body
    const reqBody = req.body;

    // get roompy & roompyRef
    const { roompy, roompyRef } = await getRoompy(req);

    // update all previous roompy data
    await roompyRef.update({
      ...reqBody,
      photoURL: roompy.photoURL, // make sure photoURL does not updated
      updatedAt: nowMillis,
    });

    // PUT SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({
      error: false,
      message: 'Roompy updated successfully',
    });
  } catch (err) {
    // PUT ERROR -----------------------------------------------------------------
    res
      .status(500)
      .json({ error: true, name: err.name, message: err.message, err });
  }
});

export default handler;
