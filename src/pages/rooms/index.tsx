import Loader from 'react-loader-spinner'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
// files
import Rooms from 'components/rooms/Rooms'

export default function RoomsPage(): JSX.Element {
  const [busy] = useState<boolean>(false)

  if (busy) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader
          type="ThreeDots"
          color="Purple"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    )
  }

  return (
    <>
      <Rooms />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { sharedFacility, roomFacility } = ctx.query

  return {
    props: {
      sharedFacility,
      roomFacility,
    },
  }
}
