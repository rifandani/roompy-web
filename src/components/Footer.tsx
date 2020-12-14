import Link from 'next/link';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-4 pt-12 mt-16  block bg-gray-100 relative">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: 80, transform: 'translateZ(0px)' }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-100 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="px-4 max-w-screen-xl mx-auto container">
        <div className="flex flex-wrap">
          <section className="w-full lg:w-6/12 px-4">
            <div className="flex items-center">
              <img className="h-8 w-auto sm:h-10" src="favicon.ico" />
              <h4 className="ml-2 text-2xl font-semibold text-purple-700">
                Roompy
              </h4>
            </div>

            <h5 className="my-2 italic text-base text-gray-500">
              A free platform to connect and find roommate.
            </h5>

            <div className="mt-6">
              <Link href="/">
                <a href="https://www.facebook.com/creativetim" target="_blank">
                  <FaFacebook className="mr-2 shadow-lg text-3xl items-center justify-center align-center rounded-full outline-none text-blue-500 inline-block text-center transform transition duration-500 focus:outline-none hover:scale-125" />
                </a>
              </Link>
              <Link href="/">
                <a href="https://www.dribbble.com/creativetim" target="_blank">
                  <FaInstagram className="mr-2 shadow-lg text-3xl items-center justify-center align-center rounded-full outline-none text-pink-500 inline-block text-center transform transition duration-500 focus:outline-none hover:scale-125" />
                </a>
              </Link>
            </div>

            {/* <p className="text-sm mt-6 text-gray-600 font-semibold">
              Created with 💗
            </p> */}
          </section>

          <section className="w-full lg:w-6/12 mt-3 lg:mt-0">
            <div className="flex flex-wrap items-top mb-6 mt-3 lg:mt-0">
              {/* useful links */}
              <section className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-sm font-semibold mb-2 text-purple-700">
                  Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/search">
                      <a className="text-gray-500 hover:text-gray-900 font-semibold block pb-2 text-sm">
                        Search
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing">
                      <a className="text-gray-500 hover:text-gray-900 font-semibold block pb-2 text-sm">
                        Pricing
                      </a>
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/blog">
                      <a className="text-gray-500 hover:text-gray-900 font-semibold block pb-2 text-sm">
                        Blog
                      </a>
                    </Link>
                  </li> */}
                  <li>
                    <Link href="/faq">
                      <a className="text-gray-500 hover:text-gray-900 font-semibold block pb-2 text-sm">
                        FAQ
                      </a>
                    </Link>
                  </li>
                </ul>
              </section>

              {/* Company */}
              <section className="w-full lg:w-4/12 px-4 mt-3 lg:mt-0">
                <span className="block uppercase text-sm font-semibold mb-2 text-purple-700">
                  Company
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/about">
                      <a className="text-gray-500 hover:text-gray-900 font-semibold block pb-2 text-sm">
                        About
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a className="text-gray-500 hover:text-gray-900 font-semibold block pb-2 text-sm">
                        Contact
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a className="text-gray-500 hover:text-gray-900 font-semibold block pb-2 text-sm">
                        Privacy Policy
                      </a>
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </section>
        </div>

        <hr className="my-4 border-gray-500" />

        <section className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              {new Date().getFullYear()} -{' '}
              <span className="text-purple-700">Roompy</span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
