import axios from 'axios'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import React, { Dispatch, SetStateAction } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { toast } from 'react-toastify'
// files
import RoompyCard2 from 'components/roompies/RoompyCard2'
import axiosErrorHandle from 'utils/axiosErrorHandle'
import { Roompy, User } from 'utils/interfaces'
import { FavoritesPageProps } from 'pages/dashboard/favorites'

interface APIResponseFavoritesRoompies {
  error: boolean
  user: User
  favRoompies: Roompy[]
}

interface Props extends FavoritesPageProps {
  setBusy: Dispatch<SetStateAction<boolean>>
}

export default function InboxContent({ setBusy, userId }: Props): JSX.Element {
  // hooks
  const { data, error } = useSWR<APIResponseFavoritesRoompies>(
    `/favorites/roompies?userId=${userId}`
  )

  const onDeleteFav = async (_userId: string, _roompyId: string) => {
    try {
      setBusy(true)

      await axios.delete(
        `/favorites/roompies?userId=${_userId}&roompyId=${_roompyId}`
      )

      // on SUCCESS
      mutate(`/favorites/roompies?userId=${userId}`) // re-fetch
      toast.info('Delete successful')
      setBusy(false)
    } catch (err) {
      // on ERROR
      axiosErrorHandle(err)
      setBusy(false)
    }
  }

  return (
    <div className="flex-1 pb-20 mt-12 overflow-hidden bg-gray-100 md:mt-2 md:pb-0">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-red-700 to-gray-800">
          <h3 className="pl-2 font-bold">Favorites</h3>
        </div>
      </div>

      {/* main content */}
      <main className="py-6 xl:flex-1 xl:overflow-x-hidden">
        {/* favorited roompies */}
        <div className="pl-2">
          <div className="px-4">
            <h3 className="text-2xl italic font-bold text-purple-500">
              Roompies
            </h3>

            <p className="text-sm italic text-gray-600">
              List of all your favorited roompies
            </p>
          </div>

          {/* favorited roompies list */}
          <div className="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
            <div className="px-4 sm:inline-flex sm:pt-2 sm:pb-8">
              {data?.favRoompies.length > 0 ? (
                data.favRoompies.map((roompy, i) => (
                  <div
                    key={roompy.id}
                    className={`${
                      i > 0 ? 'mt-10 sm:ml-4' : ''
                    } sm:mt-0 sm:w-80 sm:flex-shrink-0 relative`}
                  >
                    <Link href={`/roompies/${roompy.id}`}>
                      <RoompyCard2 roompy={roompy} />
                    </Link>

                    <button
                      className="absolute flex items-center justify-center rounded-md shadow-xl top-1 right-1 focus:outline-none focus:ring-4 focus:ring-red-200"
                      onClick={() => onDeleteFav(userId, roompy.id)}
                    >
                      <FaWindowClose className="text-3xl text-red-500 hover:text-red-800" />
                    </button>
                  </div>
                ))
              ) : (
                <h3 className="mt-6 font-bold">
                  {error
                    ? 'Error fetching data'
                    : !data
                    ? 'Loading...'
                    : 'No data'}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* favorited rooms */}
        <div className="pl-2 mt-6">
          <div className="px-4">
            <h3 className="text-2xl italic font-bold text-pink-500">Rooms</h3>
            <p className="text-sm italic text-gray-600">
              List of all your favorited rooms
            </p>
          </div>

          {/* favorited rooms list */}
          <div className="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
            <div className="px-4 sm:inline-flex sm:pt-2 sm:pb-8">
              {data?.favRoompies.length > 0 ? (
                data.favRoompies.map((roompy, i) => (
                  <div
                    key={roompy.id}
                    className={`${
                      i > 0 ? 'mt-10 sm:ml-4' : ''
                    } sm:mt-0 sm:w-80 sm:flex-shrink-0`}
                  >
                    <RoompyCard2 roompy={roompy} />
                  </div>
                ))
              ) : (
                <h3 className="mt-6 font-bold">
                  {error
                    ? 'Error fetching data'
                    : !data
                    ? 'Loading...'
                    : 'No data'}
                </h3>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
