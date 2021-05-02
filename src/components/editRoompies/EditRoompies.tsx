import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import PhoneInput from 'react-phone-input-2'
import id from 'react-phone-input-2/lang/id.json'
import DatePicker from 'react-datepicker'
import NumberFormat from 'react-number-format'
import { Range, createSliderWithTooltip } from 'rc-slider'
import Loader from 'react-loader-spinner'
import validator from 'validator'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import axios from 'axios'
import dynamic from 'next/dynamic'
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated'
// files
import Dropzone from '../createRoompies/Dropzone'
import { EditRoompiesProps } from '../../pages/dashboard/roompies/edit/[id]'
import axiosErrorHandle from '../../utils/axiosErrorHandle'
import { LocPref } from '../../utils/interfaces'

// const animatedComponents = makeAnimated() // animation on react-select isMulti
const RangeWithTooltip = createSliderWithTooltip(Range) // rc-slider with tooltip

const MapWithNoSSR = dynamic(() => import('../leaflet/EditRoompiesLeaflet'), {
  ssr: false,
})

export default function EditRoompies({ user, roompy }: EditRoompiesProps) {
  const { push } = useRouter()
  const [busy, setBusy] = useState<boolean>(false)
  // contact info
  const [name, setName] = useState<string>(roompy.name || '')
  const [phone, setPhone] = useState<string>(roompy.phoneNumber || '') // '62822...'
  // descriptions
  const [gender, setGender] = useState<string>(roompy.gender || 'Pria') // Pria / Wanita
  const [age, setAge] = useState<string>(roompy.age + '' || '') // min 17
  const [occupation, setOccupation] = useState<string>(roompy.occupation || '')
  const [smoker, setSmoker] = useState<boolean>(roompy.smoker || false)
  const [ownPet, setOwnPet] = useState<boolean>(roompy.ownPet || false)
  // introduce yourself
  const [budget, setBudget] = useState<string>(roompy.budget + '' || '')
  const [moveDate, setMoveDate] = useState<Date>(new Date(roompy.moveDate)) // Date
  const [stayLength, setStayLength] = useState<string>(
    roompy.stayLength + '' || ''
  )
  const [desc, setDesc] = useState<string>(roompy.desc || '')
  // location preferences
  const [locPref, setLocPref] = useState<LocPref[]>(roompy.locPref || []) // array of LocPref object
  // home preferences
  const [roomType, setRoomType] = useState<string>(
    roompy.homePref.room || 'Flex'
  ) // Satu kamar / Satu rumah / Flex
  const [parking, setParking] = useState<string>(
    roompy.homePref.parking || 'Flex'
  ) // Required / Flex
  const [wifi, setWifi] = useState<string>(roompy.homePref.wifi || 'Flex') // Required / Flex
  const [bathroom, setBathroom] = useState<string>(
    roompy.homePref.bathroom || 'Flex'
  ) // Dalam / Flex
  // roompies preferences
  const [genderPref, setGenderPref] = useState<string>(
    roompy.roompiesPref.gender || 'Flex'
  ) // Pria / Wanita / Flex
  const [smokerPref, setSmokerPref] = useState<string>(
    roompy.roompiesPref.smoker || 'Okay'
  ) // Okay / Not okay
  const [petPref, setPetPref] = useState<string>(
    roompy.roompiesPref.pet || 'Okay'
  ) // Okay / Not okay
  const [agePref, setAgePref] = useState<number[]>([17, 70]) // [ageFrom, ageTo]
  // your photos
  const [images, setImages] = useState<any>([]) // images FIRESTORAGE

  async function onEditRoompies(e: FormEvent) {
    e.preventDefault()

    // validation
    if (!validator.isLength(phone, { min: 9, max: 16 })) {
      return toast.warning('Please input a valid phone numbers')
    } else if (locPref.length < 1) {
      return toast.warning('Please select minimal 1 location preferences')
    } else if (images.length < 1) {
      return toast.warning('Please select minimal 1 photo')
    }

    // all required.
    const state = {
      name,
      phoneNumber: phone,
      gender,
      age: ~~age,
      occupation,
      smoker,
      ownPet,
      budget: ~~budget,
      moveDate: new Date(moveDate).getTime(), // milliseconds
      stayLength: ~~stayLength,
      desc,
      locPref,
      homePref: {
        room: roomType,
        parking,
        wifi,
        bathroom,
      },
      roompiesPref: {
        gender: genderPref,
        ageFrom: agePref[0],
        ageTo: agePref[1],
        smoker: smokerPref,
        pet: petPref,
      },
      postedBy: user.id, // userId disini
    }
    const photoURL = images[0] // array of image object + preview: URL.createObjectURL(image)
    delete photoURL.preview

    try {
      setBusy(true) // enable loading screen + disable button

      // create form-data => enctype: multipart/form-data
      const formData = new FormData()
      formData.append('photo', photoURL)
      formData.append('roompy', JSON.stringify(state))

      // PUT Form Data
      const res = await axios.put(`/roompies?id=${roompy.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // if PUT success
      if (res.status === 201) {
        await push('/dashboard')
        setBusy(false)
        return toast.success('Roompies updated')
      }
    } catch (err) {
      // on ERROR => Axios Response error
      setBusy(false) // enable login button

      axiosErrorHandle(err)
    }
  }

  async function onDeleteRoompies(e: FormEvent) {
    e.preventDefault()
    const userAgree = window.confirm('Anda yakin ingin menghapus roompy ini?')

    if (!userAgree) return

    try {
      setBusy(true)

      const res = await axios.delete(`/roompies?id=${roompy.id}`)

      // if DELETE success
      if (res.status === 200) {
        await push('/dashboard')
        setBusy(false)
        return toast.success('Roompy deleted')
      }
    } catch (err) {
      // on ERROR => Axios Response error
      setBusy(false) // enable login button

      axiosErrorHandle(err)
    }
  }

  if (busy) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader
          type="ThreeDots"
          color="Purple"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    )
  }

  return (
    <article className="flex-1 pb-24 mt-12 bg-gray-100 md:mt-2 md:pb-5">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-purple-700 to-gray-800">
          <h3 className="pl-2 font-bold">Update Roompies</h3>
        </div>
      </div>
      {/* all form */}

      <form
        className="w-full min-h-screen bg-white"
        autoComplete="on"
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => onEditRoompies(e)}
      >
        {/* contact info*/}
        <div className="flex flex-wrap items-center w-full pt-8 md:justify-center">
          <h6 className="px-6 text-2xl italic font-bold text-purple-500">
            Contact Info
          </h6>
        </div>

        <div className="flex flex-wrap w-full px-6 pt-2 pb-6 mt-6 bg-gray-100">
          {/* fullname */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="username">Fullname</label>

            <input
              className="block w-full px-4 py-1 mt-2 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
              placeholder="Elon Musk"
              name="username"
              id="username"
              autoComplete="username"
              autoFocus
              required
              minLength={3}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </section>

          {/* phone number */}
          <section className="flex flex-col flex-1 mt-2 text-base font-bold text-gray-700">
            <label htmlFor="phone" className="mb-2">
              Phone Number
              <a className="inline-flex ml-2" data-tip data-for="phoneTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="phoneTip">
              <p className="text-white">Nomor HP anda yang bisa di WhatsApp</p>
            </ReactTooltip>

            <PhoneInput
              inputProps={{
                name: 'phone',
                required: true,
              }}
              localization={id}
              country="id"
              preferredCountries={['id']}
              value={phone}
              onChange={(val) => setPhone(val)}
            />
          </section>
        </div>

        {/* Your description*/}
        <div className="flex flex-wrap items-center w-full pt-8 md:justify-center">
          <h6 className="px-6 text-2xl italic font-bold text-purple-500">
            Your Description
          </h6>
        </div>

        <div className="flex flex-wrap w-full px-6 pt-2 pb-6 mt-6 bg-gray-100">
          {/* Gender */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="gender">Gender</label>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="gender"
                type="radio"
                value="Pria"
                checked={gender === 'Pria'}
                onChange={(e) => setGender(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Pria</p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="gender"
                type="radio"
                value="Wanita"
                checked={gender === 'Wanita'}
                onChange={(e) => setGender(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Wanita</p>
            </span>
          </section>

          {/* smoker */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="smoker">
              Smoker
              <a className="inline-flex ml-2" data-tip data-for="smokerTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="smokerTip">
              <p className="text-white">Apakah anda perokok?</p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="smoker"
                type="radio"
                value="true"
                checked={smoker === true}
                onChange={() => setSmoker(true)}
              />

              <p className="inline-flex font-medium text-gray-500">Ya</p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="smoker"
                type="radio"
                value="false"
                checked={smoker === false}
                onChange={() => setSmoker(false)}
              />

              <p className="inline-flex font-medium text-gray-500">Tidak</p>
            </span>
          </section>

          {/* ownPet */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="ownPet">
              Own a pet
              <a className="inline-flex ml-2" data-tip data-for="petTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="petTip">
              <p className="text-white">
                Apakah anda mempunyai/membawa hewan peliharaan?
              </p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="ownPet"
                type="radio"
                value="true"
                checked={ownPet === true}
                onChange={() => setOwnPet(true)}
              />

              <p className="inline-flex font-medium text-gray-500">Ya</p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="ownPet"
                type="radio"
                value="false"
                checked={ownPet === false}
                onChange={() => setOwnPet(false)}
              />

              <p className="inline-flex font-medium text-gray-500">Tidak</p>
            </span>
          </section>
        </div>

        <div className="flex flex-wrap w-full p-6 pt-0 bg-gray-100">
          {/* Age */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="age">Age</label>

            <input
              className="block w-full px-4 py-1 mt-2 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
              placeholder="Your current age"
              name="age"
              id="age"
              autoComplete="age"
              type="number"
              required
              min={17}
              max={70}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </section>

          {/* occupation */}
          <section className="flex flex-col flex-1 mt-2 text-base font-bold text-gray-700">
            <label htmlFor="occupation">Occupation</label>

            <input
              className="block w-full px-4 py-1 mt-2 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
              placeholder="Your current job"
              name="occupation"
              id="occupation"
              autoComplete="occupation"
              required
              minLength={3}
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </section>
        </div>

        {/* Introduce Yourself*/}
        <div className="flex flex-wrap items-center w-full pt-8 md:justify-center">
          <h6 className="px-6 text-2xl italic font-bold text-purple-500">
            Introduce Yourself
          </h6>
        </div>

        <div className="flex flex-wrap w-full px-6 pt-2 pb-6 mt-6 bg-gray-100">
          {/* Weekly Budget */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="budget" className="">
              Weekly Budget
              <a className="inline-flex ml-2" data-tip data-for="budgetTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="budgetTip">
              <p className="text-white">Jumlah pendapatan anda perminggu</p>
            </ReactTooltip>

            <NumberFormat
              className="w-full px-4 py-1 mt-2 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
              name="budget"
              id="budget"
              required
              thousandSeparator
              prefix="Rp "
              value={budget}
              onValueChange={(values) => setBudget(values.value)}
            />
          </section>

          {/* Move Date */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="moveDate">
              Move Date
              <a className="inline-flex ml-2" data-tip data-for="moveDateTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="moveDateTip">
              <p className="text-white">
                Perkiraan tanggal anda ingin pindah tempat
              </p>
            </ReactTooltip>

            <DatePicker
              className="w-full px-4 py-1 mt-2 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
              placeholderText="Pick your move date plan"
              dateFormat="dd/MM/yyyy"
              isClearable
              minDate={new Date()}
              selected={moveDate}
              onChange={(date: Date) => setMoveDate(date)}
            />
          </section>

          {/* stayLength */}
          <section className="flex flex-col flex-1 mt-2 text-base font-bold text-gray-700">
            <label htmlFor="stayLength">
              Stay Length
              <a className="inline-flex ml-2" data-tip data-for="stayLengthTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="stayLengthTip">
              <p className="text-white">
                Seberapa lama anda ingin tinggal nantinya
              </p>
            </ReactTooltip>

            <input
              className="block w-full px-4 py-1 mt-2 border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
              name="stayLength"
              id="stayLength"
              type="number"
              placeholder="In weeks"
              required
              min={1}
              value={stayLength}
              onChange={(e) => setStayLength(e.target.value)}
            />
          </section>
        </div>

        {/* Personal introduction */}
        <div className="flex w-full p-6 pt-0 bg-gray-100">
          <section className="flex flex-col flex-1 mt-2 text-base font-bold text-gray-700">
            <label htmlFor="desc">
              Personal introduction
              <a className="inline-flex ml-2" data-tip data-for="descTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="descTip">
              <p className="text-white">
                Deskripsi tentang diri anda pribadi. Sebutkan apa saja sifat,
                karakter, kebiasaan ataupun hobi anda sehari-hari.
              </p>
            </ReactTooltip>

            <textarea
              className="block w-full px-4 py-1 mt-2 bg-white border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
              name="desc"
              id="desc"
              placeholder="Describe about yourself and your lifestyle. Mention some of the personal qualities that are important to you. If you're moving with your partner or friend, include them."
              rows={6}
              minLength={10}
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </section>
        </div>

        {/* Location Preferences*/}
        <div className="flex flex-wrap items-center w-full pt-8 md:justify-center">
          <h6 className="px-6 text-2xl italic font-bold text-purple-500">
            Location Preferences
          </h6>
        </div>

        {/* react-select locPref */}
        <div className="flex w-full px-6 pt-2 pb-6 mt-6 bg-gray-100">
          <section className="flex flex-col flex-1 mt-2 text-base font-bold text-gray-700">
            <label htmlFor="locPref" className="mb-2">
              Pick your wanted locations
              <a className="inline-flex ml-2" data-tip data-for="locPrefTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="locPrefTip">
              <p className="text-white">
                Rencana lokasi tempat tinggal anda nantinya. Radius marker
                sejauh 1 km. Bisa pilih maksimal 3 pilihan.
              </p>
            </ReactTooltip>

            {/* leaflet map */}
            <MapWithNoSSR locPref={locPref} setLocPref={setLocPref} />

            {/* <Select
              className="w-full border-b-2 rounded-md outline-none appearance-none hover:border-purple-700 hover:shadow-xl focus:border-purple-700"
              placeholder="List of sub-districts"
              name="locPref"
              id="locPref"
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={subDistrictsOptions}
              onChange={setSelectedSubDistricts}
            /> */}
          </section>
        </div>

        {/* Home Preferences*/}
        <div className="flex flex-wrap items-center w-full pt-8 md:justify-center">
          <h6 className="px-6 text-2xl italic font-bold text-purple-500">
            Home Preferences
          </h6>
        </div>

        <div className="flex flex-wrap w-full px-6 pt-2 pb-6 mt-6 bg-gray-100">
          {/* roomType */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="roomType">
              Room Type
              <a className="inline-flex ml-2" data-tip data-for="roomTypeTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="roomTypeTip">
              <p className="text-white">
                Pencarian kos untuk satu kamar / ngontrak satu rumah
              </p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="roomType"
                type="radio"
                value="Satu kamar"
                checked={roomType === 'Satu kamar'}
                onChange={(e) => setRoomType(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">
                Satu kamar
              </p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="roomType"
                type="radio"
                value="Satu rumah"
                checked={roomType === 'Satu rumah'}
                onChange={(e) => setRoomType(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">
                Satu rumah
              </p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="roomType"
                type="radio"
                value="Flex"
                checked={roomType === 'Flex'}
                onChange={(e) => setRoomType(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Fleksibel</p>
            </span>
          </section>

          {/* parking */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="parking">
              Parking
              <a className="inline-flex ml-2" data-tip data-for="parkingTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="parkingTip">
              <p className="text-white">Apakah lahan parkir harus tersedia?</p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="parking"
                type="radio"
                value="Required"
                checked={parking === 'Required'}
                onChange={(e) => setParking(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Required</p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="parking"
                type="radio"
                value="Flex"
                checked={parking === 'Flex'}
                onChange={(e) => setParking(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Fleksibel</p>
            </span>
          </section>

          {/* wifi */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="wifi">
              Wifi
              <a className="inline-flex ml-2" data-tip data-for="wifiTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="wifiTip">
              <p className="text-white">Apakah internet wifi harus tersedia?</p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="wifi"
                type="radio"
                value="Required"
                checked={wifi === 'Required'}
                onChange={(e) => setWifi(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Required</p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="wifi"
                type="radio"
                value="Flex"
                checked={wifi === 'Flex'}
                onChange={(e) => setWifi(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Fleksibel</p>
            </span>
          </section>

          {/* bathroom */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="bathroom">
              Bathroom
              <a className="inline-flex ml-2" data-tip data-for="bathroomTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="bathroomTip">
              <p className="text-white">
                Apakah harus kamar mandi dalam atau fleksibel
              </p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="bathroom"
                type="radio"
                value="Dalam"
                checked={bathroom === 'Dalam'}
                onChange={(e) => setBathroom(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Dalam</p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="bathroom"
                type="radio"
                value="Flex"
                checked={bathroom === 'Flex'}
                onChange={(e) => setBathroom(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Fleksibel</p>
            </span>
          </section>
        </div>

        {/* Roompies Preferences*/}
        <div className="flex flex-wrap items-center w-full pt-8 md:justify-center">
          <h6 className="px-6 text-2xl italic font-bold text-purple-500">
            Roompies Preferences
          </h6>
        </div>

        <div className="flex flex-wrap w-full px-6 pt-2 pb-6 mt-6 bg-gray-100">
          {/* genderPref */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="genderPref">
              Their Gender
              <a className="inline-flex ml-2" data-tip data-for="genderPrefTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="genderPrefTip">
              <p className="text-white">
                Preferensi jenis kelamin teman satu kamar / rumah nantinya
              </p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="genderPref"
                type="radio"
                value="Pria"
                checked={genderPref === 'Pria'}
                onChange={(e) => setGenderPref(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Pria</p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="genderPref"
                type="radio"
                value="Wanita"
                checked={genderPref === 'Wanita'}
                onChange={(e) => setGenderPref(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Wanita</p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="genderPref"
                type="radio"
                value="Flex"
                checked={genderPref === 'Flex'}
                onChange={(e) => setGenderPref(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Fleksibel</p>
            </span>
          </section>

          {/* smokerPref */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="smokerPref">
              Their smoking
              <a className="inline-flex ml-2" data-tip data-for="smokerPrefTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="smokerPrefTip">
              <p className="text-white">
                Apakah anda keberatan jika teman satu kamar / rumah anda
                nantinya merokok
              </p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="smokerPref"
                type="radio"
                value="Okay"
                checked={smokerPref === 'Okay'}
                onChange={(e) => setSmokerPref(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">
                Tidak keberatan
              </p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="smokerPref"
                type="radio"
                value="Not okay"
                checked={smokerPref === 'Not okay'}
                onChange={(e) => setSmokerPref(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Keberatan</p>
            </span>
          </section>

          {/* petPref */}
          <section className="flex flex-col flex-1 mt-2 mr-5 text-base font-bold text-gray-700 lg:mr-10 xl:mr-15">
            <label htmlFor="petPref">
              Their pet
              <a className="inline-flex ml-2" data-tip data-for="petPrefTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="petPrefTip">
              <p className="text-white">
                Apakah anda keberatan jika teman satu kamar / rumah anda
                nantinya membawa hewan peliharaan
              </p>
            </ReactTooltip>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="petPref"
                type="radio"
                value="Okay"
                checked={petPref === 'Okay'}
                onChange={(e) => setPetPref(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">
                Tidak keberatan
              </p>
            </span>

            <span className="flex items-center w-full mt-2">
              <input
                className="mr-2"
                name="petPref"
                type="radio"
                value="Not okay"
                checked={petPref === 'Not okay'}
                onChange={(e) => setPetPref(e.target.value)}
              />

              <p className="inline-flex font-medium text-gray-500">Keberatan</p>
            </span>
          </section>
        </div>

        {/* rc-slider ageFrom ageTo */}
        <div className="flex w-full p-6 pt-0 bg-gray-100">
          <section className="flex flex-col flex-1 mt-2 text-base font-bold text-gray-700">
            <label htmlFor="agePref" className="mb-2">
              Their age range
              <a className="inline-flex ml-2" data-tip data-for="agePrefTip">
                <FaQuestionCircle className="text-sm text-gray-800" />
              </a>
            </label>

            <ReactTooltip id="agePrefTip">
              <p className="text-white">
                Preferensi rentang usia teman satu kamar / rumah anda nantinya
              </p>
            </ReactTooltip>

            <RangeWithTooltip
              className="w-full"
              min={17}
              max={70}
              allowCross={false}
              tipFormatter={(value) => `${value} tahun`}
              defaultValue={agePref}
              onChange={(val) => setAgePref(val)}
            />
          </section>
        </div>

        {/* Your Photos*/}
        <div className="flex flex-wrap items-center w-full pt-8 md:justify-center">
          <h6 className="px-6 text-2xl italic font-bold text-purple-500">
            Your Photos
            <a className="inline-flex ml-2" data-tip data-for="yourPhotosTip">
              <FaQuestionCircle className="text-sm text-gray-800" />
            </a>
            <ReactTooltip id="yourPhotosTip">
              <p className="text-white">Hanya 1 foto untuk Free User</p>
            </ReactTooltip>
          </h6>
        </div>

        {/* photos dropzone */}
        <div className="flex w-full p-6 mt-6 bg-gray-100">
          <section className="w-full">
            <Dropzone
              images={images}
              setImages={setImages}
              single
              isPremium={user && user.premium}
            />
          </section>
        </div>

        <div className="mx-6 mt-6">
          <button
            className="block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-purple-700 rounded-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-purple-700 hover:bg-purple-100"
            type="submit"
            disabled={busy}
          >
            Update
          </button>
        </div>

        <div className="mx-6 mt-6">
          <button
            className="block w-full px-4 py-3 font-bold tracking-wider text-white uppercase bg-red-700 rounded-md focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 hover:text-red-700 hover:bg-red-100"
            disabled={busy}
            onClick={(e) => onDeleteRoompies(e)}
          >
            Delete roompy
          </button>
        </div>
      </form>
    </article>
  )
}
