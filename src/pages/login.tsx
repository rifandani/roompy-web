import { parse } from 'cookie'
import { GetServerSideProps } from 'next'
// files
import LoginComp from 'components/login/LoginComp'

export default function LoginPage(): JSX.Element {
  // const { prefetch } = useRouter()

  // useEffect(() => {
  //   // Prefetch the dashboard page for USER
  //   prefetch('/dashboard')
  // }, [])

  return (
    <div className="">
      <LoginComp />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth // get only the auth cookie

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
