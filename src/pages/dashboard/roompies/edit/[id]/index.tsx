import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
// files
import DashboardLayout from 'components/dashboard/DashboardLayout'
import EditRoompies from 'components/editRoompies/EditRoompies'
import { db } from 'configs/firebaseConfig'
import { Roompy, User } from 'utils/interfaces'
import { getAsString } from 'utils/getAsString'

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
    const decoded = verify(authCookie, process.env.MY_SECRET_KEY)

    // get user from firestore
    const userSnap = await db
      .collection('users')
      .doc((decoded as { sub: string })?.sub)
      .get()

    const user = {
      ...userSnap.data(),
      id: userSnap.id,
    }

    // get roompy from firestore
    const roompyId = getAsString(ctx.params?.id)
    const roompySnap = await db.collection('roompies').doc(roompyId).get()

    const roompy = {
      ...roompySnap.data(),
      id: roompySnap.id,
    }

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
