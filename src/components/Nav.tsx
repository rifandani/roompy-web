import { useState } from 'react';

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <main className="relative bg-white overflow-hidden">
      {/* nav and hero content */}
      <article className="max-w-screen-xl mx-auto">
        <div className="relative z-10 pb-6 bg-white lg:max-w-2xl lg:w-full">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <section className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="/">
                    {/* logo */}
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="favicon.ico"
                      alt="Primary Logo"
                    />
                  </a>
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* nav hidden when small screen */}
              <div className="hidden md:block md:ml-10 md:pr-4">
                <a
                  href="/"
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  Product
                </a>
                <a
                  href="/"
                  className="ml-8 font-medium text-gray-500 hover:text-gray-900"
                >
                  Features
                </a>
                <a
                  href="/"
                  className="ml-8 font-medium text-gray-500 hover:text-gray-900"
                >
                  Marketplace
                </a>
                <a
                  href="/"
                  className="ml-8 font-medium text-gray-500 hover:text-gray-900"
                >
                  Company
                </a>
                <a
                  href="/"
                  className="ml-8 font-medium text-indigo-600 hover:text-indigo-900"
                >
                  Log in
                </a>
              </div>
            </nav>
          </section>

          {/* <!--  Mobile menu, show/hide based on menu open state.  --> */}
          <section
            className={`top-0 inset-x-0 p-2 transform origin-top-right md:hidden ${
              toggleMenu ? 'absolute' : 'hidden'
            }`}
          >
            <div className="rounded-lg shadow-md">
              <div className="rounded-lg bg-white shadow-xs overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    {/* logo */}
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                      alt=""
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3">
                  <a
                    href="/"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                  >
                    Product
                  </a>
                  <a
                    href="/"
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="/"
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="/"
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-indigo-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
};

export default Nav;
