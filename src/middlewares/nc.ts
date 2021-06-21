import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import captureException from 'utils/sentry/captureException'

export default nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    // client error => Method Not Allowed -----------------------------------------------------------------
    res
      .status(405)
      .json({ error: true, message: `Method ${req.method} not allowed` })
  },
  async onError(err, _, res) {
    // capture exception sentry
    await captureException(err)

    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({
      error: true,
      name: err.name,
      message: err.message,
      errors: err.errors || [], // from yup middleware
    })
  },
})
