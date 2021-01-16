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

  // GET req => /matches/roompies?id=userId
  if (req.method === 'GET') {
    try {
      const userId = getAsString(req.query.id); // destructure req.query

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
        return res.status(200).json({
          error: false,
          matchRoompies: [],
          message: 'There is no posted roompies in this user document',
        });
      }

      // current user roompiesPreferences
      const userPref = {
        gender: userPostedRoompies[0].roompiesPref.gender,
        ageFrom: userPostedRoompies[0].roompiesPref.ageFrom,
        ageTo: userPostedRoompies[0].roompiesPref.ageTo,
        pet: userPostedRoompies[0].roompiesPref.pet,
        smoker: userPostedRoompies[0].roompiesPref.smoker,
        loc: userPostedRoompies[0].locPref,
      };

      // roompies except user postedRoompies
      const roompiesExcept = (roompies as Roompies).filter(
        (el) => el.postedBy !== userId,
      );

      // filter all roompies based on userPref
      const matchRoompies = (roompiesExcept as Roompies).filter((roompy) => {
        const isPetOkay = userPref.pet === 'Okay';
        const isSmokerOkay = userPref.smoker === 'Okay';
        const isGenderFlex = userPref.gender === 'Flex';

        const selected =
          roompy.locPref.includes(userPref.loc[0]) &&
          roompy.ownPet === isPetOkay &&
          roompy.smoker === isSmokerOkay &&
          (isGenderFlex ? true : roompy.gender === userPref.gender) &&
          roompy.age >= userPref.ageFrom &&
          roompy.age <= userPref.ageTo;

        return selected;
      });

      // GET SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        matchRoompies,
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
