import Link from 'next/link';

export default function RegisterPage() {
  return (
    // <!-- Page Container -->
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 relative">
      {/* <!-- Waves Background --> */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg viewBox="0 -100 1440 320">
          <path
            className="fill-current text-purple-200"
            fillOpacity="1"
            d="M0,96L26.7,112C53.3,128,107,160,160,181.3C213.3,203,267,213,320,192C373.3,171,427,117,480,122.7C533.3,128,587,192,640,229.3C693.3,267,747,277,800,245.3C853.3,213,907,139,960,138.7C1013.3,139,1067,213,1120,224C1173.3,235,1227,181,1280,154.7C1333.3,128,1387,128,1413,128L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* <!-- END Waves Background --> */}

      {/* <!-- Create Account Section --> */}
      <div className="px-5 py-6 lg:px-6 lg w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
        {/* <!-- Logo --> */}
        <div className="mb-6 text-center">
          <Link href="/">
            <div className="flex items-center justify-center cursor-pointer">
              <img className="w-10 inline-block mr-2" src="favicon.ico" />

              <h3 className="text-3xl font-bold inline-flex items-center text-purple-700">
                Roompy
              </h3>
            </div>
          </Link>

          <p className="mt-2 italic text-sm text-gray-500">
            Gabung bersama komunitas kami
          </p>
        </div>
        {/* <!-- END Logo --> */}

        {/* <!-- Form --> */}
        <div className="rounded border p-6 lg:p-10 shadow-sm bg-white">
          <form>
            <label className="text-sm block text-gray-700">
              Full Name
              <input
                className="appearance-none rounded-md px-4 py-3 mt-1 block w-full outline-none border-b-2 hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="Elon Musk"
                required
                minLength={3}
              />
            </label>

            <label className="text-sm block text-gray-700 mt-4">
              Email
              <input
                className="appearance-none rounded-md px-4 py-3 mt-1 block w-full outline-none border-b-2 hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="elonmusk@gmail.com"
                type="email"
                required
              />
            </label>

            <label className="text-sm block text-gray-700 mt-4">
              Password
              <input
                className="appearance-none rounded-md px-4 py-3 mt-1 block w-full outline-none border-b-2 hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="******"
                type="password"
                required
                minLength={6}
              />
            </label>

            <label className="text-sm block text-gray-700 mt-4">
              Confirm Password
              <input
                className="appearance-none rounded-md px-4 py-3 mt-1 block w-full outline-none border-b-2 hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="******"
                type="password"
                required
                minLength={6}
              />
            </label>

            {/* <label className="block mt-4">
              <input type="checkbox" className="mr-1 leading-none" />
              <span className="text-sm text-gray-700">
                I accept terms &amp; conditions
              </span>
            </label> */}

            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-3 font-bold tracking-wider uppercase rounded-md focus:outline-none focus:shadow-outline block w-full hover:text-purple-700 hover:bg-purple-100 text-white bg-purple-700"
              >
                Register
              </button>
            </div>
          </form>

          {/* login page */}
          <div className="mt-6 text-center text-sm">
            <Link href="/login">
              <a className="italic text-gray-500 hover:text-purple-700 hover:underline block md:inline-block">
                Already have an account?
              </a>
            </Link>
          </div>
        </div>
        {/* <!-- END Form --> */}
      </div>
      {/* <!-- END Create Account Section --> */}
    </div>
  );
}
