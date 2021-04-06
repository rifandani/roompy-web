import { useRouter } from 'next/router'

const pricings = [
  {
    id: 1,
    recommended: false,
    title: 'Guest',
    desc: 'Hanya ingin melihat-lihat',
    price: 0,
    features: [
      'Bisa melihat halaman detail roompies',
      'Search roompies max 12 roompies list',
    ],
  },
  {
    id: 2,
    recommended: false,
    title: 'Free',
    desc: 'Ikut bergabung dalam komunitas',
    price: 0,
    features: [
      'Semua fitur dari Guest Pricing',
      'Search roompies UNLIMITED',
      'Fitur matching recommendations',
      'Posting max 1 rooms dan roompies',
      'Posting max 1 foto ketika membuat rooms',
      'Favorite list max 3 roompies',
      'Message max 3 roompies',
      'Report max 10 roompies',
    ],
  },
  {
    id: 3,
    recommended: true,
    title: 'Premium',
    desc: 'User prioritas yang berkontribusi terhadap komunitas',
    price: 100000,
    features: [
      'Semua fitur dari Free Pricing',
      'Tampil paling atas di search/filter',
      'Memiliki premium badge & crown',
      'Posting lebih dari 1 foto ketika membuat rooms',
      'Favorite list UNLIMITED',
      'Message UNLIMITED',
      'Report UNLIMITED',
      'Tidak ada iklan',
    ],
  },
]

export default function Pricing() {
  const { push } = useRouter()

  return (
    <article className="relative py-20 overflow-hidden bg-white">
      <div className="container max-w-screen-xl min-h-full mx-auto">
        <section className="mb-20 text-center">
          <h2 className="px-8 pt-6 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl sm:leading-none xl:max-w-screen-xl">
            Flexible
            <span className="text-purple-700"> Pricing</span>
          </h2>

          <p className="px-8 mt-5 text-base italic text-center text-gray-500 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 xl:max-w-screen-xl">
            Menjangkau berbagai pilihan sesuai kebutuhan
            <span className="text-purple-700"> anda</span>
          </p>
        </section>

        <section className="flex flex-wrap -mx-2 lg:w-4/5 sm:mx-auto sm:mb-2">
          {pricings.map((pricing) => (
            <div className="xl:w-1/3 md:w-1/2 w-full px-6 md:px-8 py-4 md:py-8">
              <div
                className={`${
                  pricing.recommended ? 'border-purple-500' : 'border-gray-300'
                  } h-full p-6 rounded-lg border-2 flex flex-col relative overflow-hidden`}
              >
                {pricing.recommended && (
                  <span className="bg-purple-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                    RECOMMENDED
                  </span>
                )}

                <h2 className="uppercase text-sm tracking-widest title-font mb-2 font-medium">
                  {pricing.title}
                </h2>

                <h1 className="text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    }).format(pricing.price)}
                  </span>

                  <span className="text-lg ml-2 font-normal text-gray-500">
                    /bln
                  </span>
                </h1>

                {pricing.features?.map((feature, i) => (
                  <p key={i} className="flex items-center text-gray-600 mb-2">
                    <span
                      className={`${
                        pricing.recommended ? 'bg-purple-500' : 'bg-gray-500'
                        } w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0`}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    {feature}
                  </p>
                ))}

                {pricing.id > 1 && (
                  <button
                    onClick={() => {
                      if (pricing.recommended) return push('/subscribe')

                      return push('/login')
                    }}
                    className="flex items-center mt-2 w-full rounded-md px-4 py-2 text-base font-medium leading-6 text-white bg-purple-700 border border-transparent md:text-lg focus:outline-none hover:bg-purple-100 hover:text-purple-700"
                  >
                    {pricing.recommended ? 'Subscribe' : 'Login'}
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                )}

                <p className="text-xs text-gray-500 mt-3">{pricing.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </article>
  )
}
