import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GiFemale, GiMale } from 'react-icons/gi';
// files
import { RoompyProps } from '../../utils/interfaces';

export default function RoompyCard2({ roompy }: RoompyProps) {
  return (
    <Link href={`/roompies/${roompy.id}`}>
      <article className="transition duration-500 transform cursor-pointer hover:scale-110">
        {/* roompy image */}
        <section className="relative h-96 sm:h-60 pb-5/6">
          <Image
            className="absolute inset-0 object-cover w-full h-full mx-auto rounded-lg shadow-md"
            src={roompy.photoURL || '/favicon.ico'}
            alt={roompy.name}
            layout="fill"
            objectFit="cover"
          />
        </section>

        <section className="relative px-4 -mt-16">
          <div className="px-4 py-4 rounded-lg shadow-lg bg-yellow-50">
            <div className="flex items-baseline">
              {/* badge */}
              <span className="inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-yellow-800 uppercase bg-yellow-200 rounded-full">
                Premium
              </span>

              <span className="inline-block px-2 py-1 ml-2 text-xs font-semibold leading-none tracking-wide text-purple-800 uppercase bg-purple-200 rounded-full">
                Verified
              </span>
            </div>

            {/* title */}
            <div className="mt-1">
              <h4 className="text-lg font-semibold text-gray-900 truncate">
                {roompy.name}
              </h4>
            </div>

            <div className="flex items-center mt-1 text-sm">
              {roompy.gender === 'Pria' ? (
                <GiMale className="mr-2 text-blue-500" />
              ) : (
                <GiFemale className="mr-2 text-pink-500" />
              )}

              <span className="text-gray-900">{roompy.age} thn</span>
            </div>

            <div className="flex items-center mt-1 text-sm">
              <FcMoneyTransfer className="mr-2" />

              <span className="text-gray-900">{roompy.budget}</span>
              <span className="ml-1 text-gray-600">/bln</span>
            </div>

            {/* loc */}
            <div className="flex items-center mt-1 text-sm">
              <FaMapMarkerAlt className="mr-2 text-purple-500" />

              <span className="text-gray-600">{roompy.locPref[0]}</span>
            </div>
          </div>
        </section>
      </article>
    </Link>
  );
}
