import Link from 'next/link';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Teams() {
  return (
    <>
      <section className="py-20 relative w-full overflow-hidden">
        <div className="min-h-full max-w-screen-xl mx-auto container">
          <section className="flex flex-col text-center w-full mb-10">
            <h2 className="px-8 pt-6 text-4xl sm:text-5xl md:text-6xl tracking-tight leading-10 sm:leading-none font-extrabold text-center xl:max-w-screen-xl text-gray-900">
              Our
              <span className="text-purple-700"> Teams</span>
            </h2>

            <p className="px-8 mt-5 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 italic text-base text-center xl:max-w-screen-xl text-gray-500">
              Karena setiap kontribusi dan partisipasi itu penting di
              <span className="text-purple-700"> Roompy</span>
            </p>
          </section>

          <section className="content-center lg:flex lg:justify-center items-center lg:items-center flex-wrap">
            {/* team #1 */}
            <div className="p-4 lg:w-1/2 flex justify-center items-center">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  alt="rifandani foto"
                  src="rifandani.jpg"
                />

                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    Rifandani
                  </h2>

                  <h3 className="text-gray-500 mb-3">Web Developer</h3>

                  <p className="mb-4">A man who stands for nothing.</p>

                  <span className="inline-flex">
                    <Link href="/">
                      <a className="text-blue-500 transform transition duration-500 hover:scale-125 cursor-pointer">
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                    </Link>

                    <Link href="/">
                      <a className="ml-2 text-red-500 transform transition duration-500 hover:scale-125 cursor-pointer">
                        <FaInstagram className="w-5 h-5" />
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            {/* team #2 */}
            <div className="p-4 lg:w-1/2 flex justify-center items-center">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="foto matuff"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="matuff.png"
                />

                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    Matuff
                  </h2>

                  <h3 className="text-gray-500 mb-3">Android Developer</h3>

                  <p className="mb-4">A man who stands for nothing.</p>

                  <span className="inline-flex">
                    <Link href="/">
                      <a className="text-blue-500 transform transition duration-500 hover:scale-125 cursor-pointer">
                        <FaLinkedin className="w-5 h-5 cursor" />
                      </a>
                    </Link>

                    <Link href="/">
                      <a className="ml-2 text-red-500 transform transition duration-500 hover:scale-125 cursor-pointer">
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
