import { useState, FormEvent } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoFilter } from 'react-icons/io5';
// files

export default function RoompiesFilters() {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-800 xl:w-72">
      <article className="flex justify-between px-4 py-3 xl:hidden">
        {/* search box buat nyari lokasi */}
        <section className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <HiOutlineSearch className="w-6 h-6 text-gray-600" />
          </div>

          <input
            className="block w-full py-2 pl-10 pr-4 text-white bg-gray-900 rounded-lg form-input focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Search by keywords"
            type="search"
          />
        </section>

        <button
          className={`${
            isOpen ? 'bg-gray-600' : 'bg-gray-700'
          } ml-4 inline-flex items-center hover:bg-gray-600 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoFilter className="w-6 h-6 text-gray-500" />

          <span className="ml-1 font-medium text-white">Filters</span>
        </button>
      </article>

      {/* form */}
      <form
        className={`${
          isOpen ? 'block' : 'hidden'
        } xl:h-full xl:flex xl:flex-col xl:justify-between`}
      >
        <article className="bg-gray-800 lg:flex xl:block xl:overflow-y-auto">
          {/* gender */}
          <section className="px-4 py-4 border-t border-gray-900 lg:w-1/3 xl:border-t-0 xl:w-full">
            <span className="block text-sm font-semibold text-gray-500">
              Jenis Kelamin
            </span>

            <div className="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <label className="flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-full lg:px-0">
                <input
                  className="text-lg text-purple-700 bg-gray-900 form-radio focus:bg-purple-700"
                  type="radio"
                  name="propertyType"
                  value="house"
                />
                <span className="ml-2 text-white">Pria</span>
              </label>

              <label className="flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-full lg:px-0">
                <input
                  className="text-lg text-purple-700 bg-gray-900 form-radio focus:bg-purple-700"
                  type="radio"
                  name="propertyType"
                  value="apartment"
                />
                <span className="ml-2 text-white">Wanita</span>
              </label>
            </div>
          </section>

          <section className="px-4 py-4 border-t border-gray-900 lg:w-1/3 lg:border-l xl:w-full">
            <div className="flex flex-wrap -mx-2">
              <label className="block w-full px-2 sm:mt-0 sm:w-1/2 lg:w-full">
                <span className="text-sm font-semibold text-gray-500">
                  Rentang Usia
                </span>

                <select className="block w-full mt-1 text-white bg-gray-600 rounded-md shadow form-select focus:bg-gray-600">
                  <option>Dibawah 20 thn</option>
                  <option>Dibawah 30 thn</option>
                  <option>Dibawah 40 thn</option>
                  <option>Dibawah 50 thn</option>
                  <option>Diatas 50 thn</option>
                </select>
              </label>

              <label className="block w-full px-2 sm:mt-0 sm:w-1/2 lg:w-full">
                <span className="text-sm font-semibold text-gray-500">
                  Maksimal Budget
                </span>

                <select className="block w-full mt-1 text-white bg-gray-600 rounded-md shadow form-select focus:bg-gray-600">
                  <option>Rp 500rb/bln</option>
                  <option>Rp 1jt/bln</option>
                  <option>Rp 2jt/bln</option>
                  <option>Rp 3jt/bln</option>
                  <option>Diatas Rp 3jt/bln</option>
                </select>
              </label>
            </div>
          </section>

          {/* Roompies Pref */}
          <section className="px-4 py-4 border-t border-gray-900 lg:w-1/3 lg:border-l xl:w-full">
            <span className="block text-sm font-semibold text-gray-500">
              Preferensi Roompies
            </span>

            <div className="sm:flex sm:-mx-2 sm:flex-wrap">
              <label className="flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
                <input
                  className="text-purple-700 bg-gray-900 rounded-md form-checkbox focus:bg-purple-700"
                  type="checkbox"
                  name="balcony"
                />
                <span className="ml-2 text-white">Smoker</span>
              </label>
              <label className="flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
                <input
                  className="text-purple-700 bg-gray-900 rounded-md form-checkbox focus:bg-purple-700"
                  type="checkbox"
                  name="pool"
                />
                <span className="ml-2 text-white">Own a pet</span>
              </label>
            </div>
          </section>
        </article>

        <div className="px-4 py-4 bg-gray-900 sm:text-right">
          <button className="block w-full px-4 py-2 font-semibold text-white bg-purple-500 rounded-lg focus:ring-4 focus:ring-purple-200 focus:outline-none sm:w-auto sm:inline-block hover:bg-purple-700 xl:block xl:w-full">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
