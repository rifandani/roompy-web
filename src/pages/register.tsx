export default function RegisterPage() {
  return (
    // <!-- Page Container -->
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 relative">
      {/* <!-- Waves Background --> */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg viewBox="0 -100 1440 320">
          <path
            className="fill-current text-purple-200"
            fill-opacity="1"
            d="M0,96L26.7,112C53.3,128,107,160,160,181.3C213.3,203,267,213,320,192C373.3,171,427,117,480,122.7C533.3,128,587,192,640,229.3C693.3,267,747,277,800,245.3C853.3,213,907,139,960,138.7C1013.3,139,1067,213,1120,224C1173.3,235,1227,181,1280,154.7C1333.3,128,1387,128,1413,128L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* <!-- END Waves Background --> */}

      {/* <!-- Create Account Section --> */}
      <div className="px-5 py-6 lg:px-6 lg w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
        {/* <!-- Logo --> */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center">
            <img className="w-10 inline-block mr-2" src="favicon.ico" />

            <h3 className="text-3xl font-bold inline-flex items-center text-purple-700">
              Roompy
            </h3>
          </div>

          <p className="mt-2 italic text-sm text-gray-500">
            Gabung bersama komunitas kami
          </p>
        </div>
        {/* <!-- END Logo --> */}

        {/* <!-- Form --> */}
        <div className="rounded border p-6 lg:p-10 shadow-sm bg-white">
          <form>
            <label className="block text-gray-700">
              Name
              <input
                type="text"
                className="appearance-none border rounded px-4 py-3 mt-1 block w-full outline-none focus:border-blue-500"
                placeholder="Enter your first name"
              />
            </label>
            <label className="block text-gray-700 mt-4">
              Email
              <input
                type="email"
                className="appearance-none border rounded px-4 py-3 mt-1 block w-full outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </label>
            <label className="block text-gray-700 mt-4">
              Password
              <input
                type="password"
                className="appearance-none border rounded px-4 py-3 mt-1 block w-full outline-none focus:border-blue-500"
                placeholder="Choose a strong password"
              />
            </label>
            <label className="block text-gray-700 mt-4">
              Confirm Password
              <input
                type="password"
                className="appearance-none border rounded px-4 py-3 mt-1 block w-full outline-none focus:border-blue-500"
                placeholder="Enter again your chosen password"
              />
            </label>
            <label className="block mt-4">
              <input type="checkbox" className="mr-1 leading-none" />
              <span className="text-sm text-gray-700">
                I accept terms &amp; conditions
              </span>
            </label>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-3 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:shadow-outline block w-full"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            <a
              className="text-gray-600 hover:text-gray-700 underline block md:inline-block"
              href="index.html"
            >
              Return to log in
            </a>
          </div>
        </div>
        {/* <!-- END Form --> */}
      </div>
      {/* <!-- END Create Account Section --> */}
    </div>
  );
}
