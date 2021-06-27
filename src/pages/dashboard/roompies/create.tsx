import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
// files
import DashboardLayout from 'components/dashboard/DashboardLayout'
import CreateRoompies from 'components/createRoompies/CreateRoompies'
import getUser from 'utils/getUser'
import { AuthCookiePayload, UserProps } from 'utils/interfaces'

export default function CreateRoompiesPage({ user }: UserProps): JSX.Element {
  return (
    <div className="">
      <DashboardLayout ver2>
        <CreateRoompies user={user} />
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
    // verify the authCookie
    const decoded = verify(
      authCookie,
      process.env.MY_SECRET_KEY
    ) as AuthCookiePayload

    // get user from firestore
    const { user } = await getUser(decoded.sub)

    return {
      props: {
        user,
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
