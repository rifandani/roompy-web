import * as Sentry from '@sentry/node'
// files
import { DocDataRef } from './interfaces'

export default async function unpremiumUser(userRef: DocDataRef) {
  try {
    // revert back user premium = false, premiumUntil = 0
    await userRef.update({
      premium: false,
      premiumUntil: 0,
    })

    console.log(`user ${userRef.id} is no longer premium`)
  } catch (err) {
    Sentry.captureException(err, {
      user: {
        username: 'rifandani',
      },
    })

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000)
  }
}
