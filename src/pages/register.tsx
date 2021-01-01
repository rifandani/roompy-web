import { GetServerSideProps } from 'next';
// files
import RegisterComp from '../components/register/RegisterComp';

export default function RegisterPage() {
  return (
    <div className="">
      <RegisterComp />
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
