import Flip from 'react-reveal/Flip';
// files
import CardHome from './CardHome';

export default function ContentHome() {
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

        {/* <article className="my-2 py-2 h-20 w-full flex items-center space-x-3">
          <button
            onClick={() => {}}
            className="px-4 py-1 border rounded-md shadow-lg cursor-pointer hover:bg-yellow-200 transform transition duration-500 hover:scale-125"
          >
            <p className="font-light uppercase">Newest</p>
          </button>
        </article> */}

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Flip left duration={2000}>
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
