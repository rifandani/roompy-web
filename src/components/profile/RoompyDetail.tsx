import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useContext, MouseEvent } from 'react'
import {
  FaCrown,
  FaRegCalendarAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWifi,
  FaShower,
  FaMapMarkerAlt,
  FaGenderless,
  FaHandPointLeft,
} from 'react-icons/fa'
import {
  GiAges,
  GiCigarette,
  GiHomeGarage,
  GiMale,
  GiFemale,
  GiSandsOfTime,
  GiSittingDog,
} from 'react-icons/gi'
import {
  HiOutlineCurrencyDollar,
  HiExclamationCircle,
  HiBadgeCheck,
  HiStar,
  HiCheck,
  HiOutlineHome,
} from 'react-icons/hi'
import { IoLogoWhatsapp } from 'react-icons/io'
import { toast } from 'react-toastify'
// files
import UserContext from '../../contexts/UserContext'
import axiosErrorHandle from '../../utils/axiosErrorHandle'
import { Roompy } from '../../utils/interfaces'
import MyModal from '../MyModal'

export default function RoompyDetail({ roompy }: { roompy: Roompy }) {
  // state
  const [message, setMessage] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAlreadyFav, setIsAlreadyFav] = useState<boolean>(false)

  // useRouter
  const { back } = useRouter()

  // UserContext
  const { user } = useContext(UserContext)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    if (!user) {
      return toast.warning('Please login to report roompies')
    }

    setIsOpen(true)
  }

  async function submitMessage(e: MouseEvent) {
    e.preventDefault()

    console.log(message)

    // when all done
    toast.success('Message delivered. Please wait for the reply.')
  }

  async function onAddToFavorite() {
    if (!user) {
      return toast.warning('Please login first')
    }

    try {
      const resp = await axios.post('/favorites/roompies', {
        userId: user.uid,
        roompyId: roompy.id,
      })

      if (resp.status === 400) {
        // on ALREADY FAVORITED
        toast.warning('This roompy is already favorited')
      } else {
        // on SUCCESS
        toast.success('Added to your favorites list')
      }

      setIsAlreadyFav(true)
    } catch (err) {
      // on ERROR
      axiosErrorHandle(err)
      toast.error(err.message)
    }
  }

  return (
    <article className="mx-auto bg-white max-w-7xl">
      {/* report modal */}
      <MyModal isOpen={isOpen} closeModal={closeModal} roompyId={roompy.id} />

      {/* <!-- Image Header --> */}
      <header className="container relative w-full mx-auto">
        {/* image */}
        <div className="flex items-center justify-center pt-10 pb-3">
          <img
            className="object-cover w-64 mt-8 rounded-md md:w-80 xl:w-96 md:mt-0"
            src={roompy.photoURL}
            alt={roompy.name}
          />
        </div>

        {/* back button */}
        <button
          onClick={() => back()}
          className="focus:outline-none focus:ring focus:ring-red-200 absolute top-0 left-0 flex items-center px-3 py-1 mt-5 ml-5 transition duration-500 transform border border-red-500 rounded-md cursor-pointer hover:scale-110"
        >
          <FaHandPointLeft className="text-lg text-red-500" />

          <p className="ml-1 text-base text-gray-500">Go back</p>
        </button>

        {/* add to favorite */}
        <button
          onClick={onAddToFavorite}
          className="focus:outline-none focus:ring focus:ring-yellow-200 absolute top-0 right-0 flex items-center px-3 py-1 mt-5 mr-5 transition duration-500 transform border border-yellow-500 rounded-md cursor-pointer hover:scale-110"
          disabled={isAlreadyFav}
        >
          <HiStar className="text-lg text-yellow-500" />

          <p className="ml-1 text-base text-gray-500">
            {isAlreadyFav ? 'Already Favorited' : 'Add to favorite'}
          </p>
        </button>
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
                <p className="text-2xl font-bold">{roompy.name}</p>

                <div className="flex items-center ml-3">
                  {roompy.gender === 'Pria' ? (
                    <GiMale className="text-2xl text-blue-500" />
                  ) : (
                    <GiFemale className="text-2xl text-pink-500" />
                  )}

                  <span className="ml-2 text-lg">{roompy.age} tahun</span>
                </div>
              </div>

              {/* badges => premium / verified */}
              <div className="flex flex-wrap items-center">
                <section className="flex items-center px-3 py-1 mb-2 mr-2 transition duration-500 transform bg-yellow-200 border rounded-md cursor-pointer hover:scale-125">
                  <FaCrown className="text-xl text-yellow-500" />

                  <p className="ml-3 font-semibold text-yellow-700 uppercase">
                    Premium
                  </p>
                </section>

                <section className="flex items-center px-3 py-1 mb-2 mr-2 transition duration-500 transform bg-purple-200 border rounded-md cursor-pointer hover:scale-125">
                  <HiBadgeCheck className="text-xl text-purple-500" />

                  <p className="ml-3 font-semibold text-purple-700 uppercase">
                    Verified
                  </p>
                </section>

                <section className="flex items-center px-3 py-1 mb-2 transition duration-500 transform bg-green-200 border rounded-md cursor-pointer hover:scale-125">
                  <IoLogoWhatsapp className="text-xl text-green-500" />

                  <p className="ml-3 font-semibold text-green-700 uppercase">
                    Free to message
                  </p>
                </section>
              </div>

              <hr className="my-4 text-gray-500" />

              {/* first row => budget + stay length + move date */}
              <div className="flex justify-evenly">
                <section className="flex flex-col items-center space-x-3 space-y-1 lg:flex-row">
                  <HiOutlineCurrencyDollar className="text-3xl text-green-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0,
                      }).format(roompy.budget)}{' '}
                      <small>/bln</small>
                    </p>
                    <p className="text-sm italic">Budget</p>
                  </div>
                </section>

                <section className="flex flex-col items-center space-x-3 space-y-1 lg:flex-row">
                  <GiSandsOfTime className="text-3xl text-purple-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">
                      {roompy.stayLength} Minggu
                    </p>
                    <p className="text-sm italic">Stay length</p>
                  </div>
                </section>

                <section className="flex flex-col items-center space-x-3 space-y-1 lg:flex-row">
                  <FaRegCalendarAlt className="text-3xl text-yellow-500" />

                  <div className="flex flex-col items-center">
                    <p className="text-base font-semibold">
                      {new Date(roompy.moveDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
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

              <p className="pb-6 text-gray-500">{roompy.desc}</p>

              <div className="flex flex-wrap items-center">
                {/* occupation */}
                <span className="flex items-center px-2 py-1 mb-2 mr-2 border border-green-500 rounded-md">
                  <HiCheck className="mr-1 text-xl text-green-500" />

                  <p className="text-base">{roompy.occupation}</p>
                </span>

                {/* smoker */}
                <span className="flex items-center px-2 py-1 mb-2 mr-2 border border-green-500 rounded-md">
                  <HiCheck className="mr-1 text-xl text-green-500" />

                  {roompy.smoker ? (
                    <p className="text-base">Smoker</p>
                  ) : (
                    <p className="text-base">Non-smoker</p>
                  )}
                </span>

                {/* pets */}
                <span className="flex items-center px-2 py-1 mb-2 mr-2 border border-green-500 rounded-md">
                  <HiCheck className="mr-1 text-xl text-green-500" />

                  {roompy.ownPet ? (
                    <p className="text-base">Has pets</p>
                  ) : (
                    <p className="text-base">No pets</p>
                  )}
                </span>

                {/* children */}
                <span className="flex items-center px-2 py-1 mb-2 mr-2 border border-green-500 rounded-md">
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
                <span className="flex items-center">
                  <HiOutlineHome className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Tipe:{' '}
                    <strong
                      className={
                        roompy.homePref.room.includes('kamar')
                          ? ''
                          : 'font-normal line-through'
                      }
                    >
                      Satu Kamar
                    </strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong
                      className={
                        roompy.homePref.room.includes('rumah')
                          ? ''
                          : 'font-normal line-through'
                      }
                    >
                      Satu Rumah
                    </strong>
                    <strong className="mx-2">/</strong>{' '}
                    <strong
                      className={
                        roompy.homePref.room.includes('lex')
                          ? ''
                          : 'font-normal line-through'
                      }
                    >
                      Flexible
                    </strong>
                  </p>
                </span>

                {/* tempat parkir */}
                <span className="flex items-center">
                  <GiHomeGarage className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Tempat parkir:{' '}
                    <strong
                      className={
                        roompy.homePref.parking.includes('red')
                          ? ''
                          : 'font-normal line-through'
                      }
                    >
                      Required
                    </strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong
                      className={
                        roompy.homePref.parking.includes('red')
                          ? 'font-normal line-through'
                          : ''
                      }
                    >
                      Flexible
                    </strong>
                  </p>
                </span>

                {/* wifi */}
                <span className="flex items-center">
                  <FaWifi className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    WiFi:{' '}
                    <strong
                      className={
                        roompy.homePref.wifi.includes('red')
                          ? ''
                          : 'font-normal line-through'
                      }
                    >
                      Required
                    </strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong
                      className={
                        roompy.homePref.wifi.includes('red')
                          ? 'font-normal line-through'
                          : ''
                      }
                    >
                      Flexible
                    </strong>
                  </p>
                </span>

                {/* kamar mandi */}
                <span className="flex items-center">
                  <FaShower className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Kamar Mandi:{' '}
                    <strong
                      className={
                        roompy.homePref.bathroom.includes('lam')
                          ? ''
                          : 'font-normal line-through'
                      }
                    >
                      Dalam
                    </strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong
                      className={
                        roompy.homePref.bathroom.includes('lam')
                          ? 'font-normal line-through'
                          : ''
                      }
                    >
                      Flexible
                    </strong>
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
                <span className="flex items-center">
                  <FaGenderless className="mr-2 text-xl text-purple-500" />

                  {roompy.roompiesPref.gender.includes('ria') ? (
                    <p className="text-base">
                      Jenis kelamin: <strong>Pria</strong>{' '}
                      <strong className="mx-2">/</strong>{' '}
                      <strong className="font-normal line-through">
                        Wanita
                      </strong>
                      <strong className="mx-2">/</strong>{' '}
                      <strong className="font-normal line-through">
                        Flexible
                      </strong>
                    </p>
                  ) : roompy.roompiesPref.gender.includes('nita') ? (
                    <p className="text-base">
                      Jenis kelamin:{' '}
                      <strong className="font-normal line-through">Pria</strong>{' '}
                      <strong className="mx-2">/</strong>{' '}
                      <strong>Wanita</strong>
                      <strong className="mx-2">/</strong>{' '}
                      <strong className="font-normal line-through">
                        Flexible
                      </strong>
                    </p>
                  ) : (
                    <p className="text-base">
                      Jenis kelamin:{' '}
                      <strong className="font-normal line-through">Pria</strong>{' '}
                      <strong className="mx-2">/</strong>{' '}
                      <strong className="font-normal line-through">
                        Wanita
                      </strong>
                      <strong className="mx-2">/</strong>{' '}
                      <strong>Flexible</strong>
                    </p>
                  )}
                </span>

                {/* age */}
                <span className="flex items-center">
                  <GiAges className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Rentang usia: <strong>{roompy.roompiesPref.ageFrom}</strong>{' '}
                    <strong className="mx-1">-</strong>{' '}
                    <strong>{roompy.roompiesPref.ageTo}</strong>
                    <strong className="ml-1">tahun</strong>{' '}
                  </p>
                </span>

                {/* smoker */}
                <span className="flex items-center">
                  <GiCigarette className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Merokok:{' '}
                    <strong
                      className={
                        roompy.roompiesPref.smoker.includes('ot')
                          ? 'font-normal line-through'
                          : ''
                      }
                    >
                      Okay
                    </strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong
                      className={
                        roompy.roompiesPref.smoker.includes('ot')
                          ? ''
                          : 'font-normal line-through'
                      }
                    >
                      Not Okay
                    </strong>
                  </p>
                </span>

                {/* pet */}
                <span className="flex items-center">
                  <GiSittingDog className="mr-2 text-xl text-purple-500" />

                  <p className="text-base">
                    Hewan Peliharaan:{' '}
                    <strong
                      className={
                        roompy.roompiesPref.pet.includes('ot')
                          ? 'font-normal line-through'
                          : ''
                      }
                    >
                      Okay
                    </strong>{' '}
                    <strong className="mx-2">/</strong>{' '}
                    <strong
                      className={
                        roompy.roompiesPref.pet.includes('ot')
                          ? ''
                          : 'font-normal line-through'
                      }
                    >
                      Not Okay
                    </strong>
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

              <div className="flex flex-wrap items-center">
                {roompy.locPref.map((loc, i, arr) => (
                  <span
                    key={i}
                    className={`${
                      arr.length - 1 === i ? '' : 'mr-2'
                    } flex items-center px-2 py-1 mb-2 border border-green-500 rounded-md`}
                  >
                    <FaMapMarkerAlt className="mr-1 text-xl text-green-500" />

                    <p className="text-base">{loc}</p>
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* bottom user info */}
          <article className="flex flex-col w-full p-6 my-4 text-center bg-white shadow md:text-left md:flex-row">
            {/* user image */}
            <div className="flex justify-center w-full pb-4 md:w-2/5 md:justify-start xl:w-1/5">
              <img
                className="w-32 h-32 rounded-full shadow"
                src={roompy.photoURL}
                alt={roompy.name}
              />
            </div>

            {/* user simple info */}
            <div className="flex flex-col justify-center flex-1 md:justify-start">
              <p className="text-2xl font-semibold">{roompy.name}</p>

              <span className="flex items-center justify-center py-4 md:justify-start">
                {user ? (
                  <>
                    <IoLogoWhatsapp className="text-2xl text-green-500" />

                    <p className="ml-2 text-lg italic text-green-500">
                      {roompy.phoneNumber}
                    </p>
                  </>
                ) : (
                  <p className="text-lg italic text-red-500">
                    Please login to see {roompy.name}'s number
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
              </div>
            </div>
          </article>
        </section>

        {/* <!-- Sidebar Section --------------------------------------------------------------> */}
        <aside className="flex flex-col items-center w-full px-3 md:w-1/3">
          {/* form message */}
          <section className="flex flex-col w-full p-6 my-4 shadow bg-gray-50">
            <p className="pb-5 text-xl font-semibold text-center truncate">
              Message {roompy.name}
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
                className="flex items-center justify-center w-full px-2 py-3 mt-4 text-sm font-bold tracking-wider text-purple-700 uppercase bg-purple-100 rounded-md text-FaShower focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-white hover:bg-purple-700"
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
            onClick={openModal}
            className="flex items-center justify-center w-full p-3 my-4 space-x-2 rounded-md cursor-pointer hover:bg-red-100 hover:shadow"
          >
            <HiExclamationCircle className="text-2xl text-red-500" />

            <p className="text-base text-gray-500">Report this roompies</p>
          </section>
        </aside>
      </div>
    </article>
  )
}
