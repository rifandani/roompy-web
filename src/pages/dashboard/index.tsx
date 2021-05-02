import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
// files
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import DashboardContent from '../../components/dashboard/DashboardContent'
import { User } from '../../utils/interfaces'
import getUserFromDecodedToken from '../../utils/getUserFromDecodedToken'
import validatePremiumUser from '../../utils/validatePremiumUser'
import unpremiumUser from '../../utils/unpremiumUser'

export interface DashboardProps {
  dbUser: User
}

export default function DashboardPage({ dbUser }: DashboardProps) {
  return (
    <DashboardLayout>
      <DashboardContent dbUser={dbUser} />
    </DashboardLayout>
  )
}

// You should not use fetch() to call an API route in getServerSideProps. Instead, directly import the logic used inside your API route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth

  // kalau auth cookie kosong
  if (!authCookie) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {
    // verify the authCookie
    // decoded === payload { sub: user.uid }
    const decoded = verify(authCookie!, process.env.MY_SECRET_KEY)

    // get user from firestore
    const { user, userRef } = await getUserFromDecodedToken(
      decoded as { sub: string }
    )

    // premium user validation only happen in user dashboard
    // validate is the user premiumUntil is still valid
    if (user?.premium) {
      const isValid = validatePremiumUser(user)

      // if premiumUntil is no longer valid
      if (!isValid) {
        await unpremiumUser(userRef)
      }
    }

    return {
      props: {
        dbUser: user,
      },
    }
  } catch (err) {
    // kalau auth cookie ada tapi tidak valid / verify error
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}
