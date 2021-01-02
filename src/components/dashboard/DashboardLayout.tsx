import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillSetting, AiFillHeart } from 'react-icons/ai';
import { FaEnvelope, FaUserCircle, FaLink } from 'react-icons/fa';
import { HiSearch, HiOutlineLogout } from 'react-icons/hi';
import axios from 'axios';
// files
import axiosErrorHandle from '../../utils/axiosErrorHandle';
import { auth } from '../../configs/firebaseConfig';

export default function DashboardLayout({
  children,
  ver2,
}: {
  children: any;
  ver2?: boolean;
}) {
  // hooks
  const [toggle, setToggle] = useState(false);
  const { push, pathname } = useRouter();

  async function logout() {
    try {
      await push('/');

      // logout from firebase auth di client-side, biar UserContext/useAuth ke trigger
      await auth.signOut();

      // delete cookie from server
      const res = await axios.get('http://localhost:3000/api/auth/logout');

      return toast.info(res?.data.message);
    } catch (err) {
      axiosErrorHandle(err);
    }
  }

  return (
    <section className="mt-12 font-sans leading-normal tracking-normal bg-gray-800">
      {/* <!--Nav--> */}
      <nav className="fixed top-0 z-20 w-full h-auto px-1 pt-2 pb-1 mt-0 bg-gray-800 md:pt-1">
        <div className="flex flex-wrap items-center">
          <div className="flex justify-center flex-shrink text-white md:w-1/3 md:justify-start">
            {/* Logo */}
            <span className="flex items-center justify-center px-4 md:pl-5 md:pr-0">
              <Link href="/">
                <a>
                  <img
                    className="w-auto h-8 md:h-10"
                    src={ver2 ? '/favicon.ico' : 'favicon.ico'}
                  />
                </a>
              </Link>
            </span>
          </div>

          <div className="flex justify-center flex-1 px-2 text-white md:py-2 md:w-1/3 md:justify-start">
            <span className="relative w-full">
              <input
                type="search"
                placeholder="Search"
                className="w-full px-2 py-3 pl-10 leading-normal text-white transition bg-gray-700 border border-transparent rounded appearance-none focus:outline-none focus:border-gray-400"
              />

              <div className="absolute top-4 left-3">
                <HiSearch className="w-4 h-4 text-white" />
              </div>
            </span>
          </div>

          {/* links top */}
          <div className="flex content-center justify-between w-full pt-2 md:pt-0 md:w-1/3 md:justify-end">
            <ul className="flex items-center justify-between flex-1 list-reset md:flex-none">
              <li className="flex-1 md:flex-none md:mr-3">
                <Link href="/dashboard">
                  <a
                    className={`${
                      pathname === '/dashboard'
                        ? 'text-white'
                        : 'text-gray-500 hover:text-white'
                    } inline-block px-4 py-2 no-underline`}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>

              <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative inline-block">
                  {/* user button */}
                  <button
                    onClick={() => setToggle((prev) => !prev)}
                    className="flex items-center text-white focus:outline-none"
                  >
                    <FaUserCircle className="mt-2 text-2xl" />
                  </button>

                  {/* dropdown */}
                  <div
                    className={`${
                      toggle ? 'absolute' : 'hidden'
                    } bg-gray-800 text-white right-0 mt-3 p-3 px-5 overflow-auto z-30`}
                  >
                    <Link href="/dashboard/account">
                      <a className="flex items-center p-2 text-sm text-white no-underline hover:text-purple-500 hover:bg-gray-800 hover:no-underline">
                        <AiFillSetting className="mr-2" />
                        <p className="">Account</p>
                      </a>
                    </Link>

                    <div className="border border-gray-800"></div>

                    <button
                      onClick={logout}
                      className="flex items-center flex-shrink-0 p-2 text-sm text-white hover:text-purple-500 hover:bg-gray-800"
                    >
                      <HiOutlineLogout className="mr-2" />
                      <p className="">Logout</p>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        <section className="fixed bottom-0 z-10 w-full h-16 mt-12 bg-gray-800 shadow-xl md:relative md:h-screen md:w-48">
          <div className="justify-between h-full text-left md:mt-12 md:w-48 md:fixed md:left-0 md:top-0">
            {/* nav links */}
            <ul className="flex px-1 py-0 text-center list-reset md:flex-col md:py-3 md:px-2 md:text-left">
              <li className="flex-1 mr-3 md:mt-5">
                <Link href="/dashboard/inbox">
                  <a
                    className={`${
                      pathname === '/dashboard/inbox'
                        ? 'border-indigo-500'
                        : 'border-gray-800 hover:border-indigo-500'
                    } flex flex-col items-center py-1 pl-1 no-underline align-middle border-b-2 md:flex-row md:py-3`}
                  >
                    <FaEnvelope
                      className={`${
                        pathname === '/dashboard/inbox'
                          ? 'text-indigo-500'
                          : 'text-white hover:text-indigo-500'
                      } mx-auto mt-1 text-2xl md:ml-5 md:mx-0 md:pr-3`}
                    />

                    <span className="block pb-1 text-sm text-white md:pb-0 md:text-base md:inline-block">
                      Inbox
                    </span>
                  </a>
                </Link>
              </li>

              <li className="flex-1 mr-3">
                <Link href="/dashboard/favorites">
                  <a
                    className={`${
                      pathname === '/dashboard/favorites'
                        ? 'border-red-500'
                        : 'border-gray-800 hover:border-red-500'
                    } flex flex-col items-center py-1 pl-1 no-underline align-middle border-b-2 md:flex-row md:py-3`}
                  >
                    <AiFillHeart
                      className={`${
                        pathname === '/dashboard/favorites'
                          ? 'text-red-500'
                          : 'text-white hover:text-red-500'
                      } mx-auto mt-1 text-2xl md:ml-5 md:mx-0 md:pr-3`}
                    />

                    <span className="block pb-1 text-sm text-white md:pb-0 md:text-base md:inline-block">
                      Favorites
                    </span>
                  </a>
                </Link>
              </li>

              <li className="flex-1 mr-3">
                <Link href="/dashboard/matches">
                  <a
                    className={`${
                      pathname === '/dashboard/matches'
                        ? 'border-green-500'
                        : 'border-gray-800 hover:border-green-500'
                    } flex flex-col items-center py-1 pl-1 no-underline align-middle border-b-2 md:flex-row md:py-3`}
                  >
                    <FaLink
                      className={`${
                        pathname === '/dashboard/matches'
                          ? 'text-green-500'
                          : 'text-white hover:text-green-500'
                      } mx-auto mt-1 text-2xl md:ml-5 md:mx-0 md:pr-3`}
                    />

                    <span className="block pb-1 text-sm text-white md:pb-0 md:text-base md:inline-block">
                      Matches
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* main content */}
        {children}
      </div>
    </section>
  );
}
