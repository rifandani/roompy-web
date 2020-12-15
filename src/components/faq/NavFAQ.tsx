import { useState } from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import Jump from 'react-reveal/Jump';

const NavFAQ = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <main className="h-full lg:min-h-screen relative bg-white overflow-hidden">
      {/* nav and hero content */}
      <article className="lg:h-screen max-w-screen-xl mx-auto">
        <div className="lg:h-full relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 mb-10 lg:mb-0">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          {/* Nav menu di lg screen */}
          <section className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <a>
                      {/* logo */}
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="favicon.ico"
                        alt="Primary Logo"
                      />
                    </a>
                  </Link>

                  <div className="-mr-2 flex items-center md:hidden">
                    {/* burger icon button */}
                    <button
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-500 hover:bg-indigo-200 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                      onClick={() => setToggleMenu((prevState) => !prevState)}
                    >
                      <svg
                        className="h-6 w-6"
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
                <Link href="/search">
                  <a className="font-medium text-gray-500 hover:text-gray-900">
                    Search
                  </a>
                </Link>
                <Link href="/about">
                  <a className="ml-8 font-medium text-gray-500 hover:text-gray-900">
                    About
                  </a>
                </Link>
                <Link href="/faq">
                  <a className="ml-8 font-medium text-gray-500 hover:text-gray-900">
                    FAQ
                  </a>
                </Link>
                <Link href="/login">
                  <a className="ml-8 font-medium text-purple-500 hover:text-purple-700">
                    Login
                  </a>
                </Link>
              </div>
            </nav>
          </section>

          {/* <!--  Mobile menu, show/hide based on menu open state.  --> */}
          <section
            className={`top-0 inset-x-0 p-2 transform origin-top-right md:hidden ${
              toggleMenu ? 'absolute' : 'hidden'
            }`}
          >
            <Jump spy={toggleMenu} duration={500}>
              <div className="rounded-lg shadow-md">
                <div className="rounded-lg bg-white shadow-xs overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      {/* logo */}
                      <img
                        className="h-8 w-auto"
                        src="favicon.ico"
                        alt="Logo official"
                      />
                    </div>
                    <div className="-mr-2">
                      {/* x icon button */}
                      <button
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-200 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                        onClick={() => setToggleMenu((prevState) => !prevState)}
                      >
                        <svg
                          className="h-6 w-6"
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
                    <Link href="/search">
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50">
                        Search
                      </a>
                    </Link>
                    <Link href="/about">
                      <a className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50">
                        About
                      </a>
                    </Link>
                    <Link href="/faq">
                      <a className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50">
                        FAQ
                      </a>
                    </Link>
                  </div>

                  <div>
                    <Link href="/search">
                      <a
                        href="/"
                        className="block w-full px-5 py-3 text-center font-medium text-purple-500 bg-gray-50 hover:bg-purple-100 hover:text-purple-700 focus:outline-none focus:bg-gray-100 focus:text-purple-700"
                      >
                        Login
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Jump>
          </section>

          {/* hero header */}
          <section className="lg:h-full mx-auto max-w-screen-xl pt-10 mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 lg:pt-20 xl:pt-16">
            <div className="sm:text-center lg:text-left">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                We learn about life through
                <br className="xl:hidden" />
                <span className="text-purple-700"> Questions</span>
              </h2>

              <p className="mt-5 sm:text-lg md:text-xl sm:max-w-xl sm:mx-auto lg:mx-0 italic text-base text-gray-500">
                Bertanya membuatmu menjadi lebih
                <span className="text-purple-700"> bijak</span>
              </p>

              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/rooms/create">
                    <a className="w-full flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10 text-base leading-6 font-medium rounded-md focus:outline-none text-white bg-purple-700 hover:bg-purple-100 hover:text-purple-700 border border-transparent">
                      Baca blog kami
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* hero image */}
      <article className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Fade left>
          <img
            className="object-cover h-full hidden lg:flex"
            src="https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"
            alt="Question Marks Cover"
          />
        </Fade>
      </article>
    </main>
  );
};

export default NavFAQ;
