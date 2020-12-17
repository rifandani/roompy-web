import { useEffect, useState } from 'react';
import { Flip } from 'react-awesome-reveal';
// files
import CardHome from './CardHome';
import { db } from '../configs/firebaseConfig';
import { Roompies } from '../utils/interfaces';

export default function ContentHome() {
  const [roompies, setRoompies] = useState<Roompies | []>([]);

  useEffect(() => {
    getRoompies();
  }, []);

  async function getRoompies() {
    return db
      .collection('roompies')
      .orderBy('age', 'desc')
      .limit(8)
      .onSnapshot(async (snap) => {
        setRoompies([]);

        // tambahkan id di array nya
        const roompiesFirestore = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setRoompies(roompiesFirestore as Roompies);
      });
  }

  return (
    <div className="relative w-full min-h-screen py-20 overflow-hidden">
      <main className="container max-w-screen-xl min-h-full px-4 pt-6 mx-auto sm:px-6 lg:px-8">
        <h3 className="text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 lg:text-left sm:text-5xl sm:leading-none md:text-6xl">
          Search the
          <span className="text-purple-700"> Roompies</span>
        </h3>

        <p className="mt-5 mb-20 text-base italic text-center text-gray-500 sm:text-lg md:text-xl lg:mx-0 lg:text-left">
          <span className="text-purple-700">Roompy </span>
          tempat terbaik untuk mencari teman satu
          <span className="text-purple-700"> Roommate</span>
        </p>

        {/* looping roompies array */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Flip duration={2000} direction="horizontal" triggerOnce>
            {roompies !== [] ? (
              (roompies as Roompies).map((roompy) => (
                <CardHome key={roompy.id} roompy={roompy} />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-32">
                <p className="text-xl text-purple-500">No data</p>
              </div>
            )}
          </Flip>
        </div>

        {/* pagination */}
        <article className="flex justify-center mt-8">
          <button className="px-4 py-2 text-purple-700 bg-purple-100 border rounded-md hover:text-white hover:bg-purple-700">
            Load more...
          </button>
        </article>
      </main>
    </div>
  );
}
