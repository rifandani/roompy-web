import Link from 'next/link';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
// files
import RoompyCard2 from '../roompies/RoompyCard2';
import { FavoritesPageProps } from '../../pages/dashboard/favorites';
import { Roompies } from '../../utils/interfaces';
import axiosErrorHandle from '../../utils/axiosErrorHandle';

interface Props extends FavoritesPageProps {
  setBusy: Dispatch<SetStateAction<boolean>>;
}

export default function InboxContent({ setBusy, dbUser, favRoompies }: Props) {
  // hooks
  const [isAsc, setIsAsc] = useState<boolean>(false);

  const onDeleteFav = async (userId: string, roompyId: string) => {
    try {
      setBusy(true);

      await axios.delete(
        `/favorites/roompies?userId=${userId}&roompyId=${roompyId}`,
      );

      // on SUCCESS
      toast.info('Delete successful');
      setBusy(false);
    } catch (err) {
      // on ERROR
      axiosErrorHandle(err);
      setBusy(false);
    }
  };

  return (
    <div className="flex-1 pb-20 mt-12 overflow-hidden bg-gray-100 md:mt-2 md:pb-0">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-red-700 to-gray-800">
          <h3 className="pl-2 font-bold">Favorites</h3>
        </div>
      </div>

      {/* main content */}
      <main className="py-6 xl:flex-1 xl:overflow-x-hidden">
        {/* favorited roompies */}
        <div className="pl-2">
          <div className="px-4">
            <h3 className="text-2xl italic font-bold text-purple-500">
              Roompies
            </h3>
          </div>

          {/* favorited roompies list */}
          <div className="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
            <div className="px-4 sm:inline-flex sm:pt-2 sm:pb-8">
              {favRoompies.length > 0 ? (
                (favRoompies as Roompies).map((roompy, i) => (
                  <div
                    key={roompy.id}
                    className={`${
                      i > 0 ? 'mt-10 sm:ml-4' : ''
                    } sm:mt-0 sm:w-80 sm:flex-shrink-0 relative`}
                  >
                    <Link href={`/roompies/${roompy.id}`}>
                      <RoompyCard2 roompy={roompy} />
                    </Link>

                    <button
                      className="absolute flex items-center justify-center rounded-md shadow-xl top-1 right-1 focus:outline-none focus:ring-4 focus:ring-red-200"
                      onClick={() => onDeleteFav(dbUser.id, roompy.id)}
                    >
                      <FaWindowClose className="text-3xl text-red-500 hover:text-red-800" />
                    </button>
                  </div>
                ))
              ) : (
                <h3 className="mt-6 font-bold">No Data</h3>
              )}
            </div>
          </div>
        </div>

        {/* favorited rooms */}
        <div className="pl-2 mt-6">
          <div className="px-4">
            <h3 className="text-2xl italic font-bold text-pink-500">Rooms</h3>
          </div>

          {/* favorited rooms list */}
          <div className="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
            <div className="px-4 sm:inline-flex sm:pt-2 sm:pb-8">
              {favRoompies.length > 0 ? (
                (favRoompies as Roompies).map((roompy, i) => (
                  <div
                    key={roompy.id}
                    className={`${
                      i > 0 ? 'mt-10 sm:ml-4' : ''
                    } sm:mt-0 sm:w-80 sm:flex-shrink-0`}
                  >
                    <RoompyCard2 roompy={roompy} />
                  </div>
                ))
              ) : (
                <h3 className="mt-6 font-bold">No Data</h3>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
