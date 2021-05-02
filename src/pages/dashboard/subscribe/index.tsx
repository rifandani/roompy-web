import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
// files
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import SubscribeComp from '../../../components/subscribe/SubscribeComp'
import { User } from '../../../utils/interfaces'
import getUserFromDecodedToken from '../../../utils/getUserFromDecodedToken'

export interface ISubscribePageProps {
  dbUser: User
}

export default function SubscribePage({ dbUser }: ISubscribePageProps) {
  return (
    <DashboardLayout ver2>
      <SubscribeComp dbUser={dbUser} />
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
    const { user } = await getUserFromDecodedToken(decoded as { sub: string })

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
