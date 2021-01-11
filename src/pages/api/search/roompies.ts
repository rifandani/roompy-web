import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// files
import { db } from '../../../configs/firebaseConfig';
import { Roompies } from '../../../utils/interfaces';
import initMiddleware from '../../../../middlewares/initMiddleware';

// Initialize the cors middleware
// more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: 'GET', // Only allow requests
  }),
);

export default async function SearchRoompies(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Run cors
  await cors(req, res);

  if (req.method === 'GET') {
    let { name, gender, loc, ageFrom, ageTo } = req.query; // destructure query object
    let result = []; // arr results

    try {
      // get all roompies docs
      const snap = await db.collection('roompies').orderBy('name', 'asc').get();
      let arr = snap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));

      // kalo query kosong => return all roompies
      if (Object.keys(req.query).length === 0) {
        return res.status(200).json(arr);
      }

      if (name) {
        const fName = (arr as Roompies).filter((el) =>
          el.name.includes(name as string),
        );
        result.push(...fName);
      } else if (gender) {
        const fGender = (arr as Roompies).filter((el) => el.gender === gender);
        result.push(...fGender);
      } else if (loc) {
        const fLoc = (arr as Roompies).filter((el) =>
          el.locPref.includes(loc as string),
        );
        result.push(...fLoc);
      } else if (ageFrom && ageTo) {
        const fAge = (arr as Roompies).filter(
          (el) => Number(ageFrom) <= el.age && el.age <= Number(ageTo),
        );
        result.push(...fAge);
      }

      // filter duplicate value in array
      const final = result.filter(
        (el, i, arr) => i === arr.findIndex((elem) => elem.id === el.id),
      );

      res.status(200).json(final);
    } catch (err) {
      res.status(500).json({ error: true, err });
    }
  } else {
    res.status(405).json({ error: true, message: 'Only GET method allowed' });
  }
}
