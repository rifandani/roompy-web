import { useEffect, useState } from 'react';
import { Flip } from 'react-awesome-reveal';
// files
import CardHome from './CardHome';
import { db } from '../configs/firebaseConfig';

export default function ContentHome() {
  const [roompies, setRoompies] = useState(null);

  useEffect(() => {
    getRoompies();

    getUsers();
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

        setRoompies(roompiesFirestore);

        console.log(roompies);
      });
  }

  async function getUsers() {
    return db
      .collection('users')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async (snap) => {
        // tambahkan id di array nya
        const usersFirestore = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(usersFirestore);
      });
  }

  return (
    <div className="py-20 relative w-full min-h-screen overflow-hidden">
      <main className="sm:px-6 lg:px-8 px-4 pt-6 min-h-full max-w-screen-xl mx-auto container">
        <h3 className="text-center lg:text-left text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
          Search the
          <span className="text-purple-700"> Roompies</span>
        </h3>

        <p className="sm:text-lg md:text-xl lg:mx-0 text-center lg:text-left mt-5 mb-20 italic text-base text-gray-500">
          <span className="text-purple-700">Roompy </span>
          tempat terbaik untuk mencari teman satu
          <span className="text-purple-700"> Roommate</span>
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Flip duration={2000} direction="horizontal">
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
            <CardHome />
          </Flip>
        </div>

        {/* pagination */}
        <article className="mt-8 flex justify-center">
          <button className="py-2 px-4 border rounded-md text-purple-700 bg-purple-100 hover:text-white hover:bg-purple-700">
            Load more...
          </button>
        </article>
      </main>
    </div>
  );
}
