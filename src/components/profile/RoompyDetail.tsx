import { FaCrown } from 'react-icons/fa';

export default function RoompyDetail() {
  return (
    <article className="mx-auto mt-3 bg-white max-w-7xl">
      {/* <!-- Text Header --> */}
      <header className="container w-full mx-auto">
        <div className="flex flex-col items-center py-12">
          <a
            className="text-5xl font-bold text-gray-800 uppercase hover:text-gray-700"
            href="#"
          >
            User Image / bisa juga Room image carousel
          </a>
        </div>
      </header>

      {/* <!-- Topic Nav --> */}
      {/* x-data="{ open: false }" */}
      <nav className="w-full py-4 bg-gray-100 border-t border-b">
        <div className="block sm:hidden">
          {/* @click="open = !open" */}
          <a
            href="#"
            className="flex items-center justify-center block text-base font-bold text-center uppercase md:hidden"
          >
            Topics
            {/* :className="open ? 'fa-chevron-down': 'fa-chevron-up'" */}
            <i className="ml-2 fas"></i>
          </a>
        </div>

        {/*  :className="open ? 'block': 'hidden' */}
        <div className="flex-grow w-full sm:flex sm:items-center sm:w-auto">
          <div className="container flex flex-col items-center justify-center w-full px-6 py-2 mx-auto mt-0 text-sm font-bold uppercase sm:flex-row">
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Technology{' '}
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Automotive
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Finance
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Politics
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Culture
            </a>
            <a href="#" className="px-4 py-2 mx-2 rounded hover:bg-gray-400">
              Sports
            </a>
          </div>
        </div>
      </nav>

      {/* details */}
      <div className="container flex flex-wrap py-6 mx-auto">
        {/* <!-- Post Section --> */}
        <section className="flex flex-col items-center w-full px-3 md:w-2/3">
          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              <div className="flex items-center pb-4">
                <p className="text-2xl font-bold hover:text-gray-700">
                  Nama User
                </p>

                <FaCrown className="ml-3 text-2xl text-yellow-500" />
              </div>

              <p className="pb-8 text-sm">
                By{' '}
                <a href="#" className="font-semibold hover:text-gray-800">
                  David Grzyb
                </a>
                , Published on April 25th, 2020
              </p>

              <h1 className="pb-3 text-2xl font-bold">Introduction</h1>

              <p className="pb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel neque non libero suscipit suscipit eu eu urna.
                Proin bibendum urna mattis ante malesuada ultrices. Etiam in
                turpis vitae elit dictum aliquet. Donec mattis risus in turpis
                dapibus, eget tempus sem tincidunt. Orci varius natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. In est enim, imperdiet sed ornare quis, pellentesque vel
                risus. Nunc vitae vestibulum turpis. Quisque eget eleifend urna.
                Etiam et vulputate purus, ut egestas sem. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Duis quis neque non urna venenatis mollis et at massa.
                Pellentesque sem lacus, malesuada vel hendrerit molestie, mollis
                vel elit.
              </p>
            </div>
          </article>

          <article className="flex flex-col my-4 shadow">
            <div className="flex flex-col justify-start p-6 bg-white">
              <div className="flex items-center">
                <p className="pb-4 text-3xl font-bold hover:text-gray-700">
                  Nama User
                </p>

                <FaCrown className="text-lg text-yellow-500" />
              </div>

              <p className="pb-8 text-sm">
                By{' '}
                <a href="#" className="font-semibold hover:text-gray-800">
                  David Grzyb
                </a>
                , Published on April 25th, 2020
              </p>

              <h1 className="pb-3 text-2xl font-bold">Introduction</h1>

              <p className="pb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel neque non libero suscipit suscipit eu eu urna.
                Proin bibendum urna mattis ante malesuada ultrices. Etiam in
                turpis vitae elit dictum aliquet. Donec mattis risus in turpis
                dapibus, eget tempus sem tincidunt. Orci varius natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. In est enim, imperdiet sed ornare quis, pellentesque vel
                risus. Nunc vitae vestibulum turpis. Quisque eget eleifend urna.
                Etiam et vulputate purus, ut egestas sem. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Duis quis neque non urna venenatis mollis et at massa.
                Pellentesque sem lacus, malesuada vel hendrerit molestie, mollis
                vel elit.
              </p>
            </div>
          </article>

          <div className="flex w-full pt-6">
            <a
              href="#"
              className="w-1/2 p-6 text-left bg-white shadow hover:shadow-md"
            >
              <p className="flex items-center text-lg font-bold text-blue-800">
                <i className="pr-1 fas fa-arrow-left"></i> Previous
              </p>
              <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
            </a>
            <a
              href="#"
              className="w-1/2 p-6 text-right bg-white shadow hover:shadow-md"
            >
              <p className="flex items-center justify-end text-lg font-bold text-blue-800">
                Next <i className="pl-1 fas fa-arrow-right"></i>
              </p>
              <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
            </a>
          </div>

          <div className="flex flex-col w-full p-6 mt-10 mb-10 text-center bg-white shadow md:text-left md:flex-row">
            <div className="flex justify-center w-full pb-4 md:w-1/5 md:justify-start">
              <img
                src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
                className="w-32 h-32 rounded-full shadow"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 md:justify-start">
              <p className="text-2xl font-semibold">David</p>
              <p className="pt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel neque non libero suscipit suscipit eu eu urna.
              </p>
              <div className="flex items-center justify-center pt-4 text-2xl text-blue-800 no-underline md:justify-start">
                <a className="" href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a className="pl-4" href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a className="pl-4" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="pl-4" href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Sidebar Section --> */}
        <aside className="flex flex-col items-center w-full px-3 md:w-1/3">
          <div className="flex flex-col w-full p-6 my-4 bg-white shadow">
            <p className="pb-5 text-xl font-semibold">About Us</p>
            <p className="pb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              mattis est eu odio sagittis tristique. Vestibulum ut finibus leo.
              In hac habitasse platea dictumst.
            </p>
            <a
              href="#"
              className="flex items-center justify-center w-full px-2 py-3 mt-4 text-sm font-bold text-white uppercase bg-blue-800 rounded hover:bg-blue-700"
            >
              Get to know us
            </a>
          </div>

          <div className="flex flex-col w-full p-6 my-4 bg-white shadow">
            <p className="pb-5 text-xl font-semibold">Instagram</p>
            <div className="grid grid-cols-3 gap-3">
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
              />
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=2"
              />
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=3"
              />
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=4"
              />
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=5"
              />
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=6"
              />
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=7"
              />
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=8"
              />
              <img
                className="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=9"
              />
            </div>

            <a
              href="#"
              className="flex items-center justify-center w-full px-2 py-3 mt-6 text-sm font-bold text-white uppercase bg-blue-800 rounded hover:bg-blue-700"
            >
              <i className="mr-2 fab fa-instagram"></i> Follow @dgrzyb
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
