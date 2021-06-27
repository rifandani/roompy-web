import Loader from 'react-loader-spinner'
import { parse } from 'cookie'
import { useContext } from 'react'
import { verify } from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
// files
import DashboardLayout from 'components/dashboard/DashboardLayout'
import AccountContent from 'components/account/AccountContent'
import UserContext from 'contexts/UserContext'
import getUser from 'utils/getUser'
import { AuthCookiePayload, User } from 'utils/interfaces'

export interface AccountPageProps {
  dbUser: User
}

export default function AccountPage({ dbUser }: AccountPageProps): JSX.Element {
  // hooks
  const { user } = useContext(UserContext)

  return (
    <div className="">
      <DashboardLayout ver2>
        {!user ? (
          <div className="flex items-center justify-center w-full min-h-screen">
            <Loader
              type="ThreeDots"
              color="Purple"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        ) : (
          <AccountContent dbUser={dbUser} user={user} />
        )}
      </DashboardLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth // get only the cookie

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
