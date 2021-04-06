import { useState, useEffect, useContext } from 'react'
// files
import UserContext from '../contexts/UserContext'

function useCheckUserInLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { user } = useContext(UserContext)

  useEffect(() => {
    setIsLoading(false)
  }, [user])

  return [user, isLoading]
}

export default useCheckUserInLogin
