import axios from 'axios'
import Router from 'next/router'
import NProgress from 'nprogress'
import { toast, ToastContainer } from 'react-toastify'
import { FormspreeProvider } from '@formspree/react'
import { DefaultSeo } from 'next-seo'
import { SWRConfig } from 'swr'
import type { AppProps /*, AppContext */ } from 'next/app'
// styles
import 'rodal/lib/rodal.css'
import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'react-phone-input-2/lib/style.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-slider/assets/index.css'
import '../styles/index.css'
// files
import useAuth from 'hooks/useAuth'
import UserContext from 'contexts/UserContext'
import init from 'utils/sentry/init'
import SEO from 'configs/nextSeoConfig'
import { API_URL_DEV, API_URL_PROD } from 'configs/constants'

// axios BASE URL
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? API_URL_DEV : API_URL_PROD

// axios default validateStatus
axios.defaults.validateStatus = (status) =>
  (status >= 200 && status < 300) || (status >= 400 && status < 500) // Resolve only if the status code is 200 more and less than 500

// create a custom progress bar
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})

// err untuk Sentry di _error.tsx
interface MyAppProps extends AppProps {
  err: Error
}

// init sentry untuk client
init()

export default function MyApp({
  Component,
  pageProps,
  err,
}: MyAppProps): JSX.Element {
  const [user, setUser] = useAuth() // user auth context

  return (
    <>
      <DefaultSeo {...SEO} />

      {/* sets up a project context for all forms in the app, and associates your forms with the keys specified in your formspree.json config file */}
      <FormspreeProvider project="1571395310305935055">
        <UserContext.Provider value={{ user, setUser }}>
          <SWRConfig
            value={{
              // refreshInterval: 3000, // automatic re-fetching data in API every 3s
              fetcher: (url: string) => axios.get(url).then((res) => res.data),
              onError: (err) => toast.error(err.message),
            }}
          >
            {/* tambahan props err dari _error.tsx (sentry) */}
            <Component {...pageProps} err={err} />
            <ToastContainer />
          </SWRConfig>
        </UserContext.Provider>
      </FormspreeProvider>
    </>
  )
}
