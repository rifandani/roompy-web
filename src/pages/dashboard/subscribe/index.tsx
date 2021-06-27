import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
// files
import SubscribeComp from 'components/subscribe/SubscribeComp'
import DashboardLayout from 'components/dashboard/DashboardLayout'
import getUser from 'utils/getUser'
import { AuthCookiePayload, User } from 'utils/interfaces'

export interface ISubscribePageProps {
  dbUser: User
}

export default function SubscribePage({
  dbUser,
}: ISubscribePageProps): JSX.Element {
  return (
    <DashboardLayout ver2>
      <SubscribeComp dbUser={dbUser} />
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
    const { user } = await getUser(decoded.sub)

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
