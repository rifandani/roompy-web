import { MdTimelapse } from 'react-icons/md';
import { FaCrown, FaShoppingCart, FaDoorOpen } from 'react-icons/fa';
// files
import { FireUser } from '../../utils/interfaces';

export interface UserAsProps {
  user: FireUser;
}

export default function DashboardContent({ user }: UserAsProps) {
  return (
    <div className="flex-1 pb-24 mt-12 bg-gray-100 md:mt-2 md:pb-5">
      {/* content title */}
      <div className="pt-4 bg-gray-800">
        <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-purple-700 to-gray-800">
          <h3 className="pl-2 font-bold">Dashboard</h3>
        </div>
      </div>

      {/* subscription */}
      <div className="flex flex-wrap items-center justify-between w-full pt-4">
        <h6 className="pl-6 text-2xl italic font-bold text-yellow-500">
          Subscription
        </h6>

        <button
          className="flex items-center p-2 mt-2 ml-6 mr-6 transition duration-500 transform border-2 border-yellow-500 rounded-lg hover:scale-125 md:ml-0 md:mt-0 bg-yellow-50"
          onClick={() => {}}
        >
          <FaShoppingCart className="mr-2 text-lg text-yellow-500" />

          <p className="flex-grow font-bold text-gray-900">Upgrade</p>
        </button>
      </div>

      {/* subscription cards */}
      <div className="flex flex-wrap">
        <div className="w-full p-6 md:w-1/2 xl:w-1/3">
          <div className="p-5 border-b-4 border-yellow-500 rounded-lg shadow-xl bg-gradient-to-b from-yellow-200 to-yellow-100">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-4 bg-yellow-500 rounded-full">
                  <FaCrown className="text-2xl text-white" />
                </div>
              </div>

              <div className="flex-1 text-right md:text-center">
                <h5 className="italic font-bold text-gray-500 uppercase">
                  Status
                </h5>

                <h3 className="text-2xl font-bold">Free User</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-6 md:w-1/2 xl:w-1/3">
          <div className="p-5 border-b-4 border-yellow-500 rounded-lg shadow-xl bg-gradient-to-b from-yellow-200 to-yellow-100">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-4 bg-yellow-500 rounded-full">
                  <MdTimelapse className="text-2xl text-white" />
                </div>
              </div>

              <div className="flex-1 text-right md:text-center">
                <h5 className="italic font-bold text-gray-500 uppercase">
                  Expiry
                </h5>

                <h3 className="text-2xl font-bold">
                  {true ? 'None' : '25 February 2021'}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms listings */}
        <div className="flex flex-wrap items-center justify-between w-full pt-4">
          <h6 className="pl-6 text-2xl italic font-bold text-pink-500">
            Rooms Listings
          </h6>

          <button
            className="flex items-center p-2 mt-2 ml-6 mr-6 transition duration-500 transform border-2 border-pink-500 rounded-lg hover:scale-125 md:ml-0 md:mt-0 bg-pink-50"
            onClick={() => {}}
          >
            <FaDoorOpen className="mr-2 text-lg text-pink-500" />

            <p className="flex-grow font-bold text-gray-900">Create Rooms</p>
          </button>
        </div>

        {/* Rooms cards */}
        <div className="w-full p-6 md:w-1/2 xl:w-1/3">
          <div className="p-5 border-b-4 border-pink-500 rounded-lg shadow-xl bg-gradient-to-b from-pink-200 to-pink-100">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-4 bg-pink-500 rounded-full">
                  <i className="fas fa-server fa-2x fa-inverse"></i>
                </div>
              </div>

              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold text-gray-500 uppercase">
                  Total Listings
                </h5>

                <h3 className="text-2xl font-bold">1</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
