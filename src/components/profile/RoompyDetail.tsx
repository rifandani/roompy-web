import React, { useState, useContext, MouseEvent } from 'react';
import {
  FaCrown,
  FaRegCalendarAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWifi,
  FaShower,
  FaMapMarkerAlt,
  FaGenderless,
} from 'react-icons/fa';
import {
  GiAges,
  GiCigarette,
  GiHomeGarage,
  GiMale,
  GiSandsOfTime,
  GiSittingDog,
} from 'react-icons/gi';
import {
  HiOutlineCurrencyDollar,
  HiExclamationCircle,
  HiBadgeCheck,
  HiStar,
  HiCheck,
  HiOutlineHome,
} from 'react-icons/hi';
import { IoLogoWhatsapp } from 'react-icons/io';
// files
import UserContext from '../../contexts/UserContext';

export default function RoompyDetail() {
  // state
  const [message, setMessage] = useState<string>('');

  // UserContext
  const { user } = useContext(UserContext);

  async function submitMessage(e: MouseEvent) {
    e.preventDefault();

    alert(message);
  }

  return (
    <article className="mx-auto bg-white max-w-7xl">
      {/* <!-- Image Header --> */}
      <header className="container relative w-full mx-auto">
        {/* image */}
        <div className="flex items-center justify-center py-10">
          <img className="object-cover w-64 rounded-md" src="/me.jpg" />
        </div>

        {/* add to favorite */}
        <div
          onClick={() => {}}
          className="absolute top-0 right-0 flex items-center px-3 py-1 mt-5 mr-5 transition duration-500 transform border border-yellow-500 rounded-md cursor-pointer hover:scale-125"
        >
          <HiStar className="text-lg text-yellow-500" />

          <p className="ml-1 text-base text-gray-500">Add to favorite</p>
        </div>
      </header>

      {/* details */}
      <div className="container flex flex-wrap py-6 mx-auto">
        {/* <!-- Post Section --> */}
        <section className="flex flex-col w-full px-3 md:w-2/3">
          {/* first box */}
          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              {/* name + gender + age */}
              <div className="flex items-center pb-4">
                <p className="text-2xl font-bold">Rifandani</p>

                <div className="flex items-center ml-3">
                  <GiMale className="text-2xl text-blue-500" />

                  <span className="ml-2 text-lg">30 tahun</span>
                </div>
              </div>

              {/* badges => premium / verified */}
              <div className="flex space-x-3">
                <section className="flex items-center px-3 py-1 transition duration-500 transform bg-yellow-200 border rounded-md cursor-pointer hover:scale-125">
                  <FaCrown className="text-xl text-yellow-500" />

                  <p className="ml-3 font-semibold text-yellow-700 uppercase">
                    Premium
                  </p>
                </section>

                <section className="flex items-center px-3 py-1 transition duration-500 transform bg-purple-200 border rounded-md cursor-pointer hover:scale-125">
                  <HiBadgeCheck className="text-xl text-purple-500" />

                  <p className="ml-3 font-semibold text-purple-700 uppercase">
                    Verified user
                  </p>
                </section>

                <section className="flex items-center px-3 py-1 transition duration-500 transform bg-green-200 border rounded-md cursor-pointer hover:scale-125">
                  <IoLogoWhatsapp className="text-xl text-green-500" />

                  <p className="ml-3 font-semibold text-green-700 uppercase">
                    Free to message
                  </p>
                </section>
              </div>

              <hr className="my-5 text-gray-500" />

              {/* first row => budget + stay length + move date */}
              <div className="flex justify-evenly">
                <section className="flex flex-col items-center space-x-3 space-y-1 lg:flex-row">
                  <HiOutlineCurrencyDollar className="text-3xl text-green-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">
                      Rp 865000 <small>/bln</small>
                    </p>
                    <p className="text-sm italic">Budget</p>
                  </div>
                </section>

                <section className="flex flex-col items-center space-x-3 space-y-1 lg:flex-row">
                  <GiSandsOfTime className="text-3xl text-purple-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">12 bulan</p>
                    <p className="text-sm italic">Stay length</p>
                  </div>
                </section>

                <section className="flex flex-col items-center space-x-3 space-y-1 lg:flex-row">
                  <FaRegCalendarAlt className="text-3xl text-yellow-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">30/12/2020</p>
                    <p className="text-sm italic">Move date</p>
                  </div>
                </section>
              </div>
            </div>
          </article>

          {/* second box */}
          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              <div className="flex items-center">
                <p className="pb-4 text-xl font-bold">About Me</p>
              </div>

              <p className="pb-6 text-gray-500">
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

              <div className="flex items-center space-x-3">
                {/* occupation */}
                <span className="flex items-center px-2 py-1 border border-green-500 rounded-md">
                  <HiCheck className="mr-1 text-xl text-green-500" />

                  <p className="text-base">Mahasiswa</p>
                </span>

                {/* smoker */}
                <span className="flex items-center px-2 py-1 border border-green-500 rounded-md">
                  <HiCheck className="mr-1 text-xl text-green-500" />

                  <p className="text-base">Non-smoker</p>
                </span>

                {/* pets */}
                <span className="flex items-center px-2 py-1 border border-green-500 rounded-md">
                  <HiCheck className="mr-1 text-xl text-green-500" />

                  <p className="text-base">No pets</p>
                </span>

                {/* children */}
                <span className="flex items-center px-2 py-1 border border-green-500 rounded-md">
                  <HiCheck className="mr-1 text-xl text-green-500" />

                  <p className="text-base">No children</p>
                </span>
              </div>
            </div>
          </article>

          {/* third box */}
          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              <div className="flex items-center">
                <p className="pb-4 text-xl font-bold">Home Preferences</p>
              </div>

              <div className="flex flex-col justify-center space-y-3 text-gray-500">
                {/* tipe */}
                <span className="flex items-center px-2 py-1">
                  <HiOutlineHome className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Tipe: <strong className="">Satu Kamar</strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong className="font-normal line-through">
                      Satu Rumah
                    </strong>
                  </p>
                </span>

                {/* tempat parkir */}
                <span className="flex items-center px-2 py-1">
                  <GiHomeGarage className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Tempat parkir:{' '}
                    <strong className="font-normal line-through">
                      Required
                    </strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong className="">Flexible</strong>
                  </p>
                </span>

                {/* wifi */}
                <span className="flex items-center px-2 py-1">
                  <FaWifi className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    WiFi: <strong className="">Required</strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong className="font-normal line-through">
                      Flexible
                    </strong>
                  </p>
                </span>

                {/* kamar mandi */}
                <span className="flex items-center px-2 py-1">
                  <FaShower className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Kamar Mandi:{' '}
                    <strong className="font-normal line-through">Dalam</strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong className="">Flexible</strong>
                  </p>
                </span>
              </div>
            </div>
          </article>

          {/* fourth box */}
          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              <div className="flex items-center">
                <p className="pb-4 text-xl font-bold">Roompies Preferences</p>
              </div>

              <div className="flex flex-col justify-center space-y-3 text-gray-500">
                {/* gender */}
                <span className="flex items-center px-2 py-1">
                  <FaGenderless className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Jenis kelamin: <strong className="">Pria</strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong className="font-normal line-through">Wanita</strong>
                    <strong className="mx-2">/</strong>{' '}
                    <strong className="font-normal line-through">
                      Flexible
                    </strong>
                  </p>
                </span>

                {/* age */}
                <span className="flex items-center px-2 py-1">
                  <GiAges className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Rentang usia: <strong className="">20</strong>{' '}
                    <strong className="mx-1">-</strong>{' '}
                    <strong className="">30</strong>
                    <strong className="ml-1">tahun</strong>{' '}
                  </p>
                </span>

                {/* smoker */}
                <span className="flex items-center px-2 py-1">
                  <GiCigarette className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Merokok:{' '}
                    <strong className="font-normal line-through">Okay</strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong className="">Not Okay</strong>
                  </p>
                </span>

                {/* pet */}
                <span className="flex items-center px-2 py-1">
                  <GiSittingDog className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Hewan Peliharaan:{' '}
                    <strong className="font-normal line-through">Okay</strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong className="">Not Okay</strong>
                  </p>
                </span>
              </div>
            </div>
          </article>

          {/* fifth box */}
          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              <div className="flex items-center">
                <p className="pb-4 text-xl font-bold">Location Preferences</p>
              </div>

              <div className="flex items-center space-x-3">
                {/* occupation */}
                <span className="flex items-center px-2 py-1 border border-green-500 rounded-md">
                  <FaMapMarkerAlt className="mr-1 text-xl text-green-500" />

                  <p className="text-base">Kota Balikpapan</p>
                </span>

                {/* smoker */}
                <span className="flex items-center px-2 py-1 border border-green-500 rounded-md">
                  <FaMapMarkerAlt className="mr-1 text-xl text-green-500" />

                  <p className="text-base">Kota Yogyakarta</p>
                </span>
              </div>
            </div>
          </article>

          {/* bottom user info */}
          <article className="flex flex-col w-full p-6 my-4 text-center bg-white shadow md:text-left md:flex-row">
            {/* user image */}
            <div className="flex justify-center w-full pb-4 md:w-2/5 md:justify-start xl:w-1/5">
              <img className="w-32 h-32 rounded-full shadow" src="/me.jpg" />
            </div>

            {/* user simple info */}
            <div className="flex flex-col justify-center flex-1 md:justify-start">
              <p className="text-2xl font-semibold">Rifandani</p>

              <span className="flex items-center justify-center py-4 md:justify-start">
                {user ? (
                  <>
                    <IoLogoWhatsapp className="text-2xl text-green-500" />

                    <p className="ml-2 text-lg italic text-green-500">
                      +6282243199535
                    </p>
                  </>
                ) : (
                  <p className="text-lg italic text-red-500">
                    Please login to see Rifandani's number
                  </p>
                )}
              </span>

              {/* verified social media */}
              <div className="flex items-center justify-center space-x-4 text-2xl md:justify-start">
                <FaFacebook
                  onClick={() => {}}
                  className="text-blue-500 transition duration-500 transform cursor-pointer hover:scale-125"
                />
                <FaInstagram
                  onClick={() => {}}
                  className="text-red-500 transition duration-500 transform cursor-pointer hover:scale-125"
                />
                <FaTwitter
                  onClick={() => {}}
                  className="text-blue-400 transition duration-500 transform cursor-pointer hover:scale-125"
                />
                <FaLinkedin
                  onClick={() => {}}
                  className="text-blue-500 transition duration-500 transform cursor-pointer hover:scale-125"
                />
              </div>
            </div>
          </article>
        </section>

        {/* <!-- Sidebar Section --------------------------------------------------------------> */}
        <aside className="flex flex-col items-center w-full px-3 md:w-1/3">
          {/* form message */}
          <section className="flex flex-col w-full p-6 my-4 shadow bg-gray-50">
            <p className="pb-5 text-xl font-semibold text-center truncate">
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
                  rows={5}
                  disabled={user ? false : true}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </label>

              <button
                className="flex items-center justify-center w-full px-2 py-3 mt-4 text-sm font-bold tracking-wider uppercase bg-purple-100 rounded-md text-FaShower focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-white hover:bg-purple-700"
                type="submit"
                disabled={user ? false : true}
                onClick={(e) => submitMessage(e)}
              >
                {user ? 'Submit Message' : 'Login to message'}
              </button>
            </form>
          </section>

          {/* report user */}
          <section
            onClick={() => {}}
            className="flex items-center justify-center w-full p-3 my-4 space-x-2 rounded-md cursor-pointer hover:bg-red-100 hover:shadow"
          >
            <HiExclamationCircle className="text-2xl text-red-500" />

            <p className="text-base text-gray-500">Report this roompies</p>
          </section>
        </aside>
      </div>
    </article>
  );
}
