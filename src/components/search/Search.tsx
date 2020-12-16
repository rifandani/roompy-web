import { useState, MouseEvent } from 'react';
import { Flip } from 'react-awesome-reveal';
import Select from 'react-select';
// files
import CardHome from '../CardHome';

export default function Search() {
  const [types] = useState([
    { value: 'roompies', label: 'Roompies' },
    { value: 'rooms', label: 'Rooms' },
  ]);
  const [selectedTypes, setSelectedTypes] = useState(null);

  const [cities] = useState([
    { value: 'yogyakarta', label: 'Yogyakarta' },
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'bandung', label: 'Bandung' },
  ]);
  const [selectedCities, setSelectedCities] = useState(null);

  async function search(e: MouseEvent) {
    e.preventDefault();

    // kalau select input tidak dipilih
    if (!selectedTypes || !selectedCities) {
      return console.log('Choose the filter please');
    }

    console.log(selectedTypes);
    console.log(selectedCities);
  }

  return (
    <article className="py-20 relative w-full">
      <div className="min-h-full max-w-screen-xl mx-auto">
        <form>
          {/* title and subtitle */}
          <section className="flex flex-col text-center w-full mb-10">
            <h2 className="px-8 pt-6 text-4xl sm:text-5xl md:text-6xl tracking-tight leading-10 sm:leading-none font-extrabold text-center xl:max-w-screen-xl text-gray-900">
              Connect and find
              <span className="text-purple-700"> Roommate</span>
            </h2>

            <p className="px-8 mt-5 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 italic text-base text-center xl:max-w-screen-xl text-gray-500">
              Search and filter the
              <span className="text-purple-700"> Roompies</span>
            </p>
          </section>

          {/* filter form */}
          <section className="mx-auto w-full flex flex-col justify-center items-center p-5 mt-10 mb-20">
            <div className="flex justify-center items-center w-full space-x-5 mb-5">
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
                className="px-8 py-3 md:py-4 md:text-lg md:px-10 text-base leading-6 font-medium rounded-md focus:outline-none text-white bg-purple-700 hover:bg-purple-100 hover:text-purple-700 border border-transparent"
                onClick={(e) => search(e)}
              >
                Search
              </button>
            </div>
          </section>
        </form>

        {/* roompies card list */}
        <section className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Flip direction="horizontal" duration={2000}>
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
          </Flip>
        </section>
      </div>
    </article>
  );
}
