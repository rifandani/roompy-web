import { GetServerSideProps } from 'next'
import { parse } from 'cookie'
// files
import RegisterComp from '../components/register/RegisterComp'

export default function RegisterPage() {
  // const { prefetch } = useRouter()

  // useEffect(() => {
  //   // Prefetch the dashboard page for USER
  //   prefetch('/dashboard')
  // }, [])

  return (
    <div className="">
      <RegisterComp />
    </div>
  )
}

// You should not use fetch() to call an API route in getServerSideProps. Instead, directly import the logic used inside your API route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth // get only the cookie

  // kalau auth cookie sudah ada
  if (authCookie) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
