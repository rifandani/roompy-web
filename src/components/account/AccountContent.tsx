import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import validator from 'validator';
// files
import { FireUser } from '../../utils/interfaces';
import { auth, db } from '../../configs/firebaseConfig';

export default function AccountContent({ user }: { user: FireUser }) {
  console.log('last signin time => ', user.metadata.lastSignInTime);

  // hooks
  const [busy, setBusy] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(user.displayName);
  const [email, setEmail] = useState<string>(user.email);
  const [newPassword, setNewPassword] = useState<string>('');
  const { push } = useRouter();

  async function onVerifyEmail() {
    try {
      await user.sendEmailVerification();
      toast.info('Please check your email to verify your account');
    } catch (err) {
      toast.error(err.message);
      return console.error(err);
    }
  }

  async function onUpdateProfile(e: MouseEvent) {
    e.preventDefault();

    // validation input
    if (!username || !email) {
      return toast.warning("Don't empty the input field");
    } else if (!validator.isEmail(email)) {
      return toast.warning('Please input a valid email');
    } else if (!validator.isLength(username, { min: 3 })) {
      return toast.warning('Please input min 3 chars for USERNAME');
    } else if (newPassword && !validator.isLength(newPassword, { min: 6 })) {
      return toast.warning('Please input min 6 chars for PASSWORD');
    }

    try {
      setBusy(true); // disable button

      // update profile items in firebase.auth
      await user.updateProfile({
        displayName: username,
      });
      await user.updateEmail(email);
      if (newPassword) {
        await user.updatePassword(newPassword);
      }

      // update profile items in users collection
      await db.collection('users').doc(user.uid).update({
        username,
        email,
        updatedAt: Date.now(),
      });

      // sign in again to set userCredential to React Context
      await auth.signInWithEmailAndPassword(email, newPassword);

      toast.success('Account Profile Updated');
      return push('/dashboard');
    } catch (err) {
      console.error('Update profile items error', err);
      return toast.error(err.message);
    }
  }

  return (
    <div className="flex-1 pb-24 mt-12 bg-gray-100 md:mt-2 md:pb-5">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-blue-700 to-gray-800">
          <h3 className="pl-2 font-bold">Account</h3>
        </div>
      </div>

      {/* creation time status */}
      <div className="flex flex-wrap items-center w-full pt-4">
        <h6 className="pl-6 text-2xl font-bold text-gray-900">
          Joined since{' '}
          <p className="inline-flex italic text-blue-500">
            {user.metadata.creationTime}
          </p>
        </h6>
      </div>

      {/* email verified status */}
      <div className="flex flex-wrap items-center justify-between w-full pt-4">
        <h6 className="pl-6 text-2xl font-bold text-gray-900">
          Your email is{' '}
          <p className="inline-flex italic text-blue-500">
            {user.emailVerified ? 'VERIFIED' : 'NOT VERIFIED'}
          </p>
        </h6>

        <button
          className="flex items-center p-2 mt-2 ml-6 mr-6 transition duration-500 transform border-2 border-blue-500 rounded-lg hover:scale-125 md:ml-0 md:mt-0 bg-blue-50"
          onClick={onVerifyEmail}
        >
          <FaCheck className="mr-2 text-lg text-blue-500" />

          <p className="flex-grow font-bold text-gray-900">Verify Email</p>
        </button>
      </div>

      {/* form */}
      <div className="flex w-full p-6">
        <form className="min-w-full" autoComplete="on">
          <label
            className="block text-base font-bold text-gray-700"
            htmlFor="username"
          >
            Username
            <input
              className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
              placeholder="Elon Musk"
              name="username"
              id="username"
              autoComplete="username"
              required
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label
            className="block mt-4 text-base font-bold text-gray-700"
            htmlFor="email"
          >
            Email
            <input
              className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
              placeholder="elonmusk@email.com"
              type="email"
              name="email"
              id="email"
              autoComplete="username" // "username" is recognized by password managers in modern browsers
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label
            className="block mt-4 text-base font-bold text-gray-700"
            htmlFor="current-password"
          >
            New Password
            <input
              className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
              type="password"
              name="current-password"
              id="current-password"
              autoComplete="current-password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <div className="mt-6">
            <button
              className="block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-blue-700 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 hover:text-blue-700 hover:bg-blue-100"
              type="submit"
              onClick={(e) => onUpdateProfile(e)}
              disabled={busy}
            >
              {busy ? 'Loading' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
