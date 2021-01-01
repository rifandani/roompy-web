import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// files
import LoginComp from '../components/login/LoginComp';

export default function LoginPage() {
  const { prefetch } = useRouter();

  useEffect(() => {
    // Prefetch the dashboard page for USER
    prefetch('/dashboard');
  }, []);

  return (
    <div className="">
      <LoginComp />
    </div>
  );
}

// You should not use fetch() to call an API route in getServerSideProps. Instead, directly import the logic used inside your API route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req.headers?.cookie;
  const authCookie = cookie?.replace('auth=', ''); // get only the cookie

  // kalau auth cookie sudah ada
  if (authCookie) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
