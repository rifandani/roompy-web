import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// files
import initMiddleware from '../../../../middlewares/initMiddleware';
import { db, nowMillis } from '../../../../configs/firebaseConfig';
import { User } from '../../../../utils/interfaces';
import { getAsString } from '../../../../utils/getAsString';

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['POST', 'DELETE'],
  }),
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // run cors

  // POST req => /favorites/roompies
  if (req.method === 'POST') {
    try {
      const { userId, roompyId } = req.body; // destructure req.body
      const userRef = db.collection('users').doc(userId); // user ref

      // get user
      const userSnap = await userRef.get();
      const user = {
        ...userSnap.data(),
        id: userSnap.id,
      };

      // add favorited roompies to user document
      const prevFavRoompies = (user as User).favorites.roompies;
      const isAlreadyExists = prevFavRoompies.includes(roompyId);

      // kalau roompyId sudah ada di list
      if (isAlreadyExists) {
        return res.status(400).json({
          error: true,
          message: `${roompyId} is already exists in the favorites list`,
        });
      }

      await userRef.update({
        favorites: {
          roompies: [...prevFavRoompies, roompyId],
        },
      });

      res.status(200).json({
        error: false,
        message: 'Success adding to the favorites list',
      });
    } catch (err) {
      // POST ERROR -----------------------------------------------------------------
      res
        .status(501)
        .json({ error: true, name: err.name, message: err.message, err });
    }
    // DELETE req => /favorites/roompies
  } else if (req.method === 'DELETE') {
    try {
      // destructuring
      const userId = getAsString(req.query.userId);
      const roompyId = getAsString(req.query.roompyId);
      const userRef = db.collection('users').doc(userId); // user ref

      // get user
      const userSnap = await userRef.get();
      const user = {
        ...userSnap.data(),
        id: userSnap.id,
      };

      // delete favorited roompies from user document
      const favRoompies = (user as User).favorites.roompies;
      const filteredFavRoompies = favRoompies.filter(
        (favId) => favId !== roompyId,
      );

      // kalau favRoompies ada isinya
      if (favRoompies.length > 0) {
        await userRef.update({
          favorites: {
            roompies: filteredFavRoompies,
          },
          updatedAt: nowMillis,
        });

        // DELETE SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({
          error: false,
          message: 'Favorited roompies deleted successfully',
        });
      } else {
        // kalau favRoompies tidak ada isinya
        res.status(400).json({
          error: true,
          message: 'Favorited roompies is already empty, please check again!',
        });
      }
    } catch (err) {
      // DELETE ERROR -----------------------------------------------------------------
      res
        .status(501)
        .json({ error: true, name: err.name, message: err.message, err });
    }
  } else {
    // error => invalid req method
    res
      .status(405)
      .json({ error: true, message: 'Only support POST and DELETE req' });
  }
};
