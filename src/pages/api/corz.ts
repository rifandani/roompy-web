import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
// files
import initMiddleware from '../../utils/initMiddleware';

// Initialize the cors middleware
// more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'], // Only allow requests
  }),
);

export default async function Corz(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Run cors
    await cors(req, res);

    // Rest of the API logic
    res.status(200).json({ message: 'Hello Everyone!' });
  } catch (err) {
    res.status(500).json(err);
  }
}
