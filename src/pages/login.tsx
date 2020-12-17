import Link from 'next/link';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import validator from 'validator';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// files
import { auth } from '../configs/firebaseConfig';
import UserContext from '../contexts/UserContext';

export default function LoginPage() {
  // state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // useRouter
  const { push } = useRouter();

  // UserContext
  const { user } = useContext(UserContext);

  // useEffect, make sure already logged in user cant access this page
  useEffect(() => {
    if (user) push('/');
  }, []);

  async function login(e: MouseEvent) {
    e.preventDefault();

    // validation
    if (!email || !password)
      return toast.warning('Please input all required field');
    if (!validator.isEmail(email))
      return toast.warning('Please input a valid email');
    if (!validator.isLength(password, { min: 6 }))
      return toast.warning('Please input min 6 chars PASSWORD');

    try {
      const credential = await auth.signInWithEmailAndPassword(email, password);

      toast.success(`Welcome Back, ${credential.user.displayName}`);
      return push('/');
    } catch (err) {
      // Handle Errors here.
      if (err.code === 'auth/wrong-password') {
        toast.error('Wrong password.');
      } else {
        toast.error(err.message);
      }

      return console.error(err);
    }
  }

  return (
    // <!-- Page Container -->
    <div className="relative flex justify-center min-h-screen pt-16 text-gray-900 bg-gray-100">
      {/* <!-- Waves Background --> */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 -100 1440 320">
          <path
            className="text-purple-200 fill-current"
            fillOpacity="1"
            d="M0,96L26.7,112C53.3,128,107,160,160,181.3C213.3,203,267,213,320,192C373.3,171,427,117,480,122.7C533.3,128,587,192,640,229.3C693.3,267,747,277,800,245.3C853.3,213,907,139,960,138.7C1013.3,139,1067,213,1120,224C1173.3,235,1227,181,1280,154.7C1333.3,128,1387,128,1413,128L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* <!-- END Waves Background --> */}

      {/* <!-- Log In Section --> */}
      <div className="relative w-full px-5 py-6 lg:px-6 lg:py-8 md:w-8/12 lg:w-6/12 xl:w-4/12">
        {/* <!-- Logo --> */}
        <div className="mb-6 text-center">
          <Link href="/">
            <div className="flex items-center justify-center cursor-pointer">
              <img className="inline-block w-10 mr-2" src="favicon.ico" />

              <h3 className="inline-flex items-center text-3xl font-bold text-purple-700">
                Roompy
              </h3>
            </div>
          </Link>

          <p className="mt-2 text-sm italic text-gray-500">
            Please login to your account
          </p>
        </div>
        {/* <!-- END Logo --> */}

        {/* <!-- Form --> */}
        <div className="p-6 bg-white border rounded shadow-sm lg:p-8">
          <form>
            <label className="block text-sm text-gray-700">
              Email
              <input
                className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="elonmusk@email.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block mt-4 text-sm text-gray-700">
              Password
              <input
                className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="******"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="mt-6">
              <button
                className="block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-purple-700 rounded-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-purple-700 hover:bg-purple-100"
                type="submit"
                onClick={(e) => login(e)}
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm text-center">
            <Link href="/register">
              <a className="block mb-2 italic text-gray-500 md:inline-block md:mb-0 hover:text-purple-700 hover:underline focus:text-purple-700 focus:underline">
                Register
              </a>
            </Link>

            <span className="hidden mx-1 text-gray-500 md:inline-block">·</span>

            <Link href="/forgot-password">
              <a className="block italic text-gray-500 md:inline-block hover:text-purple-700 hover:underline focus:text-purple-700 focus:underline">
                Forgot Password?
              </a>
            </Link>
          </div>
        </div>
        {/* <!-- END Form --> */}
      </div>
    </div>
  );
}
