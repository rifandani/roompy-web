import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'
import { JackInTheBox } from 'react-awesome-reveal'
import {
  HiOutlineMenu,
  HiOutlineUsers,
  HiOutlineHome,
  HiX,
} from 'react-icons/hi'
// files
import UserContext from 'contexts/UserContext'
import { auth } from 'configs/firebaseConfig'

export default function Nav(): JSX.Element {
  // hooks
  const { user } = useContext(UserContext)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  async function logout() {
    try {
      // logout from firebase auth di client-side, biar UserContext/useAuth ke trigger
      await auth.signOut()

      // delete cookie from server
      await axios.get('/auth/logout')

      // success
      toast('Logout success')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    // <!-- This example requires Tailwind CSS v2.0+ -->
    <div className="relative w-full bg-white">
      <section className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10">
          <section className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                {/* logo */}
                <img
                  className="w-auto h-8 sm:h-10"
                  src="/favicon.ico"
                  alt="Roompy Logo"
                />
              </a>
            </Link>
          </section>

          <section className="-my-2 -mr-2 md:hidden">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open menu</span>

              <HiOutlineMenu className="w-6 h-6" />
            </button>
          </section>

          <nav className="hidden space-x-10 md:flex">
            <Link href="/roompies">
              <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                Roompies
              </a>
            </Link>

            <Link href="/rooms">
              <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                Rooms
              </a>
            </Link>
          </nav>

          {/* conditional if there is logged in user */}
          <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            {user ? (
              <>
                <Link href="/dashboard">
                  <a className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900">
                    Dashboard
                  </a>
                </Link>

                <span
                  onClick={logout}
                  className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-red-700 bg-red-100 border border-transparent rounded-md cursor-pointer whitespace-nowrap hover:text-white hover:bg-red-700"
                >
                  Logout
                </span>
              </>
            ) : (
              <Link href="/login">
                <a className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-purple-700 bg-purple-100 border border-transparent rounded-md whitespace-nowrap hover:text-white hover:bg-purple-700">
                  Login
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Mobile menu, show/hide based on mobile menu state */}
      <section
        className={`${
          openMenu ? 'absolute' : 'hidden'
        } z-20 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden`}
      >
        <JackInTheBox duration={500}>
          <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
            <section className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  {/* logo */}
                  <img
                    className="w-auto h-8"
                    src="/favicon.ico"
                    alt="Roompy Logo"
                  />
                </div>

                <div className="-mr-2">
                  <button
                    onClick={() => setOpenMenu((prev) => !prev)}
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                  >
                    <span className="sr-only">Close menu</span>

                    <HiX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link href="/roompies">
                    <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-200">
                      <HiOutlineUsers className="flex-shrink-0 w-6 h-6 text-purple-500" />

                      <span className="ml-3 text-base font-medium text-gray-700 hover:text-gray-900">
                        Roompies
                      </span>
                    </a>
                  </Link>

                  <Link href="/rooms">
                    <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-200">
                      <HiOutlineHome className="flex-shrink-0 w-6 h-6 text-purple-500" />

                      <span className="ml-3 text-base font-medium text-gray-700 hover:text-gray-900">
                        Rooms
                      </span>
                    </a>
                  </Link>
                </nav>
              </div>
            </section>

            <section className="px-5 py-6 space-y-6">
              <div>
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <a className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-purple-700 bg-purple-100 border border-transparent rounded-md hover:text-white hover:bg-purple-700">
                        Dashboard
                      </a>
                    </Link>

                    <span
                      onClick={logout}
                      className="flex items-center justify-center w-full px-4 py-2 mt-3 text-base font-medium text-red-700 bg-red-100 border border-transparent rounded-md cursor-pointer hover:text-white hover:bg-red-700"
                    >
                      Logout
                    </span>
                  </>
                ) : (
                  <Link href="/login">
                    <a className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-purple-700 bg-purple-100 border border-transparent rounded-md shadow-sm hover:bg-purple-700 hover:text-white">
                      Login
                    </a>
                  </Link>
                )}
              </div>
            </section>
          </div>
        </JackInTheBox>
      </section>
    </div>
  )
}
