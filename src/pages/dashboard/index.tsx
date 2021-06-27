import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
// files
import DashboardLayout from 'components/dashboard/DashboardLayout'
import DashboardContent from 'components/dashboard/DashboardContent'
import getUser from 'utils/getUser'
import unpremiumUser from 'utils/unpremiumUser'
import validatePremiumUser from 'utils/validatePremiumUser'
import { AuthCookiePayload, User } from 'utils/interfaces'

export interface DashboardProps {
  dbUser: User
}

export default function DashboardPage({ dbUser }: DashboardProps): JSX.Element {
  return (
    <DashboardLayout>
      <DashboardContent dbUser={dbUser} />
    </DashboardLayout>
  )
}

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
    const decoded = verify(
      authCookie,
      process.env.MY_SECRET_KEY
    ) as AuthCookiePayload

    // get user from firestore
    const { user, userRef } = await getUser(decoded.sub)

    // premium user validation only happen in user dashboard
    // validate is the user premiumUntil is still valid
    if (user.premium) {
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
