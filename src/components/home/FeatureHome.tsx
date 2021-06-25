import { Roll } from 'react-awesome-reveal'
import { HiLightBulb, HiLockClosed } from 'react-icons/hi'
import { RiUserStarFill, RiMessengerFill } from 'react-icons/ri'

export default function FeatureHome(): JSX.Element {
  return (
    <div className="relative w-full py-20 overflow-hidden bg-gray-100">
      <main className="container max-w-screen-xl min-h-full mx-auto">
        <h2 className="px-8 pt-6 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl sm:leading-none lg:text-left xl:max-w-screen-xl">
          Why
          <span className="text-purple-700"> Roompy</span>?
        </h2>

        <p className="px-8 mt-5 text-base italic text-center text-gray-500 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 lg:text-left xl:max-w-screen-xl">
          Kami selalu termotivasi untuk memberikan service yang
          <span className="text-purple-700"> terbaik</span>
        </p>

        <article className="px-8 pt-10 lg:my-8">
          <Roll triggerOnce>
            <ul className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <li>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 text-white bg-purple-200 rounded-md">
                      <RiUserStarFill className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 text-gray-900">
                      Personalized Matching
                    </h4>
                    <p className="mt-2 text-base leading-6 text-justify text-gray-500">
                      Berhenti menghabiskan waktu mencari teman serumah melalui
                      media sosial tanpa ada kepastian. Matching System dari
                      kami akan menyediakan rekomendasi roompies yang sesuai
                      dengan preferensi pribadi anda.
                    </p>
                  </div>
                </div>
              </li>

              <li className="mt-10 md:mt-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 text-white bg-yellow-200 rounded-md">
                      <HiLightBulb className="w-6 h-6 text-yellow-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 text-gray-900">
                      Informative Profiles
                    </h4>
                    <p className="mt-2 text-base leading-6 text-justify text-gray-500">
                      Isi profile roompies penuh dengan detail informasi yang
                      relevan untuk membantu anda dalam mencari teman serumah.
                      Dengan begitu, anda dapat dengan mudah memilih siapa yang
                      ingin anda temui.
                    </p>
                  </div>
                </div>
              </li>

              <li className="mt-10 md:mt-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 text-white bg-blue-200 rounded-md">
                      <RiMessengerFill className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 text-gray-900">
                      In-App Messaging
                    </h4>
                    <p className="mt-2 text-base leading-6 text-justify text-gray-500">
                      Anda tidak ingin berkomunikasi melalui media sosial
                      pribadi? Tenang saja, kami menyediakan In-App Messaging
                      agar anda dapat berkomunikasi dengan cepat dan aman.
                    </p>
                  </div>
                </div>
              </li>

              <li className="mt-10 md:mt-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 text-white bg-pink-200 rounded-md">
                      <HiLockClosed className="w-6 h-6 text-pink-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 text-gray-900">
                      Safe and Secure
                    </h4>
                    <p className="mt-2 text-base leading-6 text-justify text-gray-500">
                      Setiap informasi yang sensitif, akan kami jaga
                      kerahasiaannya. Kami menjunjung tinggi HAM dan menghargai
                      privasi setiap user demi menjaga kelestarian komunitas
                      ini.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </Roll>
        </article>
      </main>
    </div>
  )
}
