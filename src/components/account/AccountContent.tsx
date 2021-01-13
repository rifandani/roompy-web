import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, FormEvent, MouseEvent } from 'react';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import validator from 'validator';
// files
import { auth, db, emailAuthProvider } from '../../configs/firebaseConfig';
import axiosErrorHandle from '../../utils/axiosErrorHandle';
import { FireUser, User } from '../../utils/interfaces';

export default function AccountContent({
  dbUser,
  user,
}: {
  dbUser: User;
  user: FireUser;
}) {
  console.log('last signin time => ', user.metadata.lastSignInTime);

  // hooks
  const [busy, setBusy] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(dbUser.username);
  const [email, setEmail] = useState<string>(dbUser.email);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const { push } = useRouter();

  async function onVerifyEmail() {
    if (user.emailVerified)
      return toast.warning('Your email is already verified');

    try {
      await user.sendEmailVerification();
      toast.info('Please check your email to verify your account');
    } catch (err) {
      toast.error(err.message);
      return console.error(err);
    }
  }

  async function onUpdateProfile(e: FormEvent) {
    e.preventDefault();

    // validation input
    if (!username || !email) {
      return toast.warning("Don't empty the input field");
    } else if (!validator.isEmail(email)) {
      return toast.warning('Please input a valid email');
    } else if (!validator.isLength(username, { min: 3 })) {
      return toast.warning('Please input min 3 chars for USERNAME');
    } else if (newPassword && !validator.isLength(newPassword, { min: 6 })) {
      return toast.warning('Please input min 6 chars for NEW PASSWORD');
    }

    try {
      setBusy(true); // disable button

      // reauth and update profile items
      await reauthenticate(currentPassword);
      await updateProfileItems(username, email, newPassword);

      // sign in again to set userCredential to React Context
      await auth.signInWithEmailAndPassword(email, newPassword);

      toast.success('Account Profile Updated');
      return push('/dashboard');
    } catch (err) {
      setBusy(false);
      console.error('Update profile items error', err);
      return toast.error(err.message);
    }
  }

  async function reauthenticate(currentPassword: string) {
    // get the user credentials
    const credential = emailAuthProvider.credential(
      dbUser.email,
      currentPassword,
    );

    // check if user valid
    try {
      await user.reauthenticateWithCredential(credential);
      console.log('Reauthenticate success');
      return true;
    } catch (err) {
      setBusy(false);
      console.error('Reauthenticate error', err);
      toast.error(err.message);
      return false;
    }
  }

  async function updateProfileItems(
    name: string,
    email: string,
    newPassword: string,
  ) {
    try {
      // update profile items in firebase.auth
      await user.updateProfile({
        displayName: name,
      });
      await user.updateEmail(email);

      // kalau newPassword diisi
      if (newPassword) {
        await user.updatePassword(newPassword);
      }

      // update profile items in users collection
      await db.collection('users').doc(dbUser.id).update({
        username,
        email,
        updatedAt: Date.now(),
      });

      console.log('updateProfileItems success');
    } catch (err) {
      setBusy(false);
      console.error('Update profile items error', err);
      return toast.error(err.message);
    }
  }

  async function onDeleteAccount(e: MouseEvent) {
    e.preventDefault();

    if (!currentPassword || !validator.isLength(currentPassword, { min: 6 })) {
      toast.warning(
        'Please input your current valid password to reauthenticate',
      );
      return;
    }

    const userAgree = window.confirm(
      'Are you sure you want to delete this account? \nThis action cannot be undone!',
    );
    if (!userAgree) return;

    try {
      setBusy(true); // disable button

      // reauthenticate first
      const isAuth = await reauthenticate(currentPassword);

      if (isAuth) {
        // DELETE in users collection + postedRoompies
        await axios.delete(`/users?id=${user.uid}`);

        // delete in auth & signOut the user (move this to client-side)
        await user.delete();

        // delete cookies in header
        await axios.get('/auth/logout');

        // on SUCCESS
        setBusy(false);
        await push('/');
        toast('Your account deleted successfully');
      }
    } catch (err) {
      // on ERROR => Axios Response error
      setBusy(false); // enable button

      axiosErrorHandle(err);
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
          className="flex items-center p-2 mt-2 ml-6 mr-6 transition duration-500 transform border-2 border-blue-500 rounded-lg hover:scale-125 md:ml-0 md:mt-0 bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={onVerifyEmail}
          disabled={user.emailVerified}
        >
          <FaCheck className="mr-2 text-lg text-blue-500" />

          <p className="flex-grow font-bold text-gray-900">
            {user.emailVerified ? 'Verified' : 'Verify Email'}
          </p>
        </button>
      </div>

      {/* form */}
      <div className="flex w-full p-6">
        <form
          className="min-w-full"
          autoComplete="on"
          onSubmit={(e) => onUpdateProfile(e)}
        >
          <label
            className="block text-base font-bold text-gray-700"
            htmlFor="username"
          >
            New Username
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
            New Email
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
            htmlFor="new-password"
          >
            New Password
            <input
              className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
              type="password"
              name="new-password"
              id="new-password"
              autoComplete="new-password"
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <label
            className="block mt-4 text-base font-bold text-gray-700"
            htmlFor="current-password"
          >
            Current Password
            <input
              className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
              type="password"
              name="current-password"
              id="current-password"
              required
              minLength={6}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>

          <div className="mt-6">
            <button
              className={`${
                busy ? 'opacity-50' : 'opacity-100'
              } block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-blue-700 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 hover:text-blue-700 hover:bg-blue-100`}
              type="submit"
              disabled={busy}
            >
              {busy ? 'Loading' : 'Update Profile'}
            </button>
          </div>

          <div className="mt-6">
            <button
              className={`${
                busy ? 'opacity-50' : 'opacity-100'
              } block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-red-700 rounded-md focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 hover:text-red-700 hover:bg-red-100`}
              disabled={busy}
              onClick={(e) => onDeleteAccount(e)}
            >
              {busy ? 'Loading' : 'Delete Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
