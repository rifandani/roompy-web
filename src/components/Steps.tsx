import { FcImport, FcGlobe, FcCameraIdentification } from 'react-icons/fc';

export default function Steps() {
  return (
    <div className="w-full py-20 relative overflow-hidden bg-white">
      <main className="min-h-full max-w-screen-xl mx-auto container">
        <h2 className="px-8 pt-6 text-4xl sm:text-5xl md:text-6xl tracking-tight leading-10 sm:leading-none font-extrabold text-center lg:text-left xl:max-w-screen-xl text-gray-900">
          Join
          <span className="text-purple-700"> Us</span>
        </h2>

        <p className="px-8 mt-5 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 italic text-base text-center lg:text-left xl:max-w-screen-xl text-gray-500">
          Ikuti langkah berikut untuk bergabung di komunitas
          <span className="text-purple-700"> Roompy</span>
        </p>

        <article className="content-center lg:flex lg:justify-center lg:items-center">
          <section className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8">
            <div className="relative w-64 h-48">
              <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div className="w-1/3 h-40"></div>
                <div className="w-2/3 h-32 pr-4">
                  <h3 className="pt-1 text-xl font-bold text-pink-500">
                    Register
                  </h3>
                  <p className="pt-1 italic text-sm text-gray-500">
                    Daftarkan akun anda hanya dalam beberapa detik saja
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <FcImport className="text-3xl" />
                {/* <svg
                  className="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#e53e3e"
                  width="32px"
                  height="32px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg> */}
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
                  <p className="pt-1 italic text-sm text-gray-500">
                    Submit wanted profile/room anda secara gratis
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <FcGlobe className="text-3xl" />

                {/* <svg
                  className="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  viewBox="0 0 24 24"
                  fill="#38a169"
                  width="32px"
                  height="32px"
                >
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <g>
                      <path d="M6.36,18.78L6.61,21l1.62-1.54l2.77-7.6c-0.68-0.17-1.28-0.51-1.77-0.98L6.36,18.78z" />
                      <path d="M14.77,10.88c-0.49,0.47-1.1,0.81-1.77,0.98l2.77,7.6L17.39,21l0.26-2.22L14.77,10.88z" />
                      <path d="M15,8c0-1.3-0.84-2.4-2-2.82V3h-2v2.18C9.84,5.6,9,6.7,9,8c0,1.66,1.34,3,3,3S15,9.66,15,8z M12,9c-0.55,0-1-0.45-1-1 c0-0.55,0.45-1,1-1s1,0.45,1,1C13,8.55,12.55,9,12,9z" />
                    </g>
                  </g>
                </svg> */}
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
                  <p className="pt-1 italic text-sm text-gray-500">
                    Cari wanted profile/room yang anda inginkan
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <FcCameraIdentification className="text-3xl" />

                {/* <svg
                  className="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#3182ce"
                  width="32px"
                  height="32px"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg> */}
              </div>
              <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-purple-500 rounded-lg">
                03
              </div>
              <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-purple-500"></div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
