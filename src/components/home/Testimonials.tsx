import { useState } from 'react'
import { Flip } from 'react-awesome-reveal'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const monials = [
  {
    desc: 'Karena situasi ekonomi yang tidak terduga, saya harus mencari teman sekamar. Saya tidak pernah memilikinya sebelumnya dan saya agak ragu-ragu. Jika saya akan berbagi tempat tinggal yang sama dengan orang lain, saya menginginkan seseorang yang cocok dengan saya. Bagaimana saya akan melakukan ini? Saya iseng buka website Roompy dan menemukan bahwa kita dapat menyaring setiap orang dan mendapatkan gambaran tentang karakter roompies tersebut. Teman sekamar yang saya temukan, profilnya identik dengan profil saya. Kami telah menjadi teman sekamar selama 6 minggu dan ini merupakan kejutan yang menyenangkan. Terima kasih Roompy!',
    name: 'John Doe',
    date: '25 Desember 2020',
  },
  {
    desc: 'Terima kasih banyak! Website anda sangat membantu. Saya dapat menemukan teman sekamar dari situs anda ... Roompy sangat bermanfaat bagi saya! Saya telah mencari teman sekamar selama berbulan-bulan, tapi kali ini dapat dengan sangat cepat. Terima kasih sekali lagi!',
    name: 'Jane Doe',
    date: '18 November 2020',
  },
]

export default function Testimonials(): JSX.Element {
  // hooks
  const [index, setIndex] = useState<number>(0)

  function onLeft(): void {
    if (index === 0) {
      setIndex(monials.length - 1)
    } else {
      setIndex((prev) => prev - 1)
    }
  }

  function onRight(): void {
    if (index === monials.length - 1) {
      setIndex(0)
    } else {
      setIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="relative w-full py-20 overflow-hidden bg-gray-100">
      <main className="container max-w-screen-xl min-h-full mx-auto">
        <h2 className="px-8 pt-6 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl sm:leading-none lg:text-left xl:max-w-screen-xl">
          What our
          <span className="text-purple-700"> Roompies </span>are saying...
        </h2>

        <p className="px-8 mt-5 text-base italic text-center text-gray-500 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 lg:text-left xl:max-w-screen-xl">
          Ceritakan kepada dunia apa yang kalian
          <span className="text-purple-700"> rasakan</span>
        </p>

        <article className="text-gray-500 body-font">
          <div className="container px-8 pt-10 mx-auto lg:my-8">
            <Flip direction="horizontal" triggerOnce>
              <div className="w-full mx-auto text-center xl:w-1/2 lg:w-3/4">
                <svg
                  className="inline-block w-8 h-8 mb-8 text-gray-700 fill-current"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>

                <p className="text-lg italic leading-relaxed">
                  {monials[index].desc}
                </p>

                <span className="inline-block w-10 h-1 mt-8 mb-6 bg-purple-500 rounded"></span>

                <section className="flex items-center justify-around w-full">
                  <span
                    onClick={() => onLeft()}
                    className="p-2 border border-gray-700 rounded-full cursor-pointer hover:bg-purple-200 hover:border-purple-500"
                  >
                    <FaChevronLeft className="w-6 h-6 text-gray-900 hover:text-purple-700" />
                  </span>

                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-sm font-medium tracking-wider text-gray-900 title-font">
                      {monials[index].name}
                    </h2>

                    <p className="text-gray-500">{monials[index].date}</p>
                  </div>

                  <span
                    onClick={() => onRight()}
                    className="p-2 border border-gray-700 rounded-full cursor-pointer hover:bg-purple-200 hover:border-purple-500"
                  >
                    <FaChevronRight className="w-6 h-6 text-gray-900 hover:text-purple-700" />
                  </span>
                </section>
              </div>
            </Flip>
          </div>
        </article>
      </main>
    </div>
  )
}
