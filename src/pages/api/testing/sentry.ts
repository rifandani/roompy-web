import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import * as Sentry from '@sentry/node'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import init from '../../../utils/sentry/init'

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
)

// init sentry
init()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  if (req.method === 'GET') {
    try {
      // untuk di client, juga sama tanpa adanya init(), captureException, flush
      // return error object dengan message
      throw new Error('Error API /testing/sentry')
    } catch (err) {
      Sentry.captureException(err, {
        user: {
          username: 'rifandani',
        },
      })

      // Flushing before returning is necessary if deploying to Vercel, see
      // https://vercel.com/docs/platform/limits#streaming-responses
      await Sentry.flush(2000)

      // server error => Internal Server Error
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
  } else {
    // client error => Method Not Allowed
    res.status(405).json({ error: true, message: 'Only support GET req' })
  }
}
