import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Select from 'react-select';
// files
import SiteHeader from '../rooms/SiteHeader';
import RoompiesFilters from './RoompiesFilters';
import RoompyCard2 from './RoompyCard2';
import { Roompies, RoompiesProps } from '../../utils/interfaces';

const sorts = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'age', label: 'Oldest' },
  { value: 'budget', label: 'Highest Budget' },
  { value: 'moveDate', label: 'Earliest Move Date' },
];

export default function RoompiesComp({ roompies }: RoompiesProps) {
  const [selectedSort, setSelectedSort] = useState(null); // object

  return (
    <div className="min-h-full antialiased xl:flex xl:flex-col xl:h-screen">
      {/* site header */}
      <SiteHeader />

      <div className="w-full min-h-screen xl:flex-1 xl:flex">
        {/* search filters */}
        <RoompiesFilters />

        <main className="py-6 bg-gray-200 xl:flex-1 xl:overflow-x-hidden">
          {/* total results & sort */}
          <section className="flex items-center justify-between px-4 xl:px-8">
            <span className="px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded-md">
              {roompies.length} results
            </span>

            {/* Sort */}
            <Select
              className="w-1/3 cursor-pointer lg:w-1/4"
              placeholder="Sort to:"
              options={sorts}
              defaultValue={selectedSort}
              onChange={(sort) => {
                setSelectedSort(sort);
                roompies.sort((a, b) => b[sort.value] - a[sort.value]);
              }}
            />
          </section>

          {/* roompies cards */}
          <section className="flex-wrap justify-center gap-5 px-4 mt-6 sm:inline-flex sm:pt-2 sm:pb-8 xl:px-8">
            {(roompies as Roompies).map((roompy, i) => (
              <div
                key={roompy.id}
                className={`${
                  i > 0 ? 'mt-10 sm:ml-4' : ''
                } sm:mt-0 sm:w-80 sm:flex-shrink-0`}
              >
                <RoompyCard2 roompy={roompy} />
              </div>
            ))}
          </section>

          {/* pagination */}
          <Pagination />
        </main>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="flex flex-col items-center my-10">
      <article className="flex text-gray-500">
        <section className="flex items-center justify-center w-12 h-12 mr-1 bg-white border border-gray-300 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white">
          <FiChevronLeft className="w-6 h-6" />
        </section>

        <section className="flex h-12 font-medium bg-white border border-gray-300 rounded-full">
          <div className="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex hover:bg-purple-500 hover:text-white">
            1
          </div>
          <div className="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex hover:bg-purple-500 hover:text-white">
            2
          </div>
          <div className="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex hover:bg-purple-500 hover:text-white">
            3
          </div>

          <div className="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex hover:bg-purple-500 hover:text-white">
            ...
          </div>

          <div className="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex hover:bg-purple-500 hover:text-white">
            13
          </div>
          <div className="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex hover:bg-purple-500 hover:text-white">
            14
          </div>
          <div className="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex hover:bg-purple-500 hover:text-white">
            15
          </div>
        </section>

        <section className="flex items-center justify-center w-12 h-12 ml-1 bg-white border border-gray-300 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white">
          <FiChevronRight className="w-6 h-6" />
        </section>
      </article>
    </div>
  );
}
