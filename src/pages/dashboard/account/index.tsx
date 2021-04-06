import { GetServerSideProps } from 'next'
import { useContext } from 'react'
import { verify } from 'jsonwebtoken'
import Loader from 'react-loader-spinner'
// files
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import AccountContent from '../../../components/account/AccountContent'
import { db } from '../../../configs/firebaseConfig'
import { User } from '../../../utils/interfaces'
import UserContext from '../../../contexts/UserContext'

export interface AccountPageProps {
  dbUser: User
}

export default function AccountPage({ dbUser }: AccountPageProps) {
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

// You should not use fetch() to call an API route in getServerSideProps. Instead, directly import the logic used inside your API route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req.headers?.cookie
  const authCookie = cookie?.replace('auth=', '') // get only the cookie

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
    // decoded === payload { sub: user.uid }
    const decoded = verify(authCookie!, process.env.MY_SECRET_KEY)

    // get user from firestore
    const userSnap = await db
      .collection('users')
      .doc((decoded as { sub: string })?.sub)
      .get()

    const dbUser = {
      ...userSnap.data(),
      id: userSnap.id,
    }

    return {
      props: {
        dbUser,
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
