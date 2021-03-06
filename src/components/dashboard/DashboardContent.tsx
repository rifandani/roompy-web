import useSWR from 'swr'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { MdTimelapse } from 'react-icons/md'
import { FaCrown, FaShoppingCart, FaUserPlus, FaDoorOpen } from 'react-icons/fa'
// files
import { DashboardProps } from 'pages/dashboard'
import { Roompy } from 'utils/interfaces'

interface APIResponsePostedRoompies {
  error: boolean
  postedRoompies: Roompy[]
  havePostedRoompies: boolean
}

function NoListings({ color }: { color: string }) {
  return (
    <div className="w-full p-6 md:w-1/2 xl:w-1/3">
      <div
        className={`from-${color}-200 to-${color}-100 border-${color}-500 p-5 border-b-4 rounded-lg shadow-xl bg-gradient-to-b`}
      >
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <div className={`bg-${color}-500 p-4 rounded-full`}>
              <i className="fas fa-server fa-2x fa-inverse"></i>
            </div>
          </div>

          <div className="flex-1 text-right md:text-center">
            <h5 className="italic font-bold text-gray-500 uppercase">
              Total Listings
            </h5>

            <h3 className="text-2xl font-bold">0</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardContent({
  dbUser,
}: DashboardProps): JSX.Element {
  // hooks
  const { push } = useRouter()
  const { data } = useSWR<APIResponsePostedRoompies>(
    `/posted/roompies?userId=${dbUser.id}`
  )

  function onCreateRoompies() {
    // check if the 'dbUser' is premium / postedRoompies less than 1, then can upload more than 1 post
    if (dbUser?.postedRoompies.length < 1 || dbUser?.premium) {
      return push('/dashboard/roompies/create')
    } else {
      return toast.warning(
        'Sorry, free dbUser can only create 1 roompies. Please, extend your subscription plan.'
      )
    }
  }

  function onCreateRooms() {
    toast('Coming soon')
  }

  return (
    <main className="flex-1 pb-24 mt-12 bg-gray-100 md:mt-2 md:pb-5">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-purple-700 to-gray-800">
          <h3 className="pl-2 font-bold">Dashboard</h3>
        </div>
      </div>

      {/* subscription */}
      <div className="flex flex-wrap items-center justify-between w-full pt-4">
        <h6 className="pl-6 text-2xl italic font-bold text-yellow-500">
          Subscription
        </h6>

        <button
          className="flex items-center p-2 mt-2 ml-6 mr-6 transition duration-500 transform border-2 border-yellow-500 rounded-lg hover:scale-125 md:ml-0 md:mt-0 bg-yellow-50 focus:ring-4 focus:outline-none focus:ring-yellow-300"
          onClick={() => push('/dashboard/subscribe')}
        >
          <FaShoppingCart className="mr-2 text-lg text-yellow-500" />

          <p className="flex-grow font-bold text-gray-900">Upgrade</p>
        </button>
      </div>

      {/* subscription cards */}
      <div className="flex flex-wrap">
        <div className="w-full p-6 md:w-1/2 xl:w-1/3">
          <div
            className={`${
              dbUser.premium
                ? 'border-yellow-500 from-yellow-200 to-yellow-100'
                : 'border-gray-500 from-gray-200 to-gray-100'
            } p-5 border-b-4 rounded-lg shadow-xl bg-gradient-to-b`}
          >
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-4 bg-yellow-500 rounded-full">
                  <FaCrown className="text-2xl text-white" />
                </div>
              </div>

              <div className="flex-1 text-right md:text-center">
                <h5 className="italic font-bold text-gray-500 uppercase">
                  Status
                </h5>

                <h3 className="text-2xl font-bold">
                  {dbUser.premium ? 'Premium User' : 'Free User'}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-6 md:w-1/2 xl:w-1/3">
          <div
            className={`${
              dbUser.premium
                ? 'border-yellow-500 from-yellow-200 to-yellow-100'
                : 'border-gray-500 from-gray-200 to-gray-100'
            } p-5 border-b-4 rounded-lg shadow-xl bg-gradient-to-b`}
          >
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-4 bg-yellow-500 rounded-full">
                  <MdTimelapse className="text-2xl text-white" />
                </div>
              </div>

              <div className="flex-1 text-right md:text-center">
                <h5 className="italic font-bold text-gray-500 uppercase">
                  Expiry
                </h5>

                <h3 className="text-2xl font-bold">
                  {dbUser.premiumUntil === 0
                    ? '-'
                    : new Date(dbUser.premiumUntil).toLocaleDateString(
                        'en-GB',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        }
                      )}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* roompies listings */}
        <div className="flex flex-wrap items-center justify-between w-full pt-4">
          <h6 className="pl-6 text-2xl italic font-bold text-purple-500">
            Roompies Listings
          </h6>

          <button
            className="flex items-center p-2 mt-2 ml-6 mr-6 transition duration-500 transform border-2 border-purple-500 rounded-lg hover:scale-125 md:ml-0 md:mt-0 bg-purple-50 focus:ring-4 focus:outline-none focus:ring-purple-300"
            onClick={onCreateRoompies}
          >
            <FaUserPlus className="mr-2 text-lg text-purple-500" />

            <p className="flex-grow font-bold text-gray-900">Create Roompies</p>
          </button>
        </div>

        {/* roompies cards */}
        {data?.postedRoompies.length > 0 ? (
          data.postedRoompies.map((roompy) => (
            <Link
              key={roompy.id}
              href={`/dashboard/roompies/edit/${roompy.id}`}
            >
              <a className="w-full p-6 transition duration-500 transform cursor-pointer md:w-1/2 xl:w-1/3 hover:scale-110">
                <div className="p-5 border-b-4 border-purple-500 rounded-lg shadow-xl bg-gradient-to-b from-purple-200 to-purple-100">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className="">
                        <img
                          className="rounded-full w-14 h-14"
                          src={roompy.photoURL || '/unknown-user-circle.png'}
                          alt={roompy.name}
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-right md:text-center">
                      <h5 className="italic font-bold text-gray-500 uppercase">
                        {roompy.name}
                      </h5>

                      <h3 className="text-2xl font-bold">
                        {new Date(roompy.createdAt).toLocaleDateString(
                          'en-GB',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))
        ) : (
          <NoListings color="purple" />
        )}

        {/* Rooms listings */}
        <div className="flex flex-wrap items-center justify-between w-full pt-4">
          <h6 className="pl-6 text-2xl italic font-bold text-pink-500">
            Rooms Listings
          </h6>

          <button
            className="flex items-center p-2 mt-2 ml-6 mr-6 transition duration-500 transform border-2 border-pink-500 rounded-lg hover:scale-125 md:ml-0 md:mt-0 bg-pink-50 focus:ring-4 focus:outline-none focus:ring-pink-300"
            onClick={onCreateRooms}
          >
            <FaDoorOpen className="mr-2 text-lg text-pink-500" />

            <p className="flex-grow font-bold text-gray-900">Create Rooms</p>
          </button>
        </div>

        {/* Rooms cards */}
        <NoListings color="pink" />
      </div>
    </main>
  )
}
