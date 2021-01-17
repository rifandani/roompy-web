import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// files
import initMiddleware from '../../../../middlewares/initMiddleware';
import { db } from '../../../../configs/firebaseConfig';
import { Roompies } from '../../../../utils/interfaces';
import { getAsString } from '../../../../utils/getAsString';

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: 'GET',
  }),
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // run cors

  // GET req => /posted/roompies?userId=userId
  if (req.method === 'GET') {
    try {
      const userId = getAsString(req.query.userId);

      // get all roompies
      const roompiesSnap = await db.collection('roompies').get();

      const roompies = roompiesSnap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));

      // userPostedRoompies
      const userPostedRoompies = (roompies as Roompies).filter(
        (el) => el.postedBy === userId,
      );

      // kalau belum ada postedRoompies
      if (userPostedRoompies.length === 0) {
        // GET SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        return res.status(200).json({
          error: false,
          postedRoompies: [],
          havePostedRoompies: false,
          message: 'There is no posted roompies in this user document',
        });
      }

      // POST SUCCESS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        postedRoompies: userPostedRoompies,
        havePostedRoompies: true,
      });
    } catch (err) {
      // GET ERROR -----------------------------------------------------------------
      res
        .status(501)
        .json({ error: true, name: err.name, message: err.message, err });
    }
  } else {
    // error => invalid req method
    res.status(405).json({ error: true, message: 'Only support GET req' });
  }
};
