import Link from 'next/link';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Teams() {
  return (
    <>
      <section className="relative w-full py-20 overflow-hidden">
        <div className="container max-w-screen-xl min-h-full mx-auto">
          <section className="flex flex-col w-full mb-10 text-center">
            <h2 className="px-8 pt-6 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl sm:leading-none xl:max-w-screen-xl">
              Our
              <span className="text-purple-700"> Teams</span>
            </h2>

            <p className="px-8 mt-5 text-base italic text-center text-gray-500 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 xl:max-w-screen-xl">
              Karena setiap kontribusi dan partisipasi itu penting di
              <span className="text-purple-700"> Roompy</span>
            </p>
          </section>

          <section className="flex-wrap items-center content-center lg:flex lg:justify-center lg:items-center">
            {/* team #1 */}
            <div className="flex items-center justify-center p-4 lg:w-1/2">
              <div className="flex flex-col items-center justify-center h-full text-center sm:flex-row sm:justify-start sm:text-left">
                <img
                  className="flex-shrink-0 object-cover object-center w-48 h-48 mb-4 rounded-lg sm:mb-0"
                  alt="rifandani foto"
                  src="rifandani.jpg"
                />

                <div className="flex-grow sm:pl-8">
                  <h2 className="text-lg font-medium text-gray-900 title-font">
                    Rifandani
                  </h2>

                  <h3 className="mb-3 text-gray-500">Web Developer</h3>

                  <p className="mb-4">A man who stands for nothing.</p>

                  <span className="inline-flex">
                    <Link href="/">
                      <a className="text-blue-500 transition duration-500 transform cursor-pointer hover:scale-125">
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                    </Link>

                    <Link href="/">
                      <a className="ml-2 text-red-500 transition duration-500 transform cursor-pointer hover:scale-125">
                        <FaInstagram className="w-5 h-5" />
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            {/* team #2 */}
            <div className="flex items-center justify-center p-4 lg:w-1/2">
              <div className="flex flex-col items-center justify-center h-full text-center sm:flex-row sm:justify-start sm:text-left">
                <img
                  alt="foto matuff"
                  className="flex-shrink-0 object-cover object-center w-48 h-48 mb-4 rounded-lg sm:mb-0"
                  src="matuff.png"
                />

                <div className="flex-grow sm:pl-8">
                  <h2 className="text-lg font-medium text-gray-900 title-font">
                    Matuff
                  </h2>

                  <h3 className="mb-3 text-gray-500">Android Developer</h3>

                  <p className="mb-4">A man who stands for nothing.</p>

                  <span className="inline-flex">
                    <Link href="/">
                      <a className="text-blue-500 transition duration-500 transform cursor-pointer hover:scale-125">
                        <FaLinkedin className="w-5 h-5 cursor" />
                      </a>
                    </Link>

                    <Link href="/">
                      <a className="ml-2 text-red-500 transition duration-500 transform cursor-pointer hover:scale-125">
                        <FaInstagram className="w-5 h-5" />
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
