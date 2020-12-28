import { FaCheck } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
// files
import { FireUser } from '../../utils/interfaces';

export default function AccountContent({ user }: { user: FireUser }) {
  console.log('creation time => ', user.metadata.creationTime);
  console.log('last signin time => ', user.metadata.lastSignInTime);

  async function onVerifyEmail() {
    alert('onVerifyEmail');
  }

  async function onEdit() {
    alert('onEdit');
  }

  return (
    <div className="flex-1 pb-24 mt-12 bg-gray-100 md:mt-2 md:pb-5">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-purple-700 to-gray-800">
          <h3 className="pl-2 font-bold">Account</h3>
        </div>
      </div>

      {/* edit profile */}
      <div className="flex flex-wrap items-center justify-between w-full pt-4">
        <h6 className="pl-6 text-2xl italic font-bold text-blue-500">
          Edit Profile
        </h6>

        <button
          className="flex items-center p-2 mt-2 ml-6 mr-6 transition duration-500 transform border-2 border-blue-500 rounded-lg hover:scale-125 md:ml-0 md:mt-0 bg-blue-50"
          onClick={() => {}}
        >
          <FaCheck className="mr-2 text-lg text-blue-500" />

          <p className="flex-grow font-bold text-gray-900">Verify Email</p>
        </button>
      </div>

      {/* form */}
      <div className="flex w-full p-6 bg-red-100 md:w-1/2">
        <form>
          <p className="p-2 mb-2 font-bold text-center text-gray-900 border-b-2 border-blue-500 rounded-lg">
            Your email is {user.emailVerified ? 'VERIFIED' : 'NOT VERIFIED'}
          </p>

          <label
            className="flex flex-wrap items-center justify-between mb-2"
            htmlFor="username"
          >
            <p className="mr-2 font-bold text-gray-900">Username: </p>

            <input
              name="username"
              className="p-2 leading-normal border border-transparent rounded appearance-none focus:outline-none focus:border-blue-500"
              placeholder={user.displayName}
              required
            />
          </label>

          <label
            className="flex flex-wrap items-center justify-between mb-2"
            htmlFor="email"
          >
            <p className="font-bold text-gray-900">Email: </p>

            <input
              type="email"
              name="email"
              className="p-2 leading-normal border border-transparent rounded appearance-none focus:outline-none focus:border-blue-500"
              placeholder={user.email}
              required
            />
          </label>

          <label
            className="flex flex-wrap items-center justify-between"
            htmlFor="password"
          >
            <p className="font-bold text-gray-900">Password: </p>

            <input
              type="password"
              name="password"
              className="p-2 leading-normal border border-transparent rounded appearance-none focus:outline-none focus:border-blue-500"
              placeholder="******"
              required
            />
          </label>
        </form>
      </div>
    </div>
  );
}
