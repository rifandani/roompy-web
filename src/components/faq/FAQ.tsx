const faqs = [
  {
    id: 1,
    q: 'How does it work?',
    a: 'Our platform works with your content to provides insights and metrics on how you can grow your business and scale your infastructure.',
  },
  {
    id: 2,
    q: 'How do I make changes and configure my site?',
    a: 'You can easily change your site settings inside of your site dashboard by clicking the top right menu and clicking the settings button.',
  },
  {
    id: 3,
    q: 'Do you offer team pricing?',
    a: 'Yes, we do! Team pricing is available for any plan. You can take advantage of 30% off for signing up for team pricing of 10 users or more.',
  },
  {
    id: 4,
    q: 'How do I add a custom domain?',
    a: 'You can easily change your site settings inside of your site dashboard by clicking the top right menu and clicking the settings button.',
  },
]

export default function FAQ() {
  return (
    <article className="relative py-20 overflow-hidden bg-white">
      <div className="container max-w-screen-xl min-h-full mx-auto">
        <section className="mb-20 text-center">
          <h2 className="px-8 pt-6 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl sm:leading-none xl:max-w-screen-xl">
            Frequently Asked
            <span className="text-purple-700"> Questions</span>
          </h2>

          <p className="px-8 mt-5 text-base italic text-center text-gray-500 sm:text-lg md:text-xl sm:w-full sm:mx-auto lg:mx-0 xl:max-w-screen-xl">
            Pertanyaan yang sering ditanyakan di
            <span className="text-purple-700"> Roompy</span>
          </p>
        </section>

        <section className="flex flex-wrap -mx-2 lg:w-4/5 sm:mx-auto sm:mb-2">
          {faqs.map(faq => (
            <div className="w-full px-4 py-2 lg:w-1/2">
              <details key={faq.id} className="mb-4 bg-gray-100">
                <summary className="px-4 py-2 font-semibold bg-gray-300 rounded-md cursor-pointer focus:ring-2 focus:outline-none focus:ring-purple-300">
                  {faq.q}
                </summary>

                <p className="px-4 py-2">
                  {faq.a}
                </p>
              </details>
            </div>
          ))}
        </section>
      </div>
    </article>
  );
}
