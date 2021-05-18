import axios from 'axios'
import { useRouter } from 'next/router'
import { FaCheck, FaQuestion } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import {
  auth,
  db,
  emailAuthProvider,
  nowMillis,
} from '../../configs/firebaseConfig'
import { FireUser, User } from '../../utils/interfaces'
import {
  updateUserProfileSchema,
  TUpdateUserProfileSchema,
} from '../../utils/yup/schema'

export default function AccountContent({
  dbUser,
  user,
}: {
  dbUser: User
  user: FireUser
}) {
  const currentEmail = user.email
  const lastSignInTime = user.metadata.lastSignInTime
  const initialValues: TUpdateUserProfileSchema = {
    username: '',
    newEmail: '',
    currentPassword: '',
    newPassword: '',
  }

  console.log('last signin time => ', lastSignInTime)

  // hooks
  const { push } = useRouter()

  async function onVerifyEmail() {
    // if user already verified
    if (user.emailVerified) {
      toast.warning('Your email is already verified')
      return
    }

    try {
      await user.sendEmailVerification()
      toast.info('Please check your email to verify your account')
    } catch (err) {
      toast.error(err.message)
      console.error('onVerifyEmail error => ', err)
      return
    }
  }

  async function onUpdateProfile(
    values: TUpdateUserProfileSchema,
    actions: FormikHelpers<TUpdateUserProfileSchema>
  ) {
    try {
      // reauth and update profile items
      await reauthenticate(values.currentPassword)
      await updateProfileItems(
        values.username,
        values.newEmail,
        values.newPassword
      )

      // sign in again to set userCredential to React Context
      await auth.signInWithEmailAndPassword(values.newEmail, values.newPassword)

      // if all successful
      toast.success('Account Profile Updated')
      actions.setSubmitting(false) // finish formik cycle

      return push('/dashboard')
    } catch (err) {
      toast.error(err.message)
      console.error('onUpdateProfile error => ', err)
      actions.setSubmitting(false) // finish formik cycle

      return
    }
  }

  async function reauthenticate(currentPassword: string) {
    // get the user credentials
    const credential = emailAuthProvider.credential(
      currentEmail,
      currentPassword
    )

    // check if user input credential valid
    await user.reauthenticateWithCredential(credential)
    console.log('reauthenticate success')
  }

  async function updateProfileItems(
    username: string,
    newEmail: string,
    newPassword: string
  ) {
    // update profile items in firebase.auth
    await user.updateProfile({
      displayName: username,
    })
    await user.updateEmail(newEmail)
    await user.updatePassword(newPassword)

    // update profile items in users collection
    await db.collection('users').doc(user.uid).update({
      username,
      email: newEmail,
      updatedAt: nowMillis,
    })

    console.log('updateProfileItems success')
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
          <p className="inline-flex italic text-blue-500">{user.displayName}</p>{' '}
          , joined since{' '}
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
          {user.emailVerified ? (
            <FaCheck className="mr-2 text-lg text-blue-500" />
          ) : (
            <FaQuestion className="mr-2 text-lg text-red-500" />
          )}

          <p className="flex-grow font-bold text-gray-900">
            {user.emailVerified ? 'Verified' : 'Verify Email'}
          </p>
        </button>
      </div>

      {/* form */}
      <div className="flex w-full p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={updateUserProfileSchema}
          onSubmit={onUpdateProfile}
        >
          {({ isSubmitting, setSubmitting, values, errors }) => (
            <Form className="min-w-full">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="username"
              >
                New Username
                <Field
                  className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
                  name="username"
                  type="text"
                  placeholder="Your new username..."
                />
                <ErrorMessage
                  className="error-message"
                  name="username"
                  component="span"
                />
              </label>

              <label
                className="block mt-4 text-base font-bold text-gray-700"
                htmlFor="newEmail"
              >
                New Email
                <Field
                  className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
                  name="newEmail"
                  type="email"
                  placeholder="Your new email..."
                />
                <ErrorMessage
                  className="error-message"
                  name="newEmail"
                  component="span"
                />
              </label>

              <label
                className="block mt-4 text-base font-bold text-gray-700"
                htmlFor="newPassword"
              >
                New Password
                <Field
                  className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
                  name="newPassword"
                  type="password"
                  placeholder="Your new password..."
                />
                <ErrorMessage
                  className="error-message"
                  name="newPassword"
                  component="span"
                />
              </label>

              <label
                className="block mt-4 text-base font-bold text-gray-700"
                htmlFor="currentEmail"
              >
                Current Email
                <input
                  className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
                  name="currentEmail"
                  type="email"
                  disabled
                  value={currentEmail}
                />
              </label>

              <label
                className="block mt-4 text-base font-bold text-gray-700"
                htmlFor="currentPassword"
              >
                Current Password
                <Field
                  className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-blue-700 hover:shadow-xl focus:border-blue-700"
                  name="currentPassword"
                  type="password"
                  placeholder="Your current password..."
                />
                <ErrorMessage
                  className="error-message"
                  name="currentPassword"
                  component="span"
                />
              </label>

              <div className="mt-6">
                <button
                  className={`${
                    isSubmitting ? 'opacity-50' : 'opacity-100'
                  } block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-blue-700 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 hover:text-blue-700 hover:bg-blue-100`}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Loading' : 'Update Profile'}
                </button>
              </div>

              <div className="mt-6">
                <button
                  className={`${
                    isSubmitting ? 'opacity-50' : 'opacity-100'
                  } block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-red-700 rounded-md focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 hover:text-red-700 hover:bg-red-100`}
                  disabled={isSubmitting}
                  onClick={async (evt) => {
                    evt.preventDefault()

                    // validate only currentPassword
                    if (errors.currentPassword) {
                      toast.error('Please input a valid current password')
                      return
                    }

                    // ask user permission
                    const userAgree = window.confirm(
                      'Are you sure you want to delete this account? \nThis action cannot be undone!'
                    )
                    if (!userAgree) return

                    try {
                      // reauthenticate first
                      await reauthenticate(values.currentPassword)

                      // DELETE in users collection + postedRoompies
                      await axios.delete(`/users?id=${user.uid}`)

                      // delete in auth & signOut the user (move this to client-side)
                      await user.delete()

                      // delete cookies in header
                      await axios.get('/auth/logout')

                      // on SUCCESS
                      setSubmitting(false)
                      toast.info('Your account deleted successfully')
                      return push('/')
                    } catch (err) {
                      toast.error(err.message)
                      console.error('onDelete error => ', err)
                      setSubmitting(false) // finish formik cycle
                    }
                  }}
                >
                  {isSubmitting ? 'Loading' : 'Delete Account'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
