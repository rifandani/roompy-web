import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, MouseEvent, useContext } from 'react';
import { toast } from 'react-toastify';
import validator from 'validator';
// files
import { auth, db } from '../configs/firebaseConfig';
import UserContext from '../contexts/UserContext';

export default function RegisterPage() {
  // state
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  // useRouter
  const { push } = useRouter();

  // UserContext
  const { user } = useContext(UserContext);

  // register new user
  async function register(e: MouseEvent) {
    e.preventDefault();

    // push back home already logged in user
    if (user) {
      toast.warning('You are already logged in!');
      return push('/');
    }

    // validation input
    if (!username || !email || !password || !password2)
      return toast.warning('Please input all field');
    if (password !== password2)
      return toast.warning('Please confirm the same password');
    if (!validator.isEmail(email))
      return toast.warning('Please input a valid email');
    if (
      !validator.isLength(username, { min: 3 }) ||
      !validator.isLength(password, { min: 6 })
    )
      return toast.warning(
        'Please input min 3 chars USERNAME & 6 chars PASSWORD',
      );

    try {
      // save to firebase auth && update user profile
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await newUser.user.updateProfile({ displayName: username });

      // save to firestore Users collection
      await db.collection('users').doc(newUser.user.uid).set({
        createdAt: Date.now(),
        email,
        emailVerified: false,
        postedRoompies: [],
        postedRooms: [],
        updatedAt: Date.now(),
        username,
      });

      // toast & push to home
      toast.success(`Welcome, ${newUser.user.displayName}`);
      return push('/');
    } catch (err) {
      // Handle Errors here.
      if (err.code === 'auth/weak-password') {
        toast.error('The password is too weak.');
      } else {
        toast.error(err.message);
      }

      return console.error(err);
    }
  }

  return (
    // <!-- Page Container -->
    <div className="relative flex items-center justify-center min-h-screen text-gray-900 bg-gray-100">
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

      {/* <!-- Create Account Section --> */}
      <div className="relative w-full px-5 py-6 lg:px-6 lg md:w-8/12 lg:w-6/12 xl:w-4/12">
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
            {user
              ? 'You are already logged in'
              : 'Gabung bersama komunitas kami'}
          </p>
        </div>
        {/* <!-- END Logo --> */}

        {/* <!-- Form --> */}
        <div className="p-6 bg-white border rounded shadow-sm lg:p-10">
          <form autoComplete="on">
            <label className="block text-sm text-gray-700">
              Username
              <input
                className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="Elon Musk"
                required
                minLength={3}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={user && Boolean(user)}
              />
            </label>

            <label className="block mt-4 text-sm text-gray-700">
              Email
              <input
                className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="elonmusk@gmail.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={user && Boolean(user)}
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
                disabled={user && Boolean(user)}
              />
            </label>

            <label className="block mt-4 text-sm text-gray-700">
              Confirm Password
              <input
                className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                placeholder="******"
                type="password"
                required
                minLength={6}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                disabled={user && Boolean(user)}
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
                className="block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-purple-700 rounded-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-purple-700 hover:bg-purple-100"
                type="submit"
                onClick={(e) => register(e)}
              >
                Register
              </button>
            </div>
          </form>

          {/* login page */}
          <div className="mt-6 text-sm text-center">
            <Link href="/login">
              <a className="block italic text-gray-500 hover:text-purple-700 hover:underline md:inline-block focus:underline focus:text-purple-700">
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
