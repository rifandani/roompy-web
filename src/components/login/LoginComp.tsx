import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import { auth } from 'configs/firebaseConfig'
import { loginSchema, TLoginSchema } from 'utils/yup/schema'

export default function LoginComp(): JSX.Element {
  const initialValues: TLoginSchema = {
    email: '',
    password: '',
  }

  // hooks
  const { push } = useRouter()

  async function onLogin(
    values: TLoginSchema,
    actions: FormikHelpers<TLoginSchema>
  ): Promise<void> {
    try {
      // save to firebase auth in client-side, biar useAuth/UserContext bisa ke trigger
      const userCred = await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      )

      // POST login
      await axios.post('/auth/login', {
        id: userCred.user.uid,
      })

      // on SUCCESS
      await push('/dashboard')
      toast.success(`Welcome Back, ${userCred.user.displayName}`)
    } catch (err) {
      console.error('onLogin error => ', err)
      toast.error(err.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  return (
    // <!-- Page Container -->
    <div className="relative flex justify-center min-h-screen pt-10 text-gray-900 bg-gray-100 lg:pt-16">
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
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={onLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <label className="block text-sm text-gray-700" htmlFor="email">
                  Email
                  <Field
                    className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                    placeholder="elonmusk@email.com"
                    type="email"
                    name="email"
                    autoFocus
                  />
                  <ErrorMessage
                    className="error-message"
                    name="email"
                    component="span"
                  />
                </label>

                <label
                  className="block mt-4 text-sm text-gray-700"
                  htmlFor="password"
                >
                  Password
                  <Field
                    className="block w-full px-4 py-3 mt-1 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
                    placeholder="******"
                    type="password"
                    name="password"
                  />
                  <ErrorMessage
                    className="error-message"
                    name="password"
                    component="span"
                  />
                </label>

                <div className="mt-6">
                  <button
                    className="block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-purple-700 rounded-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-purple-700 hover:bg-purple-100 disabled:opacity-50"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Loading...' : 'Login'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

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
  )
}
