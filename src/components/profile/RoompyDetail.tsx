import {
  FaCrown,
  FaRegCalendarAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import { GiMale } from 'react-icons/gi';
import {
  HiOutlinePhoneIncoming,
  HiOutlineCurrencyDollar,
  HiExclamationCircle,
} from 'react-icons/hi';
import { SiGooglecalendar } from 'react-icons/si';

export default function RoompyDetail() {
  return (
    <article className="mx-auto mt-3 bg-white max-w-7xl">
      {/* <!-- Text Header --> */}
      <header className="container w-full mx-auto">
        <div className="flex flex-col items-center py-12">
          <a
            className="text-5xl font-bold text-gray-800 uppercase hover:text-gray-700"
            href="#"
          >
            User Image / bisa juga Room image carousel
          </a>
        </div>
      </header>

      {/* <!-- Topic Nav --> */}
      {/* x-data="{ open: false }" */}
      <nav className="w-full py-4 bg-gray-100 border-t border-b">
        <div className="block sm:hidden">
          {/* @click="open = !open" */}
          <a
            href="#"
            className="flex items-center justify-center text-base font-bold text-center uppercase md:hidden"
          >
            Topics
            {/* :className="open ? 'fa-chevron-down': 'fa-chevron-up'" */}
            <i className="ml-2 fas"></i>
          </a>
        </div>

        {/*  :className="open ? 'block': 'hidden' */}
        <div className="flex-grow w-full sm:flex sm:items-center sm:w-auto ">
          <div className="container flex flex-col items-center justify-center w-full px-6 py-2 mx-auto mt-0 text-sm font-bold uppercase sm:flex-row">
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Link
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Link
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Link
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Link
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Link
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Link
            </a>
          </div>
        </div>
      </nav>

      {/* details */}
      <div className="container flex flex-wrap py-6 mx-auto">
        {/* <!-- Post Section --> */}
        <section className="flex flex-col items-center w-full px-3 md:w-2/3">
          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              {/* name + gender + age */}
              <div className="flex items-center pb-4">
                <p className="text-2xl font-bold hover:text-gray-700">
                  Rifandani
                </p>

                <div className="flex items-center ml-3">
                  <GiMale className="text-2xl text-blue-500" />

                  <span className="ml-2 text-lg">30 tahun</span>
                </div>
              </div>

              {/* badges => premium / verified */}
              <div className="flex space-x-3">
                <section className="flex items-center px-3 py-1 bg-yellow-200 border rounded-md">
                  <FaCrown className="text-xl text-yellow-500" />

                  <p className="ml-3 font-semibold text-yellow-700 uppercase">
                    Premium
                  </p>
                </section>

                <section className="flex items-center px-3 py-1 bg-green-200 border rounded-md">
                  <HiOutlinePhoneIncoming className="text-xl text-green-500" />

                  <p className="ml-3 font-semibold text-green-700 uppercase">
                    Free to message
                  </p>
                </section>
              </div>

              <hr className="my-3 text-gray-500" />

              {/* first row => budget + stay length + move date */}
              <div className="flex justify-evenly">
                <section className="flex flex-col items-center space-x-2 space-y-1 lg:flex-row">
                  <HiOutlineCurrencyDollar className="text-3xl text-green-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">
                      Rp 865000 <small>/bln</small>
                    </p>
                    <p className="text-sm italic">Budget</p>
                  </div>
                </section>

                <section className="flex flex-col items-center space-x-2 space-y-1 lg:flex-row">
                  <FaRegCalendarAlt className="text-3xl text-purple-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">12 bulan</p>
                    <p className="text-sm italic">Stay length</p>
                  </div>
                </section>

                <section className="flex flex-col items-center space-x-2 space-y-1 lg:flex-row">
                  <SiGooglecalendar className="text-3xl text-red-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">30/12/2020</p>
                    <p className="text-sm italic">Move date</p>
                  </div>
                </section>
              </div>

              {/* second row => budget + stay length + move date */}
            </div>
          </article>

          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              <div className="flex items-center">
                <p className="pb-4 text-3xl font-bold hover:text-gray-700">
                  Description
                </p>
              </div>

              <p className="pb-8 text-sm">asdasdasdadasdasd</p>

              <h1 className="pb-3 text-2xl font-bold">Introduction</h1>

              <p className="pb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel neque non libero suscipit suscipit eu eu urna.
                Proin bibendum urna mattis ante malesuada ultrices. Etiam in
                turpis vitae elit dictum aliquet. Donec mattis risus in turpis
                dapibus, eget tempus sem tincidunt. Orci varius natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. In est enim, imperdiet sed ornare quis, pellentesque vel
                risus. Nunc vitae vestibulum turpis. Quisque eget eleifend urna.
                Etiam et vulputate purus, ut egestas sem. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Duis quis neque non urna venenatis mollis et at massa.
                Pellentesque sem lacus, malesuada vel hendrerit molestie, mollis
                vel elit.
              </p>
            </div>
          </article>

          <div className="flex w-full pt-6">
            <a
              href="#"
              className="w-1/2 p-6 text-left bg-white shadow hover:shadow-md"
            >
              <p className="flex items-center text-lg font-bold text-blue-800">
                <i className="pr-1 fas fa-arrow-left"></i> Previous
              </p>
              <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
            </a>
            <a
              href="#"
              className="w-1/2 p-6 text-right bg-white shadow hover:shadow-md"
            >
              <p className="flex items-center justify-end text-lg font-bold text-blue-800">
                Next <i className="pl-1 fas fa-arrow-right"></i>
              </p>
              <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
            </a>
          </div>

          <div className="flex flex-col w-full p-6 mt-10 mb-10 text-center bg-white shadow md:text-left md:flex-row">
            <div className="flex justify-center w-full pb-4 md:w-1/5 md:justify-start">
              <img
                src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
                className="w-32 h-32 rounded-full shadow"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 md:justify-start">
              <p className="text-2xl font-semibold">David</p>
              <p className="pt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel neque non libero suscipit suscipit eu eu urna.
              </p>
              <div className="flex items-center justify-center pt-4 text-2xl text-blue-800 no-underline md:justify-start">
                <a className="" href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a className="pl-4" href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a className="pl-4" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="pl-4" href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Sidebar Section --> */}
        <aside className="flex flex-col items-center w-full px-3 md:w-1/3">
          {/* form message */}
          <section className="flex flex-col w-full p-6 my-4 bg-gray-100 shadow">
            <p className="pb-5 text-xl font-semibold text-center">
              Message Rifandani
            </p>

            <form>
              <label htmlFor="message">
                <textarea
                  className="w-full p-3 bg-white border rounded-md outline-none appearance-none hover:border-purple-700 focus:border-purple-700"
                  name="message"
                  id="message"
                  placeholder="Write your message here..."
                  required
                  onChange={() => {}}
                  // value={}
                />
              </label>

              <button
                className="flex items-center justify-center w-full px-2 py-3 mt-4 text-sm font-bold tracking-wider text-white uppercase bg-purple-700 rounded-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-purple-700 hover:bg-purple-100"
                type="submit"
                onClick={() => {}}
                // disabled
              >
                Submit Message
              </button>
            </form>
          </section>

          {/* social media list */}
          <section className="flex flex-col items-center w-full p-6 my-4 bg-gray-100 rounded-md shadow">
            <p className="pb-5 text-xl font-semibold text-gray-900">
              Verified Social Media
            </p>

            <div className="flex justify-center space-x-5">
              <FaFacebook className="text-2xl text-blue-500" />
              <FaInstagram className="text-2xl text-red-500" />
              <FaTwitter className="text-2xl text-blue-400" />
              <FaLinkedin className="text-2xl text-blue-500" />
            </div>
          </section>

          {/* report user */}
          <section className="flex items-center justify-center w-full p-3 my-4 space-x-3 rounded-md hover:bg-purple-100 hover:shadow">
            <HiExclamationCircle className="text-2xl text-red-500" />

            <p className="font-mono text-base text-gray-900 hover:text-purple-700">
              Report this roompies
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
}
