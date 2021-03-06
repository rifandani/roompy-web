import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
// files
import UserContext from 'contexts/UserContext'
import { FireUser } from 'utils/interfaces'

type UseCheckUserReturn = readonly [FireUser, boolean]

function useCheckUser(): UseCheckUserReturn {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { user } = useContext(UserContext)
  const { push } = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    if (!user) {
      setIsLoading(true)
      await push('/', '/', { shallow: true })
      return toast.error('You are not authenticated')
    }

    setIsLoading(false)
  }

  return [user, isLoading] as const
}

export default useCheckUser
