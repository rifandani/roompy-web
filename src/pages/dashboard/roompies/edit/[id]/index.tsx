import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
// files
import DashboardLayout from 'components/dashboard/DashboardLayout'
import EditRoompies from 'components/editRoompies/EditRoompies'
import getUser from 'utils/getUser'
import { AuthCookiePayload, Roompy, User } from 'utils/interfaces'
import { getAsString } from 'utils/getAsString'
import { getRoompy } from 'utils/getRoompy'

export interface EditRoompiesProps {
  user: User
  roompy: Roompy
}

export default function EditRoompiesPage({
  user,
  roompy,
}: EditRoompiesProps): JSX.Element {
  return (
    <div className="">
      <DashboardLayout ver2>
        <EditRoompies user={user} roompy={roompy} />
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

    // get roompy from firestore
    const roompyId = getAsString(ctx.params?.id)
    const { roompy } = await getRoompy(roompyId)

    return {
      props: {
        user,
        roompy,
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
