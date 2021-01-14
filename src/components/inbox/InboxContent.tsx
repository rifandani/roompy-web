import { useRouter } from 'next/router';
import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
// files

export default function InboxContent() {
  // hooks
  const [busy, setBusy] = useState<boolean>(false);
  const { push } = useRouter();

  return (
    <div className="flex-1 pb-20 mt-12 overflow-hidden bg-gray-100 md:mt-2">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-blue-700 to-gray-800">
          <h3 className="pl-2 font-bold">Inbox</h3>
        </div>
      </div>

      {/* main content */}
      <main className="flex flex-1 h-screen bg-gray-200">
        <div className="relative flex flex-col flex-grow w-full max-w-xs overflow-y-auto bg-gray-200 border-r">
          {/* sorting */}
          <div className="flex items-center justify-between flex-shrink-0 px-4 py-2 border-b">
            <button className="flex items-center text-xs font-semibold text-gray-600">
              Sorted by Date
              <span className="w-6 h-6 leading-loose text-gray-500 stroke-current">
                <i className="ml-1 fas fa-chevron-down"></i>
              </span>
            </button>
            <button>
              <span className="w-6 h-6 text-gray-500 stroke-current ">
                <i className="fas fa-sort-amount-up"></i>
              </span>
            </button>
          </div>

          {/* chat list */}
          <div className="flex-1 overflow-y-auto">
            <a href="/" className="block px-6 pt-3 pb-4 bg-white">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
            <a href="/" className="block px-6 pt-3 pb-4 bg-white border-t">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Masturah Adam
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-900">Refund</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempus element...
              </p>
            </a>
          </div>
        </div>

        {/* message list container */}
        <div className="flex flex-col flex-1 w-0 overflow-y-auto">
          <div className="relative shadow-md">
            <div className="flex items-center justify-between px-5 py-4 bg-gray-100 border-b">
              <div className="flex items-center">
                <button>
                  <span className="leading-normal">
                    <i className="w-5 h-5 text-2xl text-gray-600 "></i>
                  </span>
                </button>
                <button className="ml-6">
                  <span className="leading-normal">
                    <i className="w-5 h-5 text-2xl text-gray-600 fill-current fas fa-tag "></i>
                  </span>
                </button>
                <button className="ml-6">
                  <span className="leading-normal">
                    <i className="w-5 h-5 text-2xl text-gray-600 fill-current far fa-user-circle "></i>
                  </span>
                </button>
                <button className="ml-6">
                  <span className="leading-normal">
                    <i className="text-2xl text-gray-600 fill-current fas fa-file-download "></i>
                  </span>
                </button>
                <button className="ml-4">
                  <span className="leading-normal">
                    <i className="w-5 h-5 text-2xl text-gray-600 fill-current fas fa-ellipsis-h "></i>
                  </span>
                </button>
              </div>
              <div className="flex items-center">
                <button>
                  <span className="leading-normal">
                    <i className="w-8 h-8 text-2xl text-gray-600 stroke-current fas fa-chevron-up"></i>
                  </span>
                </button>
                <button>
                  <span className="leading-normal">
                    <i className="w-8 h-8 text-2xl text-gray-600 stroke-current fas fa-chevron-down"></i>
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-3 bg-white">
              <h3 className="text-xl text-gray-900 truncate">
                Re: Student discount? this is really long and has to wrap and
                looks stupid this is really long and has to wrap and looks
                stupid
              </h3>
              <div className="flex-shrink-0 ml-4">
                <span>#1428</span>
                <span className="px-2 py-1 ml-2 text-sm font-semibold leading-none text-green-900 bg-green-200 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* message content */}
          <div className="flex-1 p-3 overflow-y-auto">
            <article className="px-10 pt-6 pb-8 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                  <span className="text-gray-900">Masturah Adam</span>
                  <span className="text-gray-600">wrote</span>
                </p>
                <div className="flex items-center">
                  <span className="text-xs text-gray-600">
                    Yesterday at 7:24 AM
                  </span>
                  <img
                    className="object-cover w-8 h-8 ml-5 rounded-full"
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.5&w=144&q=60"
                    alt="uns"
                  />
                </div>
              </div>
              <div className="mt-6 text-sm text-gray-800">
                <p>Thanks so much!! Can't wait to try it out :)</p>
              </div>
            </article>
            <article className="px-10 pt-6 pb-8 mt-3 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                  <span className="text-gray-900">Akanbi Lawal</span>
                  <span className="text-gray-600">wrote</span>
                </p>
                <div className="flex items-center">
                  <span className="text-xs text-gray-600">
                    Yesterday at 7:24 AM
                  </span>
                  <img
                    className="object-cover w-8 h-8 ml-5 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=144&q=80"
                    alt="unsplas"
                  />
                </div>
              </div>
              <div className="mt-6 text-sm text-gray-800">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p className="mt-4 font-semibold text-gray-900">Akanbi Lawal</p>
                <p>Customer Service</p>
              </div>
            </article>
            <article className="px-10 pt-6 pb-8 mt-3 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                  <span className="text-gray-900">Masturah Adam</span>
                  <span className="text-gray-600">wrote</span>
                </p>
                <div className="flex items-center">
                  <span className="text-xs text-gray-600">
                    Yesterday at 7:24 AM
                  </span>
                  <img
                    className="object-cover w-8 h-8 ml-5 rounded-full"
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.5&w=144&q=60"
                    alt="unsplass"
                  />
                </div>
              </div>
              <div className="mt-6 text-sm text-gray-800">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p className="mt-4 font-semibold text-gray-900">
                  Masturah Abiola
                </p>
                <p>Customer Service</p>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
