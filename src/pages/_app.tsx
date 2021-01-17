import Head from 'next/head';
import type { AppProps /*, AppContext */ } from 'next/app';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { FormspreeProvider } from '@formspree/react';
import 'rodal/lib/rodal.css'; // react modal
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-phone-input-2/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import { SWRConfig } from 'swr';
// files
import '../styles/index.css';
import useAuth from '../hooks/useAuth';
import UserContext from '../contexts/UserContext';

// axios BASE URL
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://roompy.vercel.app/api';

// create a custom progress bar
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useAuth(); // user auth context

  return (
    <>
      <Head>
        <title>Roompy | Cari teman sekamar atau serumah secara online</title>
        {/* meta */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="twitter:title" content="Roompy | Find your soul roommate" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Temukan roommate sejati anda, dalam beberapa menit."
        />
        <meta property="og:image" content="favicon.ico" />
        <meta name="twitter:image" content="favicon.ico" />
        {/* link */}
        <link rel="icon" href="favicon.ico" />
      </Head>

      {/* sets up a project context for all forms in the app, and associates your forms with the keys specified in your formspree.json config file */}
      <FormspreeProvider project="1571395310305935055">
        {/* @ts-ignore: Unreachable code error */}
        <UserContext.Provider value={{ user, setUser }}>
          <SWRConfig
            value={{
              // refreshInterval: 3000, // automatic re-fetching data in API every 3s
              fetcher: (url: string) => axios.get(url).then((res) => res.data),
            }}
          >
            <Component {...pageProps} />
            <ToastContainer />
          </SWRConfig>
        </UserContext.Provider>
      </FormspreeProvider>
    </>
  );
}
