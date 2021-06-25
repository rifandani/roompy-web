import { parse } from 'cookie'
import { GetServerSideProps } from 'next'
// files
import RegisterComp from 'components/register/RegisterComp'

export default function RegisterPage(): JSX.Element {
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
