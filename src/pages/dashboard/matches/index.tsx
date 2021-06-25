import Loader from 'react-loader-spinner'
import { parse } from 'cookie'
import { useState } from 'react'
import { verify } from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
// files
import DashboardLayout from 'components/dashboard/DashboardLayout'
import MatchesContent from 'components/matches/MatchesContent'
import checkIfUserExists from 'utils/checkIfUserExists'
import { AuthCookiePayload } from 'utils/interfaces'

export interface MatchesPageProps {
  userId: string
}

export default function MatchesPage({ userId }: MatchesPageProps): JSX.Element {
  // hooks
  const [busy] = useState<boolean>(false)

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
    // verify auth cookie
    const decoded = verify(
      authCookie,
      process.env.MY_SECRET_KEY
    ) as AuthCookiePayload
    const userId = decoded.sub

    // if user does not exists
    const userIsExists = await checkIfUserExists(userId)
    if (!userIsExists) {
      return {
        redirect: { destination: '/login', permanent: false },
      }
    }

    return {
      props: {
        userId,
      },
    }
  } catch (err) {
    // kalau jwt malformed  || auth cookie tidak valid
    console.error(err)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}
