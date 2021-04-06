import Link from 'next/link'
import { FaGooglePlay } from 'react-icons/fa'

export default function CTA() {
  return (
    <article className="relative block pb-10 mt-16 bg-white">
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
            className="text-white fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="flex items-center justify-center px-8 py-5 min-w-screen ">
        <div className="relative flex flex-col items-center w-full max-w-6xl px-4 py-8 mx-auto text-center rounded-lg sm:px-6 md:pb-0 md:pt-4 lg:px-12 lg:py-12 lg:text-left lg:block bg-gradient-to-br from-purple-700 via-indigo-500 to-teal-300">
          <h2 className="my-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:my-0 xl:text-4xl sm:leading-tight">
            Ingin coba versi{' '}
            <span className="block text-indigo-200 xl:inline">
              androidnya ?
            </span>
          </h2>

          <p className="mt-2 mb-10 text-sm font-medium text-indigo-200 uppercase xl:text-base xl:tracking-wider lg:mb-0">
            Download sekarang!
          </p>

          {/* tombol download */}
          <div className="flex items-center mb-8 lg:mt-6 lg:mb-0 ">
            <div className="inline-flex items-center justify-center p-5 text-purple-700 bg-purple-100 border border-transparent rounded-md cursor-pointer focus:outline-none focus:shadow-outline hover:text-white hover:bg-purple-700">
              <FaGooglePlay className="mr-3 text-3xl" />

              <Link href="/">
                <a className="inline-flex items-center justify-center text-base font-medium">
                  Playstore
                </a>
              </Link>
            </div>
          </div>

          {/* gambar */}
          <div className="bottom-0 right-0 mb-0 mr-3 lg:absolute lg:-mb-12">
            <img
              src="cta.png"
              className="hidden max-w-md mb-4 opacity-75 lg:flex xl:mb-0"
            />
          </div>
        </div>
      </div>
    </article>
  )
}
