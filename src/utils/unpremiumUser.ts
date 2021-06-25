import { DocDataRef } from './interfaces'

export default async function unpremiumUser(
  userRef: DocDataRef
): Promise<void> {
  // revert back user premium = false, premiumUntil = 0
  await userRef.update({
    premium: false,
    premiumUntil: 0,
  })

  console.info(`user ${userRef.id} is no longer premium`)
}
