import { Zoom } from 'react-awesome-reveal'
import { FcImport, FcGlobe, FcCameraIdentification } from 'react-icons/fc'

export default function Steps(): JSX.Element {
  return (
    <div className="relative w-full py-20 overflow-hidden bg-white">
      <main className="container max-w-screen-xl min-h-full mx-auto">
        <h2 className="px-8 pt-6 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl sm:leading-none lg:text-left xl:max-w-screen-xl">
          How to Join
          <span className="text-purple-700"> Roompy</span>?
        </h2>

        <p className="px-8 mt-5 text-base italic text-center text-gray-500 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 lg:text-left xl:max-w-screen-xl">
          Ikuti langkah berikut untuk bergabung di komunitas
          <span className="text-purple-700"> Roompy</span>
        </p>

        <Zoom direction="left" triggerOnce>
          <article className="content-center lg:flex lg:justify-center lg:items-center">
            <section className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8">
              <div className="relative w-64 h-48">
                <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                  <div className="w-1/3 h-40"></div>
                  <div className="w-2/3 h-32 pr-4">
                    <h3 className="pt-1 text-xl font-bold text-pink-500">
                      Register
                    </h3>
                    <p className="pt-1 text-sm italic text-gray-500">
                      Daftarkan akun anda hanya dalam beberapa detik saja
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                  <FcImport className="text-3xl" />
                </div>
                <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-pink-500 rounded-lg">
                  01
                </div>
                <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-pink-500"></div>
              </div>
            </section>

            <section className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8">
              <div className="relative w-64 h-48">
                <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                  <div className="w-1/3 h-40"></div>
                  <div className="w-2/3 h-32 pr-4">
                    <h3 className="pt-1 text-xl font-bold text-blue-500">
                      Share
                    </h3>
                    <p className="pt-1 text-sm italic text-gray-500">
                      Submit wanted profile/room anda secara gratis
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                  <FcGlobe className="text-3xl" />
                </div>
                <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-blue-500 rounded-lg">
                  02
                </div>
                <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-blue-500"></div>
              </div>
            </section>

            <section className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8">
              <div className="relative w-64 h-48">
                <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                  <div className="w-1/3 h-40"></div>
                  <div className="w-2/3 h-32 pr-4">
                    <h3 className="pt-1 text-xl font-bold text-purple-500">
                      Find
                    </h3>
                    <p className="pt-1 text-sm italic text-gray-500">
                      Cari wanted profile/room yang anda inginkan
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                  <FcCameraIdentification className="text-3xl" />
                </div>
                <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-purple-500 rounded-lg">
                  03
                </div>
                <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-purple-500"></div>
              </div>
            </section>
          </article>
        </Zoom>
      </main>
    </div>
  )
}
