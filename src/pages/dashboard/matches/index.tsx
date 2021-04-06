import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Loader from 'react-loader-spinner'
import { verify } from 'jsonwebtoken'
// files
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import MatchesContent from '../../../components/matches/MatchesContent'

export interface MatchesPageProps {
  userId: string
}

export default function MatchesPage({ userId }: MatchesPageProps) {
  // hooks
  const [busy, setBusy] = useState<boolean>(false)

  return (
    <div className="">
      <DashboardLayout ver2>
        {busy ? (
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
          <MatchesContent userId={userId} />
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
    const userId = (decoded as { sub: string })?.sub

    return {
      props: {
        userId,
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
