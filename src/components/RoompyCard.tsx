import Link from 'next/link';
import { FaMapMarkerAlt, FaCrown } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GiFemale, GiMale } from 'react-icons/gi';
// files
import { Roompy } from '../utils/interfaces';
import { nowMillis } from '../configs/firebaseConfig';

export default function RoompyCard({ roompy }: { roompy: Roompy }) {
  // milliseconds
  const oneWeek = 604800000;
  const isMoreThanAWeek = nowMillis <= roompy.updatedAt + oneWeek;

  return (
    <Link href={`/roompies/${roompy.id}`}>
      <article className="mx-auto overflow-hidden transition duration-500 transform rounded-lg shadow-lg cursor-pointer w-80 hover:z-auto hover:scale-110">
        <section className="h-40 bg-gradient-to-tl from-purple-700 via-indigo-500 to-teal-300">
          {/* name */}
          <div className="flex justify-center">
            <span className="mt-10 text-2xl font-extrabold text-center text-white truncate">
              {roompy.name}
            </span>
          </div>

          {/* image */}
          <div className="relative flex justify-center">
            <img
              className="object-cover w-24 h-24 mt-6 border-4 border-white rounded-full"
              src={roompy.photoURL}
              alt={roompy.name}
            />

            {roompy.createdAt === roompy.updatedAt ? (
              <span
                className={`${
                  isMoreThanAWeek ? 'hidden' : 'absolute'
                } inline-flex items-center px-3 py-1 ml-4 -mb-3 text-xs font-medium leading-tight bg-pink-200 border rounded-full bottom-8 left-3`}
              >
                New
              </span>
            ) : (
              <span
                className={`${
                  isMoreThanAWeek ? 'hidden' : 'absolute'
                } inline-flex items-center px-3 py-1 ml-4 -mb-3 text-xs font-medium leading-tight bg-pink-200 border rounded-full bottom-8 left-3`}
              >
                Updated
              </span>
            )}

            <FaCrown className="absolute inline-flex items-center text-2xl text-yellow-200 bottom-10 right-12" />
            <span className="absolute inline-flex items-center px-3 py-1 mr-4 -mb-3 text-xs font-medium leading-tight bg-yellow-200 border rounded-full bottom-8 right-2">
              Premium
            </span>
          </div>
        </section>

        <section className="px-4 py-4 bg-white">
          <div className="flex items-center mt-6 mb-4">
            <span className="px-1 truncate">{roompy.desc}</span>
          </div>

          {/* umur */}
          <div className="flex w-full my-1">
            {roompy.gender === 'Pria' ? (
              <GiMale className="mr-2 text-blue-500" />
            ) : (
              <GiFemale className="mr-2 text-pink-500" />
            )}
            <span className="text-sm italic">{roompy.age} tahun</span>
          </div>

          {/* budget */}
          <div className="flex w-full my-1">
            <FcMoneyTransfer className="mr-2" />
            <span className="text-sm italic">Rp {roompy.budget} / bln</span>
          </div>

          {/* lokasi */}
          <div className="flex w-full my-1">
            <FaMapMarkerAlt className="mr-2 text-purple-500" />

            <span className="text-sm italic truncate">{roompy.locPref[0]}</span>
          </div>
        </section>
      </article>
    </Link>
  );
}
