import { useState, Dispatch, SetStateAction, FormEvent } from 'react'
import {
  FaSortAmountUp,
  FaSortAmountDown,
  FaEllipsisV,
  FaPaperclip,
} from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { toast } from 'react-toastify'
// files
import { InboxPageProps } from '../../pages/dashboard/inbox'

const chat = {
  name: 'Masturah Adam',
  time: '2 days ago',
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus element',
}

interface Props extends InboxPageProps {
  setBusy: Dispatch<SetStateAction<boolean>>
}

export default function InboxContent({ setBusy, dbUser }: Props) {
  // hooks
  const [isAsc, setIsAsc] = useState<boolean>(false)

  return (
    <div className="flex-1 pb-20 mt-12 overflow-hidden bg-gray-100 md:mt-2 md:pb-0">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-indigo-700 to-gray-800">
          <h3 className="pl-2 font-bold">Inbox</h3>
        </div>
      </div>

      {/* main content */}
      <main className="flex flex-1 h-screen bg-gray-200">
        <div className="relative flex flex-col flex-grow w-full max-w-xs bg-gray-200 border-r">
          {/* sorting */}
          <div className="flex items-center justify-between flex-shrink-0 px-6 py-2 border-b">
            <p className="flex items-center text-xs font-semibold text-gray-600">
              Sorted by Date
            </p>

            <button
              className="w-6 h-6 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setIsAsc(!isAsc)}
            >
              {isAsc ? (
                <FaSortAmountUp className="text-gray-500" />
              ) : (
                <FaSortAmountDown className="text-gray-500" />
              )}
            </button>
          </div>

          {/* chat list */}
          <div className="flex-1 overflow-y-auto">
            {Array(3)
              .fill(chat)
              .map((el, i) => (
                <span key={i} className="block px-6 py-3 bg-white">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900 truncate w-44">
                      {el.name}
                    </span>

                    <span className="text-xs text-gray-500">{el.time}</span>
                  </div>

                  <p className="w-40 text-xs text-gray-600 truncate">
                    {el.message}
                  </p>
                </span>
              ))}
          </div>
        </div>

        {/* message list container */}
        <div className="flex flex-col justify-between w-full bg-gray-200">
          <article className="relative shadow-md">
            <div className="flex items-center justify-between p-3 border-b">
              <section className="flex items-center gap-3">
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.5&w=144&q=60"
                  alt="uns"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-900">
                    Ivandani
                  </p>
                  <p className="text-xs text-gray-600">Active 2 minutes ago</p>
                </div>
              </section>

              <section className="flex items-center">
                <button className="rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <FaEllipsisV className="w-6 h-6 text-gray-900" />
                </button>
              </section>
            </div>
          </article>

          {/* message content */}
          <article className="flex flex-col flex-grow p-3 overflow-y-auto">
            <section className="w-3/4 px-10 py-6 mb-3 bg-white rounded-lg shadow">
              <div className="flex flex-col justify-center">
                <p className="mb-1 text-sm text-gray-900">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p className="self-end text-xs text-gray-600">
                  {new Date().toISOString()}
                </p>
              </div>
            </section>

            <section className="self-end w-3/4 px-10 py-6 bg-indigo-200 rounded-lg shadow">
              <div className="flex flex-col justify-center">
                <p className="mb-1 text-sm text-gray-900">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p className="self-end text-xs text-gray-600">
                  {new Date().toISOString()}
                </p>
              </div>
            </section>
          </article>

          {/* input message */}
          <form className="relative flex items-center justify-between w-full p-3 bg-gray-200 border-t shadow">
            <button className="p-1 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <FaPaperclip className="w-6 h-6 text-gray-900" />
            </button>

            <input
              className="flex-grow px-3 py-2 mx-3 rounded-full outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type a message..."
              required
            />

            <button
              className="p-1 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="submit"
            >
              <IoSend className="w-6 h-6 text-gray-900 " />
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
