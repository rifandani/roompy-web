import Link from 'next/link'
import useSWR from 'swr'
// files
import RoompyCard2 from '../roompies/RoompyCard2'
import { MatchesPageProps } from '../../pages/dashboard/matches'
import { Roompies } from '../../utils/interfaces'

export default function InboxContent({ userId }: MatchesPageProps) {
  const { data, error } = useSWR(`/matches/roompies?userId=${userId}`)

  return (
    <div className="flex-1 pb-20 mt-12 overflow-hidden bg-gray-100 md:mt-2 md:pb-0">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-green-700 to-gray-800">
          <h3 className="pl-2 font-bold">Matches</h3>
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
              List of all matching roompies based on your preferences
            </p>
          </div>

          {/* favorited roompies list */}
          <div className="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
            <div className="px-4 sm:inline-flex sm:pt-2 sm:pb-8">
              {data?.matchRoompies.length > 0 ? (
                (data.matchRoompies as Roompies).map((roompy, i) => (
                  <div
                    key={roompy.id}
                    className={`${
                      i > 0 ? 'mt-10 sm:ml-4' : ''
                    } sm:mt-0 sm:w-80 sm:flex-shrink-0 relative`}
                  >
                    <Link href={`/roompies/${roompy.id}`}>
                      <RoompyCard2 roompy={roompy} />
                    </Link>
                  </div>
                ))
              ) : (
                <h3 className="mt-6 font-bold">
                  {data?.havePostedRoompies
                    ? 'No matches found'
                    : "You don't have any posted Roompies yet"}
                </h3>
              )}

              {error ? 'Error fetching data' : !data && 'Loading...'}
            </div>
          </div>
        </div>

        {/* favorited rooms */}
        <div className="pl-2 mt-6">
          <div className="px-4">
            <h3 className="text-2xl italic font-bold text-pink-500">Rooms</h3>

            <p className="text-sm italic text-gray-600">
              List of all matching roompies based on your preferences
            </p>
          </div>

          {/* favorited rooms list */}
          <div className="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
            <div className="px-4 sm:inline-flex sm:pt-2 sm:pb-8">
              {data?.matchRoompies.length > 0 ? (
                (data.matchRoompies as Roompies).map((roompy, i) => (
                  <div
                    key={roompy.id}
                    className={`${
                      i > 0 ? 'mt-10 sm:ml-4' : ''
                    } sm:mt-0 sm:w-80 sm:flex-shrink-0`}
                  >
                    <Link href={`/roompies/${roompy.id}`}>
                      <RoompyCard2 roompy={roompy} />
                    </Link>
                  </div>
                ))
              ) : (
                <h3 className="mt-6 font-bold">
                  {data?.havePostedRoompies
                    ? 'No matches found'
                    : "You don't have any posted Roompies yet"}
                </h3>
              )}

              {error ? 'Error fetching data' : !data && 'Loading...'}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
