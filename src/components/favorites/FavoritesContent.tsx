import { useRouter } from 'next/router';
import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { FaSortAmountUp, FaSortAmountDown, FaEllipsisV } from 'react-icons/fa';
import { toast } from 'react-toastify';
// files
import { FavoritesPageProps } from '../../pages/dashboard/favorites';

interface Props extends FavoritesPageProps {
  busy: boolean;
  setBusy: Dispatch<SetStateAction<boolean>>;
}

export default function InboxContent({ busy, setBusy, dbUser }: Props) {
  // hooks
  const [isAsc, setIsAsc] = useState<boolean>(false);
  const { push } = useRouter();

  return (
    <div className="flex-1 pb-20 mt-12 overflow-hidden bg-gray-100 md:mt-2 md:pb-0">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-indigo-700 to-gray-800">
          <h3 className="pl-2 font-bold">Favorites</h3>
        </div>
      </div>

      {/* main content */}
      <main className="flex flex-1 h-screen bg-gray-200">Favorites</main>
    </div>
  );
}
