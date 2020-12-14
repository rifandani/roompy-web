import Link from 'next/link';
import { FaMapMarkerAlt, FaCrown } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GiMale } from 'react-icons/gi';

export default function CardHome() {
  return (
    <article className="w-80 mx-auto overflow-hidden rounded-lg shadow-lg transition duration-500 transform cursor-pointer hover:z-auto hover:scale-110">
      <section className="h-40 bg-gradient-to-br from-purple-700 via-indigo-500 to-teal-300">
        {/* name */}
        <div className="flex justify-center">
          <span className="mt-10 text-4xl font-extrabold text-white">
            Tony Stark
          </span>
        </div>

        {/* image */}
        <div className="relative flex justify-center">
          <img
            className="object-cover w-24 h-24 mt-4 border-4 rounded-full border-white"
            src="https://im.indiatimes.in/content/2019/Jun/marvel_fans_start_a_petition_to_demand_robert_downey_jr_aka_tony_stark_aka_iron_man_back_1559715390_725x725.jpg"
          />

          <span className="px-3 py-1 ml-4 -mb-3 absolute bottom-8 left-3 inline-flex items-center text-xs font-medium leading-tight border rounded-full bg-pink-200">
            Updated
          </span>

          <FaCrown className="absolute bottom-10 right-12 inline-flex items-center text-2xl text-yellow-200" />
          <span className="px-3 py-1 mr-4 -mb-3 absolute bottom-8 right-2 inline-flex items-center text-xs font-medium leading-tight border rounded-full bg-yellow-200">
            Premium
          </span>
        </div>
      </section>

      <section className="px-4 py-4 bg-white">
        <div className="mt-6 mb-4 flex items-center">
          <span className="px-1 truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>

        {/* umur */}
        <div className="my-1 flex w-full">
          <GiMale className="mr-2 text-blue-500" />
          <span className="text-sm italic">42 tahun</span>
        </div>

        {/* budget */}
        <div className="my-1 flex w-full">
          <FcMoneyTransfer className="mr-2" />
          <span className="text-sm italic">Rp 1250000</span>
        </div>

        {/* lokasi */}
        <div className="my-1 flex w-full">
          <FaMapMarkerAlt className="mr-2 text-purple-500" />
          <span className="text-sm italic">Jalan Gejayan</span>
        </div>
      </section>
    </article>
  );
}
