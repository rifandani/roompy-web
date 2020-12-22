import { FiPhoneCall, FiHome, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useForm, ValidationError } from '@formspree/react';
// files

export default function Contact() {
  // formspree
  const [state, handleSubmit] = useForm('contact');

  if (state.succeeded) {
    toast.success('Thank You. We will reply soon.');
  }

  return (
    <section className="relative w-full min-h-full px-4 py-20 overflow-hidden bg-white">
      <h2 className="px-8 pt-6 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl sm:leading-none">
        Contact
        <span className="text-purple-700"> Us</span>
      </h2>

      <p className="px-8 mt-5 text-base italic text-center text-gray-500 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0">
        Jika ada masukan ataupun pertanyaan, silahkan mengisi form berikut.
        <br />
        Kami selalu terbuka dengan kritik dan ide yang menarik.
      </p>

      {/* form */}
      <div className="w-full max-w-2xl mx-auto mt-10">
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="flex mb-4 -mx-2">
            {/* input name */}
            <div className="w-1/2 px-2">
              <label htmlFor="username">
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-purple-200 rounded-md appearance-none focus:bg-white focus:border-purple-700 focus:outline-none hover:shadow-xl"
                  placeholder="Name"
                  name="username"
                  id="username"
                  minLength={3}
                  required
                />
              </label>

              <ValidationError
                prefix="Name"
                field="username"
                errors={state.errors}
              />
            </div>

            {/* input email*/}
            <div className="w-1/2 px-2">
              <label htmlFor="email">
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-purple-200 rounded-md appearance-none focus:bg-white focus:border-purple-700 focus:outline-none hover:shadow-xl"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  required
                />

                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </label>
            </div>
          </div>

          {/* message textarea */}
          <div className="mb-4">
            <label htmlFor="message">
              <textarea
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-purple-200 rounded-md appearance-none focus:bg-white focus:border-purple-700 focus:outline-none hover:shadow-xl"
                placeholder="Write something..."
                minLength={10}
                rows={5}
                name="message"
                id="message"
                required
              />
            </label>

            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          {/* submit button */}
          <div>
            <button
              className="inline-block w-full px-8 py-4 font-bold tracking-wider text-white uppercase bg-purple-700 rounded-md focus:outline-none focus:shadow-outline hover:text-purple-700 hover:bg-purple-100"
              type="submit"
              disabled={state.submitting}
              // onClick={contact}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center mt-5 -mx-4 md:flex-row md:justify-center">
        <div className="flex items-center px-4">
          <FiHome className="inline-block mr-2 text-purple-700 text-md" />
          <span className="align-text-bottom">Jalan Gejayan Gang Sambu</span>
        </div>

        <div className="flex items-center px-4">
          <FiPhoneCall className="inline-block mr-2 text-purple-700 text-md" />
          <span>+62 822 4319 9535</span>
        </div>

        <div className="flex items-center px-4">
          <FiMail className="inline-block mr-2 text-purple-700 text-md" />
          <span>tri@usako.net</span>
        </div>
      </div>
    </section>
  );
}
