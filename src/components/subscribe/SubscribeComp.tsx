import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import {
  FaAngleLeft,
  FaAngleRight,
  FaMinusCircle,
  FaPlusCircle,
} from 'react-icons/fa'
// files
import generateRupiah from 'utils/generateRupiah'
import { ISubscribePageProps } from 'pages/dashboard/subscribe'
import { subscribeSchema, TSubscribeSchema } from 'utils/yup/schema'

declare global {
  interface Window {
    snap: any
  }
}

export default function SubscribeComp({
  dbUser,
}: ISubscribePageProps): JSX.Element {
  const initialValues: TSubscribeSchema = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
  }

  // hooks
  const { back, push, reload } = useRouter()
  const [price] = useState<number>(20000)
  const [quantity, setQuantity] = useState<number>(1)

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.warning('Quantity cannot be less than 1')
      return
    }

    setQuantity((prev) => prev - 1)
  }

  const onSubscribe = async (
    values: TSubscribeSchema,
    actions: FormikHelpers<TSubscribeSchema>
  ) => {
    const { email, phone, firstName, lastName, address } = values

    const data = {
      user_id: dbUser.id,
      customer_details: {
        email,
        phone,
        first_name: firstName,
        last_name: lastName,
        billing_address: {
          email,
          address,
          phone,
          first_name: firstName,
          last_name: lastName,
          country_code: 'IDN',
        },
      },
      item_details: [
        {
          price, // harga per bulan
          quantity, // berapa bulan
          id: 'monthly-premium-account',
          name: 'Monthly Premium Account',
          brand: 'Roompy',
          category: 'Account',
          merchant_name: 'Midtrans',
        },
      ],
    }

    try {
      // POST req
      const res = await axios.post('/midtrans/transaction', data)

      // when POST success
      if (res.status === 201) {
        // pay midtrans
        // see more https://docs.midtrans.com/en/snap/advanced-feature?id=javascript-callback
        window.snap.pay(res.data.transaction.token, {
          onSuccess: (result: any) => {
            // when payment is successful.
            toast.success(
              'Payment successful. Please wait while we process the order'
            )
            console.info('onSuccess => ', result)
            return push('/dashboard')
          },
          onPending: (result: any) => {
            // when payment is pending, which is for payment that requires further customer action, such as bank transfer / VA
            toast.warning(
              'We send you an email. Please check it to complete the payment'
            )
            console.warn('onPending => ', result)
            return push('/dashboard')
          },
          onError: (err: any) => {
            // when there is a payment failure after several attempts
            toast.error('Server error. Please, try again later')
            console.error('onError => ', err)
            return reload()
          },
          onClose: () => {
            // when customer has closed the Snap popup
            toast.warning('You closed the popup without finishing the payment')
          },
        })

        actions.setSubmitting(false) // finish formik cycle
      }
    } catch (err) {
      toast.error(err.message)
      console.error(err)
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  useEffect(() => {
    // see more https://docs.midtrans.com/en/other/faq/technical?id=my-developer-uses-react-js-frontend-framework-and-is-unable-to-use-midtransminjssnapjs-what-should-i-do

    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
    //change this according to your client-key
    const myMidtransClientKey = 'SB-Mid-client-7GiXOKQvXG7nriAO'

    const scriptTag = document.createElement('script')
    scriptTag.src = midtransScriptUrl
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey)
    document.body.appendChild(scriptTag)

    // Then somewhere else on your React component,
    // `window.snap` and `window.Veritrans` object is imported & available to use

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  return (
    <main className="flex-1 pb-24 mt-12 bg-gray-100 md:mt-2 md:pb-5">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-yellow-700 to-gray-800">
          <h3 className="pl-2 font-bold">Subscribe</h3>
        </div>
      </div>

      <div className="container px-6 pt-4 mx-auto">
        <h1 className="text-2xl italic font-bold text-yellow-500">Checkout</h1>

        <div className="flex flex-col mt-8 lg:flex-row">
          <section className="order-2 w-full lg:w-1/2">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={subscribeSchema}
              onSubmit={onSubscribe}
            >
              {({ isSubmitting }) => (
                <Form className="lg:w-3/4">
                  <div className="flex flex-col justify-between w-full md:flex-row">
                    {/* firstName input */}
                    <div className="flex flex-col">
                      <h2 className="text-sm font-medium text-gray-500">
                        First Name
                      </h2>

                      <div className="flex mt-6">
                        <label className="flex-1 block" htmlFor="firstName">
                          <Field
                            className="block w-full mt-1 text-gray-700 border-b-2 rounded-md form-input hover:border-yellow-700 hover:shadow-xl focus:border-yellow-700"
                            placeholder="Your first name..."
                            type="text"
                            name="firstName"
                            autoFocus
                          />
                          <ErrorMessage
                            className="error-message"
                            name="firstName"
                            component="span"
                          />
                        </label>
                      </div>
                    </div>

                    {/* lastName input */}
                    <div className="flex flex-col mt-8 md:mt-0">
                      <h2 className="text-sm font-medium text-gray-500">
                        Last Name
                      </h2>

                      <div className="flex mt-6">
                        <label className="flex-1 block" htmlFor="lastName">
                          <Field
                            className="block w-full mt-1 text-gray-700 border-b-2 rounded-md form-input hover:border-yellow-700 hover:shadow-xl focus:border-yellow-700"
                            placeholder="Your last name..."
                            type="text"
                            name="lastName"
                          />
                          <ErrorMessage
                            className="error-message"
                            name="lastName"
                            component="span"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* email input */}
                  <div className="mt-8">
                    <h2 className="text-sm font-medium text-gray-500">Email</h2>

                    <div className="flex mt-6">
                      <label className="flex-1 block" htmlFor="email">
                        <Field
                          className="block w-full mt-1 text-gray-700 border-b-2 rounded-md form-input hover:border-yellow-700 hover:shadow-xl focus:border-yellow-700"
                          placeholder="Your email..."
                          name="email"
                          type="email"
                        />
                        <ErrorMessage
                          className="error-message"
                          name="email"
                          component="span"
                        />
                      </label>
                    </div>
                  </div>

                  {/* address input */}
                  <div className="mt-8">
                    <h2 className="text-sm font-medium text-gray-500">
                      Address
                    </h2>

                    <div className="flex mt-6">
                      <label className="flex-1 block" htmlFor="address">
                        <Field
                          className="block w-full mt-1 text-gray-700 border-b-2 rounded-md form-input hover:border-yellow-700 hover:shadow-xl focus:border-yellow-700"
                          placeholder="Your address..."
                          name="address"
                          type="text"
                        />
                        <ErrorMessage
                          className="error-message"
                          name="address"
                          component="span"
                        />
                      </label>
                    </div>
                  </div>

                  {/* phone input */}
                  <div className="mt-8">
                    <h2 className="text-sm font-medium text-gray-500">Phone</h2>

                    <div className="flex mt-6">
                      <label className="flex-1 block" htmlFor="phone">
                        <Field
                          className="block w-full mt-1 text-gray-700 border-b-2 rounded-md form-input hover:border-yellow-700 hover:shadow-xl focus:border-yellow-700"
                          placeholder="082244449999"
                          name="phone"
                          type="tel"
                        />
                        <ErrorMessage
                          className="error-message"
                          name="phone"
                          component="span"
                        />
                      </label>
                    </div>
                  </div>

                  {/* button proceed and go back */}
                  <div className="flex items-center justify-between mt-8">
                    <button
                      className="flex items-center text-sm font-medium text-gray-700 rounded hover:underline focus:outline-none"
                      onClick={() => back()}
                      disabled={isSubmitting}
                    >
                      <FaAngleLeft className="w-5 h-5" />
                      <span className="mx-2">Go Back</span>
                    </button>

                    <button
                      className={`${
                        isSubmitting ? 'opacity-50' : 'opacity-100'
                      } flex items-center px-3 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500 focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50`}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      <span>{isSubmitting ? 'Loading' : 'Proceed'}</span>
                      <FaAngleRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            {/* END FORM */}
          </section>

          <section className="flex-shrink-0 order-1 w-full mb-8 lg:w-1/2 lg:mb-0 lg:order-2">
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md px-4 py-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">Pilihan:</h3>
                  <span className="text-sm text-gray-600">Total Harga</span>
                </div>

                {/* Pilihan pertama per bulan */}
                <div className="flex justify-between mt-6">
                  <div className="flex">
                    <img
                      className="object-cover rounded w-14 h-14"
                      src="/roompy-canva.png"
                      alt="Roompy Premium Account"
                    />

                    <div className="mx-3">
                      <h3 className="text-sm text-gray-600">Akun Premium</h3>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => decreaseQuantity()}
                          className="text-gray-500 focus:outline-none focus:text-yellow-600 hover:text-red-600"
                        >
                          <FaMinusCircle className="w-5 h-5" />
                        </button>

                        <span className="mx-2 text-gray-700">
                          {quantity} bulan
                        </span>

                        <button
                          onClick={() => setQuantity((prev) => prev + 1)}
                          className="text-gray-500 focus:outline-none focus:text-yellow-600 hover:text-yellow-600"
                        >
                          <FaPlusCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className="text-gray-600">
                    {generateRupiah(price * quantity)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
