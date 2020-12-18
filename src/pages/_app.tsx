import Head from 'next/head';
import type { AppProps /*, AppContext */ } from 'next/app';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { FormspreeProvider } from '@formspree/react';
// files
import '../styles/index.css';
import useAuth from '../hooks/useAuth';
import UserContext from '../contexts/UserContext';

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
        <title>Roompy | Cari teman sekamar secara online</title>
        {/* meta */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        {/* link */}
        <link rel="icon" href="favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* sets up a project context for all forms in the app, and associates your forms with the keys specified in your formspree.json config file */}
      <FormspreeProvider project="1571395310305935055">
        {/* @ts-ignore: Unreachable code error */}
        <UserContext.Provider value={{ user, setUser }}>
          <Component {...pageProps} />
          <ToastContainer />
        </UserContext.Provider>
      </FormspreeProvider>
    </>
  );
}
