import { useState, MouseEvent, useEffect, useContext } from 'react';
import { Flip } from 'react-awesome-reveal';
import Select from 'react-select';
import { toast } from 'react-toastify';
// files
import RoompyCard from '../RoompyCard';
import { db } from '../../configs/firebaseConfig';
import { Roompies } from '../../utils/interfaces';
import UserContext from '../../contexts/UserContext';
import subDistrictsJson2 from '../../utils/sub-districts2.json';

const types = [
  { value: 'Pria', label: 'Pria' },
  { value: 'Wanita', label: 'Wanita' },
];

const sorts = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'age', label: 'Oldest' },
  { value: 'budget', label: 'Highest Budget' },
  { value: 'moveDate', label: 'Earliest Move Date' },
];

const subDistrictsOptions = subDistrictsJson2.map((el: string) => ({
  label: el,
  value: el,
}));

export default function Search() {
  // state
  const [selectedTypes, setSelectedTypes] = useState(null); // object
  const [selectedSubDistricts, setSelectedSubDistricts] = useState(null); // object
  const [selectedSort, setSelectedSort] = useState(null); // object
  const [roompies2, setRoompies2] = useState<Roompies | []>([]); // array
  const [limit, setLimit] = useState<number>(20); // number

  // UserContext
  const { user } = useContext(UserContext);

  // useEffect
  useEffect(() => {
    getRoompies();
  }, []);

  async function getRoompies() {
    // get latest roompies
    const snap = await db
      .collection('roompies')
      .limit(user ? limit : 12)
      .get();

    const roompiesFirestore = snap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setRoompies2(roompiesFirestore as Roompies);
  }

  async function search(e: MouseEvent) {
    e.preventDefault();

    // kalau select input tidak dipilih
    if (!selectedTypes || !selectedSubDistricts)
      return toast.warning('Choose the filter please');

    // get latest cities collection
    const snap = await db
      .collection('roompies')
      .where('gender', '==', selectedTypes.value)
      .where('locPref', 'array-contains', selectedSubDistricts.value)
      .get();

    const roompiesFirestore = snap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setRoompies2(roompiesFirestore as Roompies);
  }

  async function onLoadMore() {
    if (!user) {
      return toast('Please login, to view more roompies');
    }

    setLimit((prev) => prev * 2);

    await getRoompies();
  }

  return (
    <article className="relative w-full py-10 bg-white">
      <div className="max-w-screen-xl min-h-full mx-auto">
        <form>
          {/* title and subtitle */}
          <section className="flex flex-col w-full mb-10 text-center">
            <h2 className="px-8 pt-6 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl sm:leading-none xl:max-w-screen-xl">
              Connect and find
              <span className="text-purple-700 langar"> Roommate</span>
            </h2>

            <p className="px-8 mt-5 text-base italic text-center text-gray-500 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 xl:max-w-screen-xl">
              Search and filter the
              <span className="text-purple-700"> Roompies</span>
            </p>
          </section>

          {/* filter form */}
          <section className="flex flex-col items-center justify-center w-full p-5 mx-auto mb-10">
            <div className="flex flex-col items-stretch w-full mb-5 md:flex-row">
              {/* gender select */}
              <Select
                className="flex-grow"
                placeholder="Filter gender"
                options={types}
                onChange={(type) => setSelectedTypes(type)}
              />

              {/* locPref select */}
              <Select
                className="flex-grow mx-0 my-2 md:mx-2 md:my-0 lg:w-1/5"
                placeholder="Filter cities"
                options={subDistrictsOptions}
                defaultValue={selectedSubDistricts}
                onChange={setSelectedSubDistricts}
              />

              <button
                className="flex-grow px-5 py-1 text-lg font-medium text-purple-700 bg-purple-100 border border-transparent rounded-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-700 hover:text-white"
                id="searchButton"
                onClick={(e) => search(e)}
              >
                Search
              </button>
            </div>

            {/* SORTING */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center px-3 py-1 border border-gray-400 rounded-md">
                <strong className="mr-1">{roompies2.length}</strong>
                <p className="text-sm text-gray-500">results</p>
              </div>

              {/* Sort */}
              <Select
                className="w-1/3 lg:w-1/4"
                placeholder="Sort to:"
                options={sorts}
                defaultValue={selectedSort}
                onChange={(sort) => {
                  setSelectedSort(sort);

                  // sort descending prev Roompies
                  setRoompies2((prev) =>
                    prev.sort((a, b) => b[sort.value] - a[sort.value]),
                  );
                }}
              />
            </div>
          </section>
        </form>
      </div>

      <div className="max-w-screen-xl min-h-full mx-auto mt-10">
        {/* roompies card list */}
        {roompies2 === [] ? (
          <div className="flex items-center justify-center w-full h-full py-5">
            <p className="text-2xl">No data</p>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Flip direction="horizontal" duration={2000} triggerOnce>
                {(roompies2 as Roompies).map((roompy) => (
                  <RoompyCard key={roompy.id} roompy={roompy} />
                ))}
              </Flip>
            </section>

            <section className="flex justify-center mt-8">
              <button
                onClick={onLoadMore}
                className="px-4 py-2 text-purple-700 bg-purple-100 border rounded-md hover:text-white hover:bg-purple-700"
              >
                Load more...
              </button>
            </section>
          </>
        )}
      </div>
    </article>
  );
}
