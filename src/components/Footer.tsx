import Link from 'next/link';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer({ footer2 }: { footer2?: boolean }) {
  return (
    <footer className="relative block py-4 pt-12 mt-16 bg-gray-100">
      <div
        className="absolute top-0 left-0 right-0 bottom-auto w-full -mt-20 overflow-hidden pointer-events-none"
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

      <div className="container max-w-screen-xl px-4 mx-auto">
        <div className="flex flex-wrap">
          <section className="w-full px-4 lg:w-6/12">
            {/* logo image */}
            <div className="flex items-center">
              <img
                className="w-auto h-8 sm:h-10"
                src={footer2 ? '/favicon.ico' : 'favicon.ico'}
              />

              <h4 className="ml-2 text-2xl font-semibold text-purple-700">
                Roompy
              </h4>
            </div>

            <h5 className="my-2 text-base italic text-gray-500">
              A free platform to connect and find roommate.
            </h5>

            <div className="mt-6">
              <a
                href="https://www.facebook.com/ipan.dns"
                target="_blank"
                rel="noopener"
              >
                <FaFacebook className="items-center justify-center inline-block mr-2 text-3xl text-center text-blue-500 transition duration-500 transform rounded-full shadow-lg outline-none align-center focus:outline-none hover:scale-125" />
              </a>

              <a
                href="https://www.instagram.com/3richkey"
                target="_blank"
                rel="noopener"
              >
                <FaInstagram className="items-center justify-center inline-block mr-2 text-3xl text-center text-pink-500 transition duration-500 transform rounded-full shadow-lg outline-none align-center focus:outline-none hover:scale-125" />
              </a>
            </div>
          </section>

          <section className="w-full mt-3 lg:w-6/12 lg:mt-0">
            <div className="flex flex-wrap mt-3 mb-6 items-top lg:mt-0">
              {/* useful links */}
              <section className="w-full px-4 ml-auto lg:w-4/12">
                <span className="block mb-2 text-sm font-semibold text-purple-700 uppercase">
                  Resources
                </span>

                <ul className="list-unstyled">
                  <li>
                    <Link href="/pricing">
                      <a className="block pb-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
                        Pricing
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq">
                      <a className="block pb-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
                        FAQ
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog">
                      <a className="block pb-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
                        Blog
                      </a>
                    </Link>
                  </li>
                </ul>
              </section>

              {/* Website */}
              <section className="w-full px-4 mt-3 lg:w-4/12 lg:mt-0">
                <span className="block mb-2 text-sm font-semibold text-purple-700 uppercase">
                  Website
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/about">
                      <a className="block pb-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
                        About
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms">
                      <a className="block pb-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
                        Terms of Use
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a className="block pb-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
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

        <section className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full px-4 mx-auto text-center md:w-4/12">
            <div className="py-1 text-sm font-semibold text-gray-500">
              © {new Date().getFullYear()} -{' '}
              <span className="text-purple-700">Roompy</span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
