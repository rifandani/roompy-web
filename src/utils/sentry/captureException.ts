import * as Sentry from '@sentry/node'
// files
import init from './init'

// init sentry node
init()

const captureException = async (err: Error) => {
  Sentry.captureException(err, {
    user: {
      username: 'rifandani',
      email: 'ipandani2505@gmail.com',
    },
  })

  await Sentry.flush(2000)
}

export default captureException
