import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'
import { JackInTheBox } from 'react-awesome-reveal'
// files
import UserContext from 'contexts/UserContext'
import { auth } from 'configs/firebaseConfig'

const NavPricing = (): JSX.Element => {
  // hooks
  const { user } = useContext(UserContext)
  const [toggleMenu, setToggleMenu] = useState(false)

  async function logout(): Promise<void> {
    try {
      // logout from firebase auth di client-side, biar UserContext/useAuth ke trigger
      await auth.signOut()

      // delete cookie from the server
      await axios.get('/auth/logout')

      // success
      toast('Logout success')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <main className="relative h-full overflow-hidden bg-white lg:min-h-screen">
      {/* nav and hero content */}
      <article className="max-w-screen-xl mx-auto lg:h-screen">
        <div className="relative z-10 pb-8 mb-10 bg-white lg:h-full sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 lg:mb-0">
          <svg
            className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          {/* Nav menu di lg screen */}
          <section className="relative px-4 pt-6 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <a>
                      {/* logo */}
                      <img
                        className="w-auto h-8 sm:h-10"
                        src="favicon.ico"
                        alt="Primary Logo"
                      />
                    </a>
                  </Link>

                  <div className="flex items-center -mr-2 md:hidden">
                    {/* burger icon button */}
                    <button
                      className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:text-indigo-500 hover:bg-indigo-200 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                      onClick={() => setToggleMenu((prevState) => !prevState)}
                    >
                      <svg
                        className="w-6 h-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* nav hidden when small screen */}
              <div className="hidden md:block md:ml-10 md:pr-4">
                <Link href="/roompies">
                  <a className="font-medium text-gray-500 hover:text-gray-900">
                    Roompies
                  </a>
                </Link>

                <Link href="/rooms">
                  <a className="ml-8 font-medium text-gray-500 hover:text-gray-900">
                    Rooms
                  </a>
                </Link>

                {user && (
                  <Link href="/dashboard">
                    <a className="ml-8 font-medium text-gray-500 hover:text-gray-900">
                      Dashboard
                    </a>
                  </Link>
                )}

                {user ? (
                  <span
                    onClick={logout}
                    className="p-2 ml-6 font-medium text-red-700 bg-red-100 rounded-md cursor-pointer hover:text-white hover:bg-red-700"
                  >
                    Logout
                  </span>
                ) : (
                  <Link href="/login">
                    <a className="p-2 ml-6 font-medium text-purple-700 bg-purple-100 rounded-md hover:text-white hover:bg-purple-700">
                      Login
                    </a>
                  </Link>
                )}
              </div>
            </nav>
          </section>

          {/* <!--  Mobile menu, show/hide based on menu open state.  --> */}
          <section
            className={`top-0 inset-x-0 p-2 transform origin-top-right md:hidden ${
              toggleMenu ? 'absolute' : 'hidden'
            }`}
          >
            <JackInTheBox duration={500}>
              <div className="rounded-lg shadow-md">
                <div className="overflow-hidden bg-white rounded-lg shadow-xs">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <div>
                      {/* logo */}
                      <img
                        className="w-auto h-8"
                        src="favicon.ico"
                        alt="Logo official"
                      />
                    </div>
                    <div className="-mr-2">
                      {/* x icon button */}
                      <button
                        className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-red-500 hover:bg-red-200 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                        onClick={() => setToggleMenu((prevState) => !prevState)}
                      >
                        <svg
                          className="w-6 h-6"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="px-2 pt-2 pb-3">
                    <Link href="/roompies">
                      <a className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50">
                        Roompies
                      </a>
                    </Link>

                    <Link href="/rooms">
                      <a className="block px-3 py-2 mt-1 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50">
                        Rooms
                      </a>
                    </Link>

                    {user && (
                      <Link href="/dashboard">
                        <a className="block px-3 py-2 mt-1 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50">
                          Dashboard
                        </a>
                      </Link>
                    )}
                  </div>

                  <div>
                    {user ? (
                      <span
                        onClick={logout}
                        className="block w-full px-5 py-3 font-medium text-center text-red-500 cursor-pointer bg-gray-50 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:bg-gray-100 focus:text-red-700"
                      >
                        Logout
                      </span>
                    ) : (
                      <Link href="/login">
                        <a className="block w-full px-5 py-3 font-medium text-center text-purple-500 bg-gray-50 hover:bg-purple-100 hover:text-purple-700 focus:outline-none focus:bg-gray-100 focus:text-purple-700">
                          Login
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </JackInTheBox>
          </section>

          {/* hero header */}
          <section className="max-w-screen-xl px-4 pt-10 mx-auto mt-10 lg:h-full sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 lg:pt-20 xl:pt-16">
            <div className="sm:text-center lg:text-left">
              <h2 className="mt-16 text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                Affordable
                <br className="xl:hidden" />
                <span className="text-purple-700"> Pricing</span>
              </h2>

              <p className="mt-5 text-base italic text-gray-500 sm:text-lg md:text-xl sm:max-w-xl sm:mx-auto lg:mx-0">
                Pricing yang fleksibel menjangkau semua kebutuhan
                <span className="text-purple-700"> anda</span>
              </p>

              {/* <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/rooms/create">
                    <a className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white bg-purple-700 border border-transparent rounded-md md:py-4 md:text-lg md:px-10 focus:outline-none hover:bg-purple-100 hover:text-purple-700">
                      Read More
                    </a>
                  </Link>
                </div>
              </div> */}
            </div>
          </section>
        </div>
      </article>

      {/* hero image */}
      <article className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="hidden object-cover h-full lg:flex"
          src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Question Marks Cover"
        />
      </article>
    </main>
  )
}

export default NavPricing
