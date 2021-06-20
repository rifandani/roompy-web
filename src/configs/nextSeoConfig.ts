import { DefaultSeoProps } from 'next-seo'

const defaultSeoProps: DefaultSeoProps = {
  titleTemplate: 'Roompy - %s',
  defaultTitle: 'Roompy - Find your soul roommate online',
  description:
    'Platform gratis untuk menemukan teman sekamar sejati anda secara online hanya dalam waktu beberapa menit',
  canonical: 'https://roompy.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    site_name: 'Roompy',
    url: 'https://roompy.vercel.app/',
    title: 'Roompy - Find your soul roommate  online',
    description:
      'Platform gratis untuk menemukan teman sekamar sejati anda secara online hanya dalam waktu beberapa menit',
    images: [
      {
        url: 'https://roompy.vercel.app/images/roompy-canva.png',
        width: 800,
        height: 600,
        alt: 'Roompy Logo Image',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Quicksand&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
    },
    // <link
    //    rel="stylesheet"
    //       href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    //       integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    //       crossOrigin=""
    //     />
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'minimum-scale=1, initial-scale=1, width=device-width',
    },
  ],
}

export default defaultSeoProps
