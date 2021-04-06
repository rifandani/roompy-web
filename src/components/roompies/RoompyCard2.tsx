import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FcMoneyTransfer } from 'react-icons/fc'
import { GiFemale, GiMale } from 'react-icons/gi'
// files
import { RoompyProps } from '../../utils/interfaces'

export default function RoompyCard2({ roompy }: RoompyProps) {
  return (
    <Link href={`/roompies/${roompy.id}`}>
      <article className="transition duration-500 transform cursor-pointer hover:scale-105">
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
          <div
            // premium user check bg-color
            className={`${
              false ? 'bg-yellow-50' : 'bg-white'
            } px-4 py-4 rounded-lg shadow-lg`}
          >
            <div className="flex items-baseline">
              {/* badge */}
              {true && (
                <span className="inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-yellow-800 uppercase bg-yellow-200 rounded-full">
                  Premium
                </span>
              )}

              {true && (
                <span className="inline-block px-2 py-1 ml-2 text-xs font-semibold leading-none tracking-wide text-purple-800 uppercase bg-purple-200 rounded-full">
                  Verified
                </span>
              )}

              {true && (
                <span className="inline-block px-2 py-1 ml-2 text-xs font-semibold leading-none tracking-wide text-pink-800 uppercase bg-pink-200 rounded-full">
                  New
                </span>
              )}

              {false && (
                <span className="inline-block px-2 py-1 ml-2 text-xs font-semibold leading-none tracking-wide text-pink-800 uppercase bg-pink-200 rounded-full">
                  Updated
                </span>
              )}
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
              <span className="ml-2 italic text-purple-800">
                {roompy.smoker ? 'Smoker' : 'Not Smoker'}
              </span>
              <span className="ml-2 italic text-pink-800">
                {roompy.ownPet ? 'Own Pet' : 'Not Own Pet'}
              </span>
            </div>

            <div className="flex items-center mt-1 text-sm">
              <FcMoneyTransfer className="mr-2" />

              <span className="text-gray-900">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(roompy.budget)}
              </span>
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
  )
}
