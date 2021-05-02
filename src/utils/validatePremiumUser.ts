// files
import { User } from './interfaces'

export default function validatePremiumUser(dbUser: User) {
  const isValid = dbUser.premiumUntil > Date.now()

  if (isValid) {
    return true
  }

  return false
}
