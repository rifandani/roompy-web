import { FiPhoneCall, FiHome, FiMail } from 'react-icons/fi';

export default function Contact() {
  async function contact() {
    alert('contact');
  }

  return (
    <section className="min-h-full w-full relative overflow-hidden py-20 px-4">
      <h2 className="px-8 pt-6 text-4xl sm:text-5xl md:text-6xl tracking-tight leading-10 sm:leading-none font-extrabold text-center text-gray-900">
        Contact
        <span className="text-purple-700"> Us</span>
      </h2>

      <p className="px-8 mt-5 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 italic text-base text-center text-gray-500">
        Jika ada masukan ataupun pertanyaan, silahkan mengisi form berikut.
        <br />
        Kami selalu terbuka dengan kritik dan ide yang menarik.
      </p>

      {/* form */}
      <div className="w-full max-w-2xl mx-auto mt-10">
        <form>
          <div className="flex mb-4 -mx-2">
            {/* input name */}
            <div className="w-1/2 px-2">
              <input
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-purple-200 focus:border-purple-700 rounded-md focus:outline-none hover:shadow-xl"
                placeholder="Name"
                required
                minLength={3}
              />
            </div>

            {/* input email*/}
            <div className="w-1/2 px-2">
              <input
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-purple-200 focus:border-purple-700 rounded-md focus:outline-none hover:shadow-xl"
                placeholder="Email"
                required
              />
            </div>
          </div>

          {/* message textarea */}
          <div className="mb-4">
            <textarea
              className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-purple-200 focus:border-purple-700 rounded-md focus:outline-none hover:shadow-xl"
              placeholder="Write something..."
              required
              rows={5}
              minLength={10}
            />
          </div>

          {/* submit button */}
          <div>
            <button
              className="font-bold tracking-wider uppercase rounded-md focus:outline-none focus:shadow-outline hover:text-purple-700 hover:bg-purple-100 text-white bg-purple-700 inline-block w-full py-4 px-8"
              type="submit"
              onClick={contact}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center md:flex-row md:justify-center -mx-4 mt-5">
        <div className="px-4 flex items-center">
          <FiHome className="inline-block text-md mr-2 text-purple-700" />
          <span className="align-text-bottom">Jalan Gejayan Gang Sambu</span>
        </div>

        <div className="px-4 flex items-center">
          <FiPhoneCall className="inline-block text-md mr-2 text-purple-700" />
          <span>+62 822 4319 9535</span>
        </div>

        <div className="px-4 flex items-center">
          <FiMail className="inline-block text-md mr-2 text-purple-700" />
          <span>tri@usako.net</span>
        </div>
      </div>
    </section>
  );
}
