import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// import formidable from 'formidable';
import nc from 'next-connect';
// files
import initMiddleware from '../../../../middlewares/initMiddleware';
import { auth, db } from '../../../configs/firebaseConfig';
import getUser from '../../../utils/getUser';
import axios from 'axios';

const handler = nc();

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'DELETE'],
  }),
);

const usersRef = db.collection('users');

// GET req => /users & /users?id=userId
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // run cors

  try {
    if (Object.keys(req.query).length === 0) {
      // get all users
      const usersSnap = await usersRef.get();
      const users = usersSnap.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));

      // GET roompies SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json(users);
    } else {
      // get user
      const { user } = await getUser(req);

      // GET roompy SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json(user);
    }
  } catch (err) {
    // GET ERROR -----------------------------------------------------------------
    res
      .status(500)
      .json({ error: true, name: err.name, message: err.message, err });
  }
});

// DELETE req => /users?id=userId
handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // Run cors

  try {
    const { user, userRef } = await getUser(req);

    // can not delete premium user
    if (user.premium) {
      return res.status(200).json({
        error: false,
        message: 'You can not delete a premium user',
        user,
      });
    }

    // delete all posted ROOMPIES + ROOMS
    const postedRoompies = user.postedRoompies;
    // const postedRooms = user.postedRooms;

    if (postedRoompies.length > 0) {
      for (const roompyId of postedRoompies) {
        const resp = await axios.delete(`/roompies?id=${roompyId}`);

        if (resp.status !== 200) {
          return res.status(500).json(resp);
        }
      }
    }

    // if (postedRooms.length > 0) {
    // for (const roomId of postedRooms) {
    //   const resp = await axios.delete(`/rooms?id=${roomId}`);

    //   if (resp.status !== 200) {
    //     return res.status(500).json(resp)
    //   }
    // }
    // }

    // delete in users collection
    await userRef.delete();

    // delete in auth & signOut the user (move this to client-side)
    // const currUser = auth.currentUser;
    // await currUser.delete();

    // DELETE SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      message: 'User deleted successfully',
    });
  } catch (err) {
    // DELETE ERROR -----------------------------------------------------------------
    res
      .status(501)
      .json({ error: true, name: err.name, message: err.message, err });
  }
});

export default handler;
