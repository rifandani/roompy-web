import { useState, MouseEvent } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { HiOutlineSearch } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
// files
import { auth } from '../../configs/firebaseConfig';
import axiosErrorHandle from '../../utils/axiosErrorHandle';

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = async (e: MouseEvent) => {
    e.preventDefault();

    try {
      // logout from firebase auth di client-side, biar UserContext/useAuth ke trigger
      await auth.signOut();

      // delete cookie from server
      await axios.get('/api/auth/logout');

      toast.info('Logout success');
    } catch (err) {
      axiosErrorHandle(err);
    }
  };

  return (
    <header className="bg-gray-900 sm:flex sm:items-center sm:justify-between xl:bg-white xl:flex-shrink-0">
      <div className="flex justify-between px-4 py-3 xl:w-72 xl:bg-gray-900 xl:justify-center xl:py-5">
        {/* logo */}
        <Link href="/">
          <a className="flex items-center justiy-center xl:mr-5">
            <Image
              className="w-auto h-8"
              src="/favicon.ico"
              alt="Roompy Logo"
              width={40}
              height={40}
              priority
              loading="eager"
            />

            <p className="ml-2 text-xl font-bold tracking-wider text-white">
              Roompy
            </p>
          </a>
        </Link>

        {/* hamburger nav */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="px-2 text-gray-500 hover:text-white focus:outline-none focus:text-white"
          >
            {isOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <IoMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* inside hamburger menu */}
      <nav
        className={`${
          isOpen ? 'block' : 'hidden'
        } sm:flex sm:items-center sm:px-4 xl:flex-1 xl:justify-between`}
      >
        <div className="hidden xl:block xl:relative xl:max-w-xs xl:w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <HiOutlineSearch className="w-6 h-6 text-gray-600" />
          </div>

          <input
            className="block w-full py-2 pl-10 pr-4 text-gray-900 bg-gray-200 border border-transparent rounded-lg form-input focus:outline-none focus:bg-white focus:border-gray-300"
            placeholder="Search by keywords"
            type="search"
          />
        </div>

        <div className="sm:flex sm:items-center">
          <div className="px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0 sm:py-0 sm:px-0">
            <Link href="/roompies">
              <a className="block px-3 py-1 font-semibold text-white rounded hover:bg-gray-800 sm:text-sm sm:px-2 xl:text-gray-900 xl:hover:bg-gray-200">
                Roompies
              </a>
            </Link>

            <Link href="/rooms">
              <a className="block px-3 py-1 mt-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:text-sm sm:px-2 sm:ml-2 xl:text-gray-900 xl:hover:bg-gray-200">
                Rooms
              </a>
            </Link>
          </div>

          {/* user hamburger if logged in */}
          <article className="relative px-5 py-5 sm:py-0 sm:ml-4 sm:px-0">
            <section className="flex items-center sm:hidden">
              <Image
                className="object-cover w-10 h-10 border-2 border-gray-600 rounded-full"
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                alt=""
                height={30}
                width={30}
              />

              <span className="ml-4 font-semibold text-gray-200 sm:hidden">
                Isla Schoger
              </span>
            </section>

            <section className="mt-5 sm:hidden">
              <Link href="/dashboard">
                <a className="block text-gray-400 hover:text-white">
                  Dashboard
                </a>
              </Link>

              <span
                onClick={(e) => onLogout(e)}
                className="block mt-3 text-gray-400 cursor-pointer hover:text-white"
              >
                Logout
              </span>
            </section>

            {/* user menu dropdown */}
            <section className="hidden sm:block">
              <div className="relative">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="block focus:outline-none"
                >
                  <span
                    className={`${
                      isOpen
                        ? 'border-white xl:border-indigo-500'
                        : 'border-gray-600 xl:border-gray-300'
                    } block h-8 w-8 overflow-hidden rounded-full border-2`}
                  >
                    <Image
                      className="object-cover w-full h-full"
                      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                      alt=""
                      height={40}
                      width={40}
                    />
                  </span>
                </button>

                <div className={`${isOpen ? 'block' : 'hidden'}`}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 block w-full h-full cursor-default"
                  >
                    X
                  </button>

                  {/* di lg screen, ketika user image di click */}
                  <div className="absolute right-0 z-40">
                    <div className="w-48 py-2 mt-3 bg-white rounded-lg shadow-xl xl:border">
                      <Link href="/dashboard">
                        <a className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-purple-500">
                          Dashboard
                        </a>
                      </Link>

                      <span
                        onClick={(e) => onLogout(e)}
                        className="block w-full px-4 py-2 mt-0 text-gray-800 cursor-pointer hover:text-white hover:bg-red-500"
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </nav>
    </header>
  );
}
