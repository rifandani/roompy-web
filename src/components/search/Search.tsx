import { useState, MouseEvent, useEffect } from 'react';
import { Flip } from 'react-awesome-reveal';
import Select from 'react-select';
import { toast } from 'react-toastify';
// files
import RoompyCard from '../RoompyCard';
import { db } from '../../configs/firebaseConfig';
import { Roompies } from '../../utils/interfaces';

export default function Search() {
  const [types] = useState([
    { value: 'roompies', label: 'Roompies' },
    { value: 'rooms', label: 'Rooms' },
  ]);
  const [selectedTypes, setSelectedTypes] = useState(null); // object
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState(null); // object
  const [roompies, setRoompies] = useState<Roompies | []>([]);

  async function getCities() {
    return db
      .collection('cities')
      .orderBy('nama', 'asc')
      .onSnapshot(async (snap) => {
        setCities([]);

        const citiesFirestore = snap.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
          value: doc.get('nama'),
          label: doc.get('nama'),
        }));

        setCities(citiesFirestore);
      });
  }

  useEffect(() => {
    getCities();
  }, []);

  async function search(e: MouseEvent) {
    e.preventDefault();

    // kalau select input tidak dipilih
    if (!selectedTypes || !selectedCities)
      return toast.warning('Choose the filter please');

    return db
      .collection(selectedTypes.value)
      .where('city', '==', selectedCities.value)
      .onSnapshot(async (snap) => {
        setRoompies([]);

        const roompiesFirestore = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setRoompies(roompiesFirestore as Roompies);
        console.log('roompies => ', roompiesFirestore);
      });
  }

  return (
    <article className="relative w-full py-20">
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
          <section className="flex flex-col items-center justify-center w-full p-5 mx-auto mt-10 mb-20">
            <div className="flex items-center justify-center w-full mb-5 space-x-5">
              {/* types select */}
              <Select
                className="w-1/3 lg:w-1/5"
                options={types}
                // defaultValue={types[0]}
                placeholder="Filter types"
                onChange={(type) => setSelectedTypes(type)}
              />

              {/* location select */}
              <Select
                className="w-1/3"
                options={cities}
                // defaultValue={cities[0]}
                placeholder="Filter cities"
                onChange={(city) => setSelectedCities(city)}
              />
            </div>

            {/* Search button */}
            <div className="flex justify-center w-full">
              <button
                className="px-8 py-3 text-base font-medium leading-6 text-white bg-purple-700 border border-transparent rounded-md md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-100 hover:text-purple-700"
                id="searchButton"
                onClick={(e) => search(e)}
              >
                Search
              </button>
            </div>
          </section>
        </form>

        {/* roompies card list */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Flip direction="horizontal" duration={2000} triggerOnce>
            {roompies &&
              (roompies as Roompies).map((roompy) => (
                <RoompyCard key={roompy.id} roompy={roompy} />
              ))}
          </Flip>
        </section>

        {roompies === [] && (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-xl">No data</p>
          </div>
        )}
      </div>
    </article>
  );
}
