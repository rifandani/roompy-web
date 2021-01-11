import { useState } from 'react';
import Select from 'react-select';
// files
import SiteHeader from '../SiteHeader';
import RoompiesFilters from './RoompiesFilters';
import RoompyCard2 from './RoompyCard2';
import Pagination from '../Pagination';
import { RoompiesProps } from '../../utils/interfaces';

const sorts = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'age', label: 'Oldest' },
  { value: 'budget', label: 'Highest Budget' },
  { value: 'moveDate', label: 'Earliest Move Date' },
];

export default function RoompiesComp({ roompies }: RoompiesProps) {
  const [selectedSort, setSelectedSort] = useState(null); // object
  const [currentPage, setCurrentPage] = useState<number>(0); // number => for pagination
  const [limit] = useState<number>(12); // number => for pagination

  const offset = currentPage * limit;

  const currentRoompies = roompies
    .slice(offset, offset + limit)
    .map((roompy, i) => (
      <div
        key={roompy.id}
        className={`${
          i > 0 ? 'mt-10 sm:ml-4' : ''
        } sm:mt-0 sm:w-80 sm:flex-shrink-0`}
      >
        <RoompyCard2 roompy={roompy} />
      </div>
    ));

  return (
    <div className="min-h-full antialiased xl:flex xl:flex-col xl:h-screen">
      {/* site header */}
      <SiteHeader />

      <div className="w-full min-h-screen xl:flex-1 xl:flex">
        {/* sidebar search filters */}
        <RoompiesFilters />

        {/* main content */}
        <main className="py-6 bg-gray-200 xl:flex-1 xl:overflow-x-hidden">
          {/* total results & sort */}
          <section className="flex items-center justify-between px-4">
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
          <section className="flex-wrap justify-center gap-5 px-4 mt-6 sm:inline-flex sm:pt-2 sm:pb-8">
            {roompies.length === 0 ? (
              <h3 className="font-bold">No Data</h3>
            ) : (
              currentRoompies
            )}
          </section>

          {/* pagination */}
          <Pagination
            roompies={roompies}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
          />
        </main>
      </div>
    </div>
  );
}
